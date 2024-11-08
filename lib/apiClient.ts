import axios from "axios";

type ApiClientADR<T> = [T, null] | [null, Error];

const postRequest = async <T>(
  url: string,
  params?: Record<string, unknown>
): Promise<ApiClientADR<T>> => {
  // post request with cookie credentials
  try {
    const { data, status } = await axios.post<T>(url, params || {}, {
      withCredentials: true,
    });
    if (status !== 200) {
      return [null, new Error("Request failed")];
    }
    return [data, null];
  } catch (e) {
    if (e instanceof Error) {
      return [null, e];
    } else {
      return [null, new Error("Request failed")];
    }
  }
};

const getRequest = async <T>(url: string): Promise<ApiClientADR<T>> => {
  // get request with cookie credentials
  try {
    const { data, status } = await axios.get<T>(url, {
      withCredentials: true,
    });
    if (status !== 200) {
      return [null, new Error("Request failed")];
    }
    return [data, null];
  } catch (e) {
    if (e instanceof Error) {
      return [null, e];
    } else {
      return [null, new Error("Request failed")];
    }
  }
};

const apiClient = { postRequest, getRequest };

export default apiClient;
