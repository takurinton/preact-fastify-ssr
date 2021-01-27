import { useState } from 'preact/hooks';
import { h } from 'preact';
/** @jsx h */

export const About = () => {
    const [count, setCount] = useState(0);
    return (
        <div>
            this page is home <br/>
            <a href="/">home</a>
            <br/>
            <h1>{ count }</h1>
            <button onClick={() => setCount(count+1)}>click me!</button>
        </div>
    );
};