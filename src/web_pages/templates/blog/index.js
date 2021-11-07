import React from 'react';
import BLOG_BAR from '../../organism/Blog'
import './style.scss'
import SPOTLIGHT from '../../pages/blog/spotlight'
import POST_LIST from '../../pages/blog/post'


const Blog = (props) => {
    const IS_EDITING = props.isEditing
    return (
            
            <div className='blog'>
                {!IS_EDITING && <BLOG_BAR />}
                <div className='blog-content'>
                    <SPOTLIGHT />
                    <POST_LIST />
                </div>
            </div>
    ) 
}

export default Blog;