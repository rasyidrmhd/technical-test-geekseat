import { AxiosError, AxiosResponse } from "axios";
import axiosInstance from "config/axios";

const promiseAll = async (resource: string, endpoints: string[]) => {
  try {
    const resp = await Promise.all(
      endpoints.map(async (endpoint) => {
        const get = await axiosInstance.get(endpoint);
        return get.data[resource === "films" ? "title" : "name"];
      })
    );
    return resp;
  } catch (error) {
    const { response } = error as AxiosError;
    const { data } = response as AxiosResponse;
    return data.message;
  }
};

export default promiseAll;
