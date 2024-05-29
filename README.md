# Express Blog Auth

## Esercizio

Creiamo un'applicazione Express che gestisca autenticazione e autorizzazione tramite JWT (JSON Web Token) per un semplice blog. Implementeremo diverse rotte e middleware per la gestione degli errori e delle pagine 404.

## Rotte da Creare

1. **Home**
   - `GET /`
   - Descrizione: Ritorna la homepage del blog.

2. **Posts Index**
   - `GET /posts`
   - Descrizione: Ritorna una lista di tutti i post.

3. **Store Post**
   - `POST /posts`
   - Descrizione: Crea un nuovo post. Questa rotta è protetta e richiede autenticazione.

4. **Show Post**
   - `GET /posts/:slug`
   - Descrizione: Ritorna i dettagli di un singolo post identificato dallo slug.

## Autenticazione con JWT

- Implementiamo una rotta per autenticare un utente e ottenere un token JWT.
- Utilizzeremo un middleware per limitare l'accesso alla rotta di creazione dei post ai soli utenti autenticati.

## Gestione degli Errori

- Attraverso middleware gestiamo gli errori e le pagine 404.
- Questi middleware risponderanno con un JSON contenente il codice e il messaggio dell'errore.

## Bonus

1. Ritornare un errore diverso nel caso in cui il JWT sia non valido o scaduto.
2. Creare un middleware per proteggere le rotte riservate agli utenti admin.

## Struttura del Progetto

Il progetto sarà organizzato nei seguenti moduli:

- **Controllers**: Contengono la logica di gestione delle richieste.
- **Routers**: Definiscono le rotte e collegano le richieste ai rispettivi controller.
- **Middlewares**: Gestiscono l'autenticazione, autorizzazione, errori e altre logiche intermedie.