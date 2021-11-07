import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPen } from '@fortawesome/free-solid-svg-icons'

export const EditorAction = ({CLICK_EDIT, CLICK_SAVE , IS_EDITING}) => {
    return (
        <>
            {
                IS_EDITING &&  <div className='action-group'> 
                    <FontAwesomeIcon icon={faPen} onClick={CLICK_EDIT} />
                    <div className='btn-orange' onClick={CLICK_SAVE}>Salvar Seleção</div> 
                </div> 
            }
        </>
    )
}

export const EditorContent = ({OPEN_EDITOR , CHANGE_INPUT , IS_EDITING}) => {
    return (
        <>
            { IS_EDITING && <div className='editing-group'> 
                    { OPEN_EDITOR && <div className='text-group'>
                        <input onChange={CHANGE_INPUT} />
                    </div> }                                
            </div> }
        </>
    )
}