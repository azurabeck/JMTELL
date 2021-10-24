import React from 'react';
import BLOG_BAR from '../../organism/Blog'
import './style.scss'

const Blog = () => {
    return (
            
            <div className='blog'>
                <BLOG_BAR />
                <div className='blog-content'>
                    Blog
                </div>
            </div>
    ) 
}

export default Blog;