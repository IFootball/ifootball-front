var cookie = require('cookie');
import { user_type } from './types'
import decode from 'jwt-decode'

export function salvarTokenNoCookie(token: string): boolean {
  
  const cookieName = 'testeCookie';
  const cookieOptions = {
    maxAge: 60,
    httpOnly: true, 
    secure: true, 
    sameSite: 'strict' 
  };
  const cookieSerialized = cookie.serialize(cookieName, token, cookieOptions);
  document.cookie = cookieSerialized;
  return true;
}