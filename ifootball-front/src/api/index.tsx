import axios from "axios";
import { TeamUserResponse, classes_type, completePlayerScout, playerType, point_fields_type, teamClassPlayer, user_team_type, user_type } from "./types";
import Config from '../../package.json';
import { getToken } from "./functions";

const axiosConfig = {
    "Content-Type": "application/json;charset=UTF-8",
    "Access-Control-Allow-Origin": "*",
};

const setAuthorizationHeader = () => {
    const token = getToken()?.toString();
    if (token) {
        api.defaults.headers["Authorization"] = `Bearer ${token}`;
    }
};

const api = axios.create({
    baseURL: Config.apiLink,
    headers: axiosConfig,
});

export default {
    authentication: {
        createAccount: async (data: any): Promise<user_type> => {
            const createUserRequest = {
                IdClass: Number(data.idClass),
                Name: data.name,
                Email: data.email,
                Password: data.password,
            };

            try {
                const response = await api.post("/users", createUserRequest);
                return response.data;
            } catch (error) {
                throw error;
            }
        },

        login: async (email: string, password: string): Promise<{ error?: { message: string, statusCode: number }, user: { id: number, role: 0 | 1 }, token: string }> => {
            try {
                const response = await api.post('/users/login', { email, password });
                return response.data;
            } catch (error) {
                throw error;
            }
        }
    },
    classes: {
        list: async (): Promise<classes_type[]> => {
            try {
                const response = await api.get('/classes');
                return response.data;
            } catch (error) {
                throw error;
            }
        }
    },
    players: {
        list: async (size: number, idGender: number, playerType: number): Promise<{ data: playerType[], totalPage: number, totalRegisters: number, lastPage: boolean }> => {
            setAuthorizationHeader();
            try {
                const response = await api.get('/players', {
                    params: {
                        Take: size,
                        idGender: idGender,
                        playerType: playerType,
                    }
                });
                return response.data;
            } catch (error) {
                throw error;
            }
        },
        getScout: async(idPlayer: number): Promise<{ completePlayerDto: completePlayerScout}> => {
            setAuthorizationHeader();
                const response = await api.get('/players/'+idPlayer);
        
                return response.data;
        },
        setScout: async(idPlayer: number, goals: number,assists: number,yellowCard: number,redCard: number,fouls: number,wins: number,takenGols: number | null, penaltySaves: number | null, saves: number | null ): Promise<{ completePlayerDto: completePlayerScout}> => {
            setAuthorizationHeader();
                const response = await api.patch('/players/'+idPlayer, {
                        goals: goals,
                        assists: assists,
                        yellowCard: yellowCard,
                        redCard: redCard,
                        fouls: fouls,
                        wins: wins,
                        takenGols:takenGols,
                        penaltySaves: penaltySaves,
                        saves: saves
                  });
        
                return response.data;
        }
    },
    team: {
        save: async (gkId: number, idLinePlayerFour: number, idLinePlayerThree: number, idLinePlayerTwo: number, idLinePlayerOne: number, idReservePlayerTwo: number, idReservePlayerOne: number, idCaptain: number, idGender: number): Promise<TeamUserResponse> => {
            setAuthorizationHeader();
            try {
                const response = await api.post(`/team-users/${idGender}`, {
                    idGoalkeeper: gkId,
                    idLinePlayerFour,
                    idLinePlayerThree,
                    idLinePlayerOne,
                    idLinePlayerTwo,
                    idReservePlayerOne,
                    idReservePlayerTwo,
                    idCaptain
                });
                console.log(response.config)
                return response.data;
            } catch (error) {
                throw error;
            }
        },
        get: async (idGender: number): Promise<user_team_type> => {
            setAuthorizationHeader();
            try {
                const response = await api.get(`/team-users/${idGender}`);
                return response.data;
            } catch (error) {
                throw error;
            }
        }
    },
    teamClass: {
        list: async (page: number, take: number): Promise<{ data: classes_type[], totalPage: number, totalRegisters: number, lastPage: boolean }> => {
            setAuthorizationHeader();
            try {
                const response = await api.get('/team-classes', {
                    params: {
                        Take: take,
                        Page: page,
                    }
                });
        
                return response.data;
            } catch (error) {
                throw error;
            }
        },
        listPlayers: async (idTeamClass: number,take: number, page: number): Promise<{ data: teamClassPlayer[], totalPage: number, totalRegisters: number, lastPage: boolean }> => {
            setAuthorizationHeader();
            try {
                const response = await api.get(`/team-classes/list-player/${idTeamClass}`, {
                    params: {
                        Take: take,
                        Page: page
                    }
                });
                return response.data;
            } catch (error) {
                throw error;
            }
        },
    },
    ranking: {
        assists: async (idGender: number, Page?: number, Take?: number): Promise<{data: point_fields_type[], totalPage: number, totalRegisters: number, lastPage: boolean}> => {
            setAuthorizationHeader();
            try {
                const response = await api.get(`/rankings/${idGender}/assists`, {
                    params: {
                        ...((Page) ? {Page} : {}),
                        ...((Take) ? {Take} : {})
                    }
                });
                return response.data;
            } catch (error) {
                throw error;
            }
        },
        goals: async (idGender: number, Page?: number, Take?: number): Promise<{data: point_fields_type[], totalPage: number, totalRegisters: number, lastPage: boolean}> => {
            setAuthorizationHeader();
            try {
                const response = await api.get(`/rankings/${idGender}/goal`, {
                    params: {
                        ...((Page) ? {Page} : {}),
                        ...((Take) ? {Take} : {})
                    }
                });
                return response.data;
            } catch (error) {
                throw error;
            }
        },
        scores: async (idGender: number, Page?: number, Take?: number): Promise<{data: point_fields_type[], totalPage: number, totalRegisters: number, lastPage: boolean}> => {
            setAuthorizationHeader();
            try {
                const response = await api.get(`/rankings/${idGender}/player-general`, {
                    params: {
                        ...((Page) ? {Page} : {}),
                        ...((Take) ? {Take} : {})
                    }
                });
                return response.data;
            } catch (error) {
                throw error;
            }
        },
        saves: async (idGender: number, Page?: number, Take?: number): Promise<{data: point_fields_type[], totalPage: number, totalRegisters: number, lastPage: boolean}> => {
            setAuthorizationHeader();
            try {
                const response = await api.get(`/rankings/${idGender}/defenses`, {
                    params: {
                        ...((Page) ? {Page} : {}),
                        ...((Take) ? {Take} : {})
                    }
                });
                return response.data;
            } catch (error) {
                throw error;
            }
        },
        highestScores: async (idGender: number, Page?: number, Take?: number): Promise<{data: point_fields_type[], totalPage: number, totalRegisters: number, lastPage: boolean}> => {
            setAuthorizationHeader();
            try {
                const response = await api.get(`/rankings/${idGender}/user`, {
                    params: {
                        ...((Page) ? {Page} : {}),
                        ...((Take) ? {Take} : {})
                    }
                });
                return response.data;
            } catch (error) {
                throw error;
            }
        },
    }
};
