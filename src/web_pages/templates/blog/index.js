import React from 'react';
import BLOG_BAR from '../../organism/Blog'
import './style.scss'
import SPOTLIGH from '../../pages/blog/spotlight'

const Blog = () => {
    return (
            
            <div className='blog'>
                <BLOG_BAR />
                <div className='blog-content'>
                    <SPOTLIGH />
                </div>
            </div>
    ) 
}

export default Blog;