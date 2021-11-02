import React from 'react';
import BLOG_BAR from '../../organism/Blog'
import './style.scss'
import HEADER from '../../pages/post/Header'
import AUTHOR from '../../pages/post/Author'
import POST from '../../pages/post/Post'



const Blog = () => {
    return (
            
            <div className='post'>
                <BLOG_BAR />
                <div className='post-content'>
                    <HEADER />
                    <AUTHOR />
                    <POST />
                </div>
            </div>
    ) 
}

export default Blog;