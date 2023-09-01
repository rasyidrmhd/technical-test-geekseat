import axiosInstance from "config/axios";

const usePromiseAll = async (resource: string, endpoints: string[]) => {
  try {
    const resp = await Promise.all(
      endpoints.map(async (endpoint) => {
        const get = await axiosInstance.get(endpoint);
        return get.data[resource === "films" ? "title" : "name"];
      })
    );
    return resp;
  } catch (error) {
    console.log(error);
  }
};

export default usePromiseAll;
