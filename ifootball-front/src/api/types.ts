export type user_type = {
    idClass: number,
    name: string,
    email: string
}
export type error_type = {
    message: string,
    statusCode: number
}

export type classes_type = {
    id: number,
    name: string
}

export type JWTToken = {
    Id: string,
    exp: number,
    iat: number,
    nbf: number,
    role: string
}