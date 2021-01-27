import { h } from 'preact';
/** @jsx h */

interface PostProps {
    id: number,
    title: string, 
    category: string,
    contents: string, 
    contents_image_url: string,
    pub_date: string,
    comment: CommentProps[]
}

interface CommentProps {
    name: string, 
    contents: string, 
    pub_date: string
}

export const Post = (props: PostProps) => {
    return (
        <div>
            <h1>{props.title}</h1>
            <p>{props.contents}</p>
        </div>
    )
}