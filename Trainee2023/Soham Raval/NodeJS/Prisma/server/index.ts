import express from 'express'
import bodyParser from 'body-parser';
import mongoDBConnection from '../config/mongoDBConfig';
// import routes from '../app/routes/auth/authroutes'
import routes from '../app/routes';

class Server {
    port: any
    app: any
    constructor() {
        this.port = 7000
        this.app = express()
    }

    start() {
        this.config()
        mongoDBConnection.databaseConnect()
        this.setupRoutes()
        this.listen()
    }

    config() {
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: false }));
    }

    setupRoutes(){
        this.app.use(routes)
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log(`App is running on port ${this.port}`);
        })
    }
}

export default Server