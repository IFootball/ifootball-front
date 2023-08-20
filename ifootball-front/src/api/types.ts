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
    idGender: string,
    className: string
}

export type JWTToken = {
    Id: string,
    exp: number,
    iat: number,
    nbf: number,
    role: "User" | "Administrator"
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
export type teamClassPlayer = {
    id: number,
    name: string,
    score: number,
}