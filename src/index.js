'use strict'
import 'app-module-path/register'
import logger from 'winston'
import config from '../config'
import app from './app'
const serverUp = (app) => {
    const server = app.listen(config.port)
    server.on( 'listening', () =>
        logger.info( "server is connected ", config.port )
    )
}

serverUp(app)