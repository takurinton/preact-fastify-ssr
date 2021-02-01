import fastify, { FastifyRequest, FastifyReply } from "fastify";

const fastifyStatic = require('fastify-static');
const path = require('path');

import { Html } from './Html';
import { Home } from '../client/components/pages/Home';
import { About } from '../client/components/pages/About';
import { Posts } from '../client/components/pages/Posts';
import { Post } from '../client/components/pages/Post'

import render from "preact-render-to-string";

import fetch from 'node-fetch';


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

app.get('/prefetch/about', (req: FastifyRequest, res: FastifyReply) => {
    res.send({});
});

app.get('/posts', (req: FastifyRequest, res: FastifyReply) => {
    const id: string = (req.params as { id: string }).id;
    fetch(`https://api.takurinton.com/blog/v1/`)
    .then(res => res.json())
    .then(json => {
        const renderd = Html({
            children: Posts,
            title: 'blog posts',
            discription: 'blog posts', 
            image: 'https://www.takurinton.com/me.jpeg', 
            props: json,
        });
        const html = render(renderd)
        // res.raw.write('<!DOCTYPE html>')
        res.type('text/html')
        res.send(html)
    })
    .catch(err => {
        res.type('text/html')
        res.send(err)
    });
});

app.get('/prefetch/posts', (req: FastifyRequest, res: FastifyReply) => {
    fetch(`https://api.takurinton.com/blog/v1/`)
    .then(res => res.json())
    .then(json => {
        res.send(json);
    })
    .catch(() => {
        res.send({status: 500})
    })
});

app.get('/post/:id', (req: FastifyRequest, res: FastifyReply) => {
    const id: string = (req.params as { id: string }).id;
    fetch(`https://api.takurinton.com/blog/v1/post/${id}`)
    .then(res => res.json())
    .then(json => {
        const renderd = Html({
            children: Post,
            title: json.title,
            discription: json.title, 
            image: 'https://www.takurinton.com/me.jpeg', 
            props: json,
        });
        const html = render(renderd)
        // res.raw.write('<!DOCTYPE html>')
        res.type('text/html')
        res.send(html)
    })
    .catch(() => {
        res.type('text/html')
        res.send('error')
    });
});

app.get('/prefetch/post/:id', (req: FastifyRequest, res: FastifyReply) => {
    const id: string = (req.params as { id: string }).id;
    fetch(`https://api.takurinton.com/blog/v1/post/${id}`)
    .then(res => res.json())
    .then(json => {
        res.send(json);
    })
    .catch(() => {
        res.send({status: 500})
    })
});

app.listen(3000);