import { CookieSerializeOptions, serialize } from 'cookie';
import { user_type } from './types';
import decode from 'jwt-decode';

export function salvarTokenNoCookie(token: string): boolean {
  try {
    // const cookieName = 'testeCookie';
    // const cookieOptions: CookieSerializeOptions = {
    //   maxAge: 60,
    //   httpOnly: true,
    //   secure: true,
    //   sameSite: 'strict',
    // };
    // const cookieSerialized = serialize(cookieName, token, cookieOptions);
    // document.cookie = cookieSerialized;
    document.cookie = `user_token=${token}; path=/; expires=${new Date(Date.now() + 3600000).toUTCString()};`;
    return true;
  } catch (error) {
    console.error('Erro ao salvar o token no cookie:', error);
    return false;
  }
}

export function verifyToken(): {} | null {
  const cookies = document.cookie.split(';');
  for (const cookie of cookies) {
    const [name, value] = cookie.trim().split('=');
    if (name === 'user_token') {
      try {
        const decodedToken = decode(value);
        if (decodedToken) {
          return { decodedToken };
        }
      } catch (error) {
        console.error('Erro ao decodificar o token:', error);
        return null;
      }
    }
  }
  return null;
}