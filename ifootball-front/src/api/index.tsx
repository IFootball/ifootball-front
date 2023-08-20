import axios from "axios";
import { classes_type, playerType, user_type, teamClassPlayer } from "./types";
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
        
                console.log(response.data);
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
                const response = await api.get('/team-classes/list-player/'+idTeamClass, {
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
};
