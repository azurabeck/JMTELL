import React from 'react'
import { Samy } from 'react-samy-svg';

import EMAIL_ICON from './email.svg'
import PHONE_CIRCLE_ICON from './phone_circle.svg'
import FACEBOOK_ICON from './facebook.svg'
import INSTAGRAM_ICON from './instagram.svg'
import WHATSAPP_ICON from './whatsapp.svg'
import WHATSAPP_CIRCLE_ICON from './whatsapp_circle.svg'


export const EMAIL = () => (<Samy path={EMAIL_ICON}/>)
export const PHONE = () => (<Samy path={PHONE_CIRCLE_ICON}/>)
export const FACEBOOK = () => (<Samy path={FACEBOOK_ICON}/>)
export const INSTAGRAM = () => (<Samy path={INSTAGRAM_ICON}/>)
export const WHATSAPP = () => (<Samy path={WHATSAPP_ICON}/>)
export const WHATSAPP_CIRCLE = () => (<Samy path={WHATSAPP_CIRCLE_ICON}/>)
