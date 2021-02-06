import { h, render } from 'preact';

import { Home } from './components/pages/Home'
import { About } from './components/pages/About'
import { Post } from './components/pages/Post';
import { Posts } from './components/pages/Posts';

export const Router = () => {
  const Component = () => {
    const path = window.location.pathname.split('/')[1]; // 苦しい
    const json = JSON.parse(document.getElementById('json').getAttribute('data-json'));
    switch(path) {
      case '':
        return <Home />;
      case 'about':
        return <About />
      case 'posts':
        return <Posts {...json} />;
      case 'post':
        return <Post {...json} />;
      default:
        return <h1>page not found</h1>;
    }
  }

  return <Component />
}

// export const Router = () => {
//   if (window.location.pathname === '/') {
//     render(<Home />, document.getElementById('main'));
//     const about = document.getElementById('about');
//     about?.addEventListener('click', e => {
//       e.preventDefault();
//       window.history.pushState({}, 'about', '/about');
//       fetch('/about')
//       .then(() => {
//         render(<About />, document.getElementById('main'))
//       })
//     })

//     const posts = document.getElementById('posts');
//     posts?.addEventListener('click', e => {
//       e.preventDefault();
//       window.history.pushState({}, 'posts', '/posts');
//       fetch('https://api.takurinton.com/blog/v1/')
//       .then(res => res.json())
//       .then(json => {
//         render(<Posts {...json} />, document.getElementById('main'))
//       })
//     })
//   }
// }