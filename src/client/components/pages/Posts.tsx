import { h } from 'preact';
import { Link } from 'preact-router';
/** @jsx h */

interface PostsProps {
    next: string | null, 
    previous: string | null, 
    total: number, 
    category: any,
    current: number, 
    results: PostProps[], 
    page_size: string, 
    first: string, 
    last: string
}

interface PostProps {
    id: number,
    title: string, 
    category: string,
    contents: string, 
    contents_image_url: string,
    pub_date: string,
}

export const Posts = (props: PostsProps) => {
    return (
        <div>
            <h1>Blog Posts</h1>
            {
                props.results.map(post => ( <p><Link href={`/post/${post.id}`}>{post.title}</Link></p> ) )
            }
        </div>
    )
}