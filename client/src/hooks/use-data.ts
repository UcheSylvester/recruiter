import { AxiosRequestConfig } from "axios";
import { useState } from "react";
import { APIClient } from "../helpers/api-client";

export interface UseData extends AxiosRequestConfig {
  callback?: (data: any) => void;
}

const useData = (kwargs: UseData) => {
  const { url, callback } = kwargs;
  const [data, setData] = useState();
  const [error, setError] = useState(null);

  const makeRequest = async (options: AxiosRequestConfig) => {
    try {
      const client = APIClient as any;
      const response = await client[options.method || "get"](url, options);
      setData(response?.data);
      if (callback) callback(response?.data);

      return response;
    } catch (e) {
      console.log({ error: e });
      setError(e as any);
    }
  };

  return {
    data,
    error,
    isLoading: !error && !data,
    makeRequest,
  };
};

export default useData;
