
import { user_type } from './types'
var cookie = require('cookie');
import decode from 'jwt-decode'
export function getUser(): user_type {
  const token = cookie().get('token')?.value
  if (!token) {
    throw new Error('User not authentucated')
  }

  const user: user_type = decode(token)
  return user
}



export function salvarTokenNoCookie(token: string): boolean {
  // Nome do cookie onde você deseja armazenar o token
  const cookieName = 'meuToken';

  // Opções para configuração do cookie
  const cookieOptions = {
    maxAge: 3600, // Tempo de vida do cookie em segundos (1 hora)
    httpOnly: true, // O cookie só pode ser acessado pelo servidor (não pelo JavaScript no cliente)
    secure: true, // O cookie só será enviado em conexões HTTPS
    sameSite: 'strict' // O cookie só será enviado em solicitações do mesmo site
  };

  // Serializar o token no formato adequado para o cookie
  const cookieSerialized = cookie.serialize(cookieName, token, cookieOptions);

  // Definir o cookie no navegador
  document.cookie = cookieSerialized;
  return true;
}