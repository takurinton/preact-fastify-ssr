import { h, JSX } from 'preact';
/** @jsx h */

import fetch from 'node-fetch';

import { About } from './About';
import { Posts } from './Posts';

interface linkProps {
    to: string, 
    text: string
}

const Components = {
    about: About, 
    posts: Posts
}

const Link = ({ children, href }: { children: JSX.Element, href: string }) => {
    // const router = useRouter()
    return (
      <a
        href="#"
        onClick={(e) => {
          e.preventDefault();
          window.history.pushState('', '', href);
        }}
      >
        {children}
      </a>
    )
  }

export const Home = () => (
    <div>
        <h1>hello world</h1>
        <Link href='/about'>
            <h2>about</h2>
        </Link>
        <Link href="/posts">
            <h2>posts</h2>
        </Link>

    </div>
)