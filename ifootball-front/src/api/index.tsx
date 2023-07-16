import axios from "axios";
import { error_type, user_type } from "./types";
import { setUser } from "./functions";


let axiosConfig = {
  "Content-Type": "application/json;charset=UTF-8",
  // "Access-Control-Allow-Origin": "*",
};

const api = axios.create({
  baseURL: "https://localhost:8888/api/",
  headers: axiosConfig,
});

export default {
  authentication: {
    createAccount: async (data: any): Promise<user_type> => {
      // return await basicFetch('POST', 'users/', data)

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

    login: async (email: string, password: string): Promise<{error: {message: string, statusCode: number}, user: {id: number, role: number}, token: string}> => {
      return await api.post('/users/login', {email, password}).then((response) => {
        if (response) {
          // if (setUser(response.data.token, 60 * 60 * 8)) {
          //   return response.data;
          // }
        }
      }).catch((error) => {
        return error;
      })
    }
  },
};
