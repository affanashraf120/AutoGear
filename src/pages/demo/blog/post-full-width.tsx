// react
import React from 'react';
// application
import BlogPagePost from '~/components/blog/BlogPagePost';
import { IPost } from '~/interfaces/post';

function Page() {
    return (
        <BlogPagePost
            featuredImage
        />
    );
}

export default Page;
