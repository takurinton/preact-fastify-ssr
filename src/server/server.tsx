import fastify, { FastifyRequest, FastifyReply } from "fastify";

const fastifyStatic = require('fastify-static');
const path = require('path');

import { Html } from './Html';
import { Home } from '../client/components/pages/Home';
import { About } from '../client/components/pages/About';

import render from "preact-render-to-string";

const app = fastify();
app.register(fastifyStatic, {
    root: path.join(process.cwd(), 'assets')
})

app.get('/', (req: FastifyRequest, res: FastifyReply) => {
    const renderd = Html({
        children: Home,
        title: 'home',
        discription: 'hogehoge', 
        image: 'https://www.takurinton.com/me.jpeg', 
        props: {},
    });
    const html = render(renderd)
    // res.raw.write('<!DOCTYPE html>')
    res.type('text/html')
    res.send(html)
});

app.get('/about', (req: FastifyRequest, res: FastifyReply) => {
    const renderd = Html({
        children: About,
        title: 'about',
        discription: 'about', 
        image: 'https://www.takurinton.com/me.jpeg', 
        props: {},
    });
    const html = render(renderd)
    // res.raw.write('<!DOCTYPE html>')
    res.type('text/html')
    res.send(html)
});

app.listen(3000);