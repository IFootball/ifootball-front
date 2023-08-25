import { useRouter } from 'next/router';
import { JWTToken } from './types';
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
        const decodedToken: JWTToken = decode(token);
        const expires = new Date(decodedToken.exp * 1000).toString();
        document.cookie = `user_token=${token}; path=/; expires=${expires};`;
        return true;
    } catch (error) {
        return false;
    }
}

export function verifyToken(): JWTToken | null {
    const cookies = document.cookie.split(';');
    for (const cookie of cookies) {
        const [name, value] = cookie.trim().split('=');
        if (name === 'user_token') {
            try {
                const decodedToken: JWTToken = decode(value);
                if (decodedToken) {
                    return decodedToken;
                }
            } catch (error) {
                return null;
            }
        }
    }
    return null;
}

export function getToken(): string | null {
    const cookies = document.cookie.split(';');
    for (const cookie of cookies) {
        const [name, value] = cookie.trim().split('=');
        if (name === 'user_token') {
            return value;
        }
    }
    return null
}

export function deleteCookie(name: string) {
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
}
export function splitName(name: string) {
    const nameParts = name.split(' ');
    
    if (nameParts.length >= 2) {
        const firstName = nameParts[0];
        const lastName = nameParts[nameParts.length - 1];

        const formattedFirstName = firstName[0].toUpperCase() + '.';
        
        if (name.length > 15) {
            const formattedLastName = lastName.substring(0, 7) + '...';
            return `${formattedFirstName} ${formattedLastName}`;
        } else if (name.length > 11) {
            return `${formattedFirstName} ${lastName}`;
        }
    }
    
    return name;
}