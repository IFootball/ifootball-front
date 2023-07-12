import axios from "axios";
import { error_type, user_type } from "./types";

const simpleBasicFetch = async (endpoint: string, params: string) => {
  let str = `/${endpoint}`;

  if (params !== "") {
    str = `${str}?${params}`;
  }
  return await api.get(encodeURI(str));
};

type resultType<T> = {
  conex: boolean;
  reqStat: number;
  success: boolean;
  data: T;
};

const basicFetch = async (
  method: string,
  endpoint: string,
  params: object,
  alertConex?: boolean,
  alertError?: boolean
): Promise<resultType<any>> => {
  let result = {
    conex: true, //só fica em false quando cai no catch ou não responde nada
    reqStat: 0,
    success: false, //Setado em true quando tudo dá certo e status de retorno é 10
    data: false, //Conteúdo JSON recebido do servidor
    msg: "", //Inserido no Front -> Codigo de status que diz o que será carregado pra lá.
  };
  try {
    let r: any = false;
    try {
      r =
        method === "POST"
          ? await api.post(`/${endpoint}/`, buildParamString(params), {
              validateStatus: function (status) {
                return true;
              },
            })
          : method === "GET"
          ? await simpleBasicFetch(endpoint, buildParamString(params))
          : false;
    } catch (e: any) {
      r = e.response;
    }
    console.log("API_R: ", r);
    if (r) {
      result.reqStat = r.status;
      result.success = r.status === 200 || r.status === 201;
      if (r.data) result.data = r.data;
    } else {
      result.conex = false;
    }
  } catch (e) {
    console.log("AXIOS ERR: ", e);
    result.conex = false;
  }
  if (alertError && result.conex && !result.success) alert(result.msg);

  // console.log('API_RESPONSE: ', result);
  return result;
};

/**
 * Montar string de parâmetros para URL.
 * @param params JSON com parâmetros para enviar.
 * @returns Parametros no formato para URL.
 */
const buildParamString = (params: any) => {
  //##VER## UM MONTE DE CAGADAS DO WILL PRA ARRUMAR AQUI

  let str = "";
  Object.keys(params).map((key) => {
    let value = params[key];
    if (Array.isArray(value)) {
      value = JSON.stringify(value);
    } else if (value && typeof value == "object") {
      // value = value.toString();
      if (Object.keys(value).length > 0) {
        let micstr: string = "[";
        Object.keys(value).map((item) => {
          micstr = `${micstr}"${item}"="${value[item]}",`;
        });
        micstr = micstr.slice(0, -1); //remove o último ',';
        value = micstr + "]";
      }
    }

    str = `${str}${key}=${value}&`;
  });
  str = str.slice(0, -1); //remove o último '&'
  return str;
};

let axiosConfig = {
  "Content-Type": "application/json;charset=UTF-8",
  "Access-Control-Allow-Origin": "*",
};

const api = axios.create({
  baseURL: "https://localhost:8888/api",
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

      await api
        .post("/users", createUserRequest)
        .then(function (response) {
          console.log("res1-------", response);

          return response.data;
        })
        .then(function (data) {
          console.log("res2-------", data);
          // console.log(data);
        });
    },
  },
};
