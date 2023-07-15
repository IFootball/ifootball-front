import { cookies } from 'next/headers'
import { user_type } from './types'
import decode from 'jwt-decode'
export function getUser(): user_type {
    const token = cookies().get('token')?.value
    if (!token) {
      throw new Error('User not authentucated')
    }
  
    const user: user_type = decode(token)
    return user
  }