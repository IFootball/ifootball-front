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

// 0 - Jogador normal | 1 - goleiro
// 1 - machos | 2 - fêmeas

export type playerType = {
    id: number,
    name: string,
    image: string,
    className: string,
    idTeamClass: number,
    idGender: number,
    playerType: number,
    inSquad?: boolean
}