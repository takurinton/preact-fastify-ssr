import { h } from 'preact';
import { Link } from 'preact-router';
/** @jsx h */

export const Home = () => (
    <div>
        <h1>hello world</h1>
        <h2><Link href="/about">about</Link></h2>
        <h2><Link href="/posts">blog</Link></h2>
    </div>
)