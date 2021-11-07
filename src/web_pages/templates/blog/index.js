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
                <SPOTLIGHT IS_EDITING={IS_EDITING ? IS_EDITING : null} />
                <POST_LIST IS_EDITING={IS_EDITING ? IS_EDITING : null}/>
            </div>
        </div>
    ) 
}

export default Blog;