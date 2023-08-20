export type user_type = {
  idClass: number;
  name: string;
  email: string;
};
export type error_type = {
  message: string;
  statusCode: number;
};

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
export type completePlayerScout = {
    id: number;
    name: string;
    image: string;
    className: string;
    idTeamClass: number;
    idGender: number;
    playerType: number;
    assists: number;
    fouls: number;
    goals: number;
    redCard: number;
    wins: number;
    yellowCard: number;
    takenGols: number;
    penaltySaves: number;
    saves: number;
  };
  
  export enum ScoutTypeEnum {
      Goals = "goals",
      Assists = "assists",
      Fouls = "fouls",
      RedCard = "redCard",
      Wins = "wins",
      YellowCard = "yellowCard",
      TakenGols = "takenGols",
      Saves = "saves",
      PenaltySaves = "penaltySaves",
    }
  
  export enum playerTypeEnum {
    Linha = 0,
    Goleiro = 1,
  }