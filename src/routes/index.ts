import express from 'express';
import { routerAuth } from './authRoute';
import { routerPost } from './postRoute';



export const routes = (app: express.Application) => {
    app.use('/api/auth', routerAuth)
    app.use('/api/post', routerPost)
}