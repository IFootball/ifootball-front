import axios from "axios";
import { error_type, user_type } from "./types";


let axiosConfig = {
  "Content-Type": "application/json;charset=UTF-8",
  // "Access-Control-Allow-Origin": "*",
};

const api = axios.create({
  baseURL: "https://localhost:7063/api/",
  headers: axiosConfig,
});

export default {
  authentication: {
    createAccount: async (data: any): Promise<any> => {
      // return await basicFetch('POST', 'users/', data)

      let createUserRequest = {
        IdClass: Number(data.idClass),
        Name: data.name,
        Email: data.email,
        Password: data.password,
      };

      return await api
        .post("/users", JSON.stringify(createUserRequest))
        .then((response) => {
          return response.data;
        })
        .catch((error) => {
          return error.response;
        });
    },

    login: async (data: any): Promise<any> => {
      
    }
  },
};
