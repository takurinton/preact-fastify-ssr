import { h, JSX } from 'preact';
import { Router, Route } from './router/index';
import { Link } from './router/prefetch';

import { Home } from './components/pages/Home'
import { About } from './components/pages/About'
import { Post } from './components/pages/Post';
import { Posts } from './components/pages/Posts';

export const R = (): JSX.Element => {
  const json = JSON.parse(document.getElementById('json').getAttribute('data-json'));
  return (
    <div>
      <Link href="/"><h3>Home</h3></Link>
      <Link href="/about"><h3>About</h3></Link>
      <Link href="/posts"><h3>blog</h3></Link>
      <Router>
        <Route path="/" component={Home} />
        <Route path="/about" component={About} />
        <Route path="/posts" component={() => <Posts {...json} />} />
        <Route path="/post/:id" component={() => <Post {...json} />} />
      </Router>
    </div>
  )
}