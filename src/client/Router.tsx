import { h } from 'preact';

import { Home } from './components/pages/Home'
import { About } from './components/pages/About'
import { Post } from './components/pages/Post';
import { Posts } from './components/pages/Posts';

import { Router, Route } from 'preact-router';

export const R = () => {
  // @ts-ignore
  const json = JSON.parse(document.getElementById('json').getAttribute('data-json'));
  
  return (
    <Router>
      <Route href='/' component={Home} />
      <Route href='/about' component={About} />
      <Route href='/posts' component={() => <Posts {...json} />} />
      <Route href='/post/:id' component={() => <Post {...json} />} />
    </Router>
  )
}