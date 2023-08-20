import axios from "axios";
import { TeamUserResponse, classes_type, playerType, user_team_type, user_type } from "./types";
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
    }
};
