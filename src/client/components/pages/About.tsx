import { useState } from 'preact/hooks';
import { h } from 'preact';
/** @jsx h */

export const About = () => {
    const [count, setCount] = useState(0);
    return (
        <div>
            <h1>hello about</h1>
            <h2><a href="/">home</a></h2>
            <br/>
            <h1>{ count }</h1>
            <button onClick={() => setCount(count+1)}>click me!</button>
        </div>
    );
};