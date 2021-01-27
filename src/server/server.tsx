// import fastify, { FastifyRequest, FastifyReply } from "fastify";
import express, { Express } from 'express';

const fastifyStatic = require('fastify-static');
const path = require('path');

import { Html } from './Html';
import { Home } from '../client/components/pages/Home';
import render from "preact-render-to-string";
import { About } from '../client/components/pages/About';

// const app = fastify();
// app.register(fastifyStatic, {
//     root: path.join(process.cwd(), 'assets')
// })

const app = express();
app.use(express.static('assets'));

app.get('/', (req: Express.Request, res: Express.Response) => {
    const renderd = Html({
        children: Home,
        title: 'home',
        discription: 'hogehoge', 
        image: 'https://www.takurinton.com/me.jpeg', 
        props: {},
    });
    const html = render(renderd)
    res.send(html)
});

app.get('/about', (req: Express.Request, res: Express.Response) => {
    const renderd = Html({
        children: About,
        title: 'about',
        discription: 'about', 
        image: 'https://www.takurinton.com/me.jpeg', 
        props: {},
    });
    const html = render(renderd)
    res.send(html)
});

app.listen(3000);