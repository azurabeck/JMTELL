import React from 'react';
import BLOG_BAR from '../../organism/Blog'
import './style.scss'
import HEADER from '../../pages/post/Header'
import AUTHOR from '../../pages/post/Author'
import POST from '../../pages/post/Post'
import WHATSAPP from '../../atoms/WHATSAPP';



const Blog = (props) => {
    const IS_EDITING = props.isEditing
    return (
            
            <div className='post'>
                { !IS_EDITING && <BLOG_BAR />}
                <div className='post-content'>
                    <HEADER />
                    <AUTHOR />
                    <POST />
                </div>
                <WHATSAPP />
            </div>
    ) 
}

export default Blog;