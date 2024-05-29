const path = require("path");
const fs = require("fs");

let posts = require("../db/db.json");

const slugify = require('slugify');

const updatePost = (newPost) => {
    const filePath = path.join(__dirname, '../db/db.json');
    fs.writeFileSync(filePath, JSON.stringify(newPost));
    posts = newPost;
};

const deletePublicFile = (fileName) => {
    const filePath = path.join(__dirname, '../public', fileName);
    fs.unlinkSync(filePath);
};

const create = (req, res) => {
    const { title, content, tags } = req.body;
    if (!title || !content || !tags) {
        req.file?.filename && deletePublicFile(req.file.filename);
        res.format({
            json: () => {
                res.status(400).json({
                    error: 'Data is missing',
                    description: `Some data is missing`
                })

            },
            html: () => {
                res.status(400).send('Some data is missing')
            }
        })
    } else if (!req.file || !req.file.mimetype.includes('image')) {
        req.file?.filename && deletePublicFile(req.file.filename);
        res.format({
            json: () => {
                res.status(400).json({
                    error: 'Image is missing',
                    description: `Image is missing or it is not an image file.`
                })

            },
            html: () => {
                res.status(400).send('Image is missing or it is not an image file.')
            }
        })
    }

    let postSlug = slugify(title);

    const newPost = {
        title,
        slug: postSlug,
        content,
        image: req.file.filename,
        tags
    };


    if (!posts.find(p => p.slug === postSlug)) {
        updatePost([...posts, newPost]);
        res.format({
            json: () => {
                res.status(201).json({
                    status: 201,
                    message: 'Post created successfully',
                    data: newPost
                })
            },
            html: () => {
                res.status(201).send('Post created successfully');
            }
        })
    } else {
        req.file?.filename && deletePublicFile(req.file.filename);
        res.format({
            json: () => {
                res.status(400).json({
                    status: 400,
                    error: 'Post already exists',
                    description: `Post with this title already exists`
                })
            },
            html: () => {
                res.status(400).send('Post with this title already exists');
            }
        })
    }


};

const destroy = (req, res) => {

    const { slug } = req.params;
    const postToDelete = posts.find(p => p.slug === slug);
    if (!postToDelete) {
        res.format({
            json: () => {
                res.status(404).json({
                    status: 404,
                    error: 'Post not found'
                })
            },
            html: () => {
                res.status(404).send('Post not found');
            }
        })
    }

    deletePublicFile(postToDelete.image);
    updatePost(posts.filter(p => p.slug !== postToDelete.slug));

    res.format({
        json: () => {
            res.status(200).json({
                status: 200,
                message: 'Post deleted successfully'
            })
        },
        html: () => {
            res.status(200).send(`Post con slug ${slug} eliminato con successo.`);
        }
    })
}

module.exports = {
    create,
    destroy
};