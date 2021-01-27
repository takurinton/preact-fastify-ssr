import { h, JSX } from 'preact';
/** @jsx h */

interface Props {
    children: () => JSX.Element;
    title: string;
    image: string,
    discription: string
    props?: any;
}

const Head = (props: Props) => {
    return (
        <head>
            <link rel="preconnect" href="https://ssr-test.takurinton.vercel.app/" />
            <title>{props.title}</title>
            <meta charSet="utf-8" />
            <meta name="description" content={props.discription} />
            <meta property="og:title" content={props.title} />
            <meta property="og:description" content={props.discription} />
            <meta property="og:type" content="blog" />
            <meta property="og:url" content="https://www.takurinton.com" />
            <meta property="og:image" content={props.image} />
            <meta property="og:site_name" content={props.title} />
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:url" content={props.image} />
            <meta name="twitter:title" content={props.title} />
            <meta name="twitter:description" content={props.discription} />
            <meta name="twitter:image" content={props.image} />
            <link rel="shortcut icon" href={"https://www.takurinton.com/me.jpeg"} />
            <link rel="apple-touch-icon" href={"https://www.takurinton.com/me.jpeg"} />
            <link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/highlight.js/9.6.0/styles/solarized-dark.min.css" />
            <meta name="viewport" content="width=device-width,initial-scale=1" />
            <style>
            {`
                body {
                    padding: 0; 
                    margin: 0;
                    margin-bottom: 50px;
                    text-align: center;
                    font-family: Helvetica Neue, Arial, Hiragino Kaku Gothic ProN, Hiragino Sans, Meiryo, sans-serif;
                }
                @media (max-width: 414px) {
                    font-size: 80%;
                }
            `}
            </style>
      </head>
    )
}

export const Html = (props: Props) => (
    <html lang="ja">
        <Head {...props} />
        <body>
            <div id="main">
                <props.children {...props.props} />
            </div>
            <script id="json" type="text/plain" data-json={ JSON.stringify(props.props) }></script>
            <script async defer src={`http://localhost:3000/main.js`} />
        </body>
    </html>
);

