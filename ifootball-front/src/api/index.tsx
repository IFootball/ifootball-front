import axios from "axios";
import { classes_type, error_type, playerType, user_type } from "./types";
import Config from '../../package.json';
import { getToken } from "./functions";

let axiosConfig = {
    "Content-Type": "application/json;charset=UTF-8",
    "Access-Control-Allow-Origin": "*",
};

const api = axios.create({
    baseURL: Config.apiLink,
    headers: axiosConfig,
});


export default {
    authentication: {
        createAccount: async (data: any): Promise<user_type> => {
            let createUserRequest = {
                IdClass: Number(data.idClass),
                Name: data.name,
                Email: data.email,
                Password: data.password,
            };

            return await api
                .post("/users", createUserRequest)
                .then((response) => {
                    return response.data;
                })
                .catch((error) => {
                    return error;
                });
        },

        login: async (email: string, password: string): Promise<{ error?: { message: string, statusCode: number }, user: { id: number, role: number }, token: string }> => {
            return await api.post('/users/login', { email, password }).then((response) => { return response.data; });
        }
    },
    classes: {
        list: async (): Promise<classes_type[]> => {
            return (await api.get('/classes')).data;
        }
    },
    players: {
        male: {
            goalkeeper: {
                list: async (size: number): Promise<{ data: playerType[], totalPage: number, totalRegisters: number, lastPage: boolean }> => {
                    const data = {
                        Take: size,
                        playerType: 1,
                        idGender: 1,
                        
                    }
                    api.defaults.headers["Authorization"] =  'Bearer ' + getToken()?.toString();
                    return await api.get('/players', { data }).then((response) => { return response.data; });
                }
            },
            line: {
                list: async (size: number): Promise<{ data: playerType[], totalPage: number, totalRegisters: number, lastPage: boolean }> => {
                    const data = {
                        Take: size,
                        playerType: 0,
                        idGender: 1
                    }
                                        
                    api.defaults.headers["Authorization"] =  'Bearer ' + getToken()?.toString();
                    return await api.get('/players', {data}).then((response) => { return response.data })
                }
            },
            list: async (size: number): Promise<{ data: playerType[], totalPage: number, totalRegisters: number, lastPage: boolean }> => {
                const data = {
                    Take: size,
                    idGender: 1,
                }
                api.defaults.headers["Authorization"] =  'Bearer ' + getToken()?.toString();
                return await api.get('/players', { data }).then((response) => { return response.data })
            }
        },
        female: {
            goalkeeper: {
                list: async (size: number): Promise<{ data: playerType[], totalPage: number, totalRegisters: number, lastPage: boolean }> => {
                    const data = {
                        Take: size,
                        playerType: 1,
                        idGender: 2,
                        headers: {
                            'Authorization': 'Bearer ' + getToken()
                        }
                    }
                    console.log(data)
                    return await api.get('/players', { data }).then((response) => { return response.data; });
                }
            },
            line: {
                list: async (size: number): Promise<{ data: playerType[], totalPage: number, totalRegisters: number, lastPage: boolean }> => {
                    const data = {
                        Take: size,
                        playerType: 0,
                        idGender: 2,
                        headers: {
                            'Authorization': 'Bearer ' + getToken()
                        }
                    }
                    return await api.get('/players', { data }).then((response) => { return response.data })
                }
            },
            list: async (size: number): Promise<{ data: playerType[], totalPage: number, totalRegisters: number, lastPage: boolean }> => {
                const data = {
                    Take: size,
                    idGender: 2,
                    headers: {
                        'Authorization': 'Bearer ' + getToken()
                    }
                }
                
                return await api.get('/players', { data }).then((response) => { return response.data })
            }
        },
        list: async (size: number): Promise<{ data: playerType[], totalPage: number, totalRegisters: number, lastPage: boolean }> => {
            const data = {
                Take: size,
                headers: {
                    'Authorization': 'Bearer ' + getToken()
                }
            }
            return await api.get('/players', { data }).then((response) => { return response.data })
        }
    }
};