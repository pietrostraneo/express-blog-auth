module.exports = (err, req, res, next) => {
    console.error(err.stack);
    res.format({
        json: () => {

            res.status(500).json({
                message: err.message,
                error: err
            });

        },
        html: () => {
            res.status(500).send('Ops! Something gone wrong..')
        }
    })
}