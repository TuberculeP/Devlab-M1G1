import axios, { AxiosError } from "axios";

type ApiClientADR<T> = [T, null] | [null, AxiosError];

const postRequest = async <T>(
  url: string,
  params?: Record<string, unknown>
): Promise<ApiClientADR<T>> => {
  // post request with cookie credentials
  try {
    const { data, status } = await axios.post<T>(url, params || {}, {
      withCredentials: true,
    });
    if (status < 200 || status >= 300) {
      return [null, new AxiosError(`Request failed with status code ${status}`)];
    }
    return [data, null];
  } catch (e) {
    if (e instanceof AxiosError) {
      return [
        null,
        {
          ...e,
          message: e.response?.data || e.message,
        },
      ];
    } else {
      return [null, new AxiosError("Request failed")];
    }
  }
};

const getRequest = async <T>(url: string): Promise<ApiClientADR<T>> => {
  // get request with cookie credentials
  try {
    const { data, status } = await axios.get<T>(url, {
      withCredentials: true,
    });
    if (status < 200 || status >= 300) {
      return [null, new AxiosError(`Request failed with status code ${status}`)];
    }
    return [data, null];
  } catch (e) {
    if (e instanceof AxiosError) {
      return [null, e];
    } else {
      return [null, new AxiosError("Request failed")];
    }
  }
};

const putRequest = async <T>(
  url: string,
  params?: Record<string, unknown>
): Promise<ApiClientADR<T>> => {
  try {
    const { data, status } = await axios.put<T>(url, params || {}, {
      withCredentials: true,
    });
    if (status < 200 || status >= 300) {
      return [null, new AxiosError(`Request failed with status code ${status}`)];
    }
    return [data, null];
  } catch (e) {
    if (e instanceof AxiosError) {
      return [
        null,
        {
          ...e,
          message: e.response?.data || e.message,
        },
      ];
    } else {
      return [null, new AxiosError("Request failed")];
    }
  }
};

const deleteRequest = async <T>(
  url: string
): Promise<ApiClientADR<T>> => {
  try {
    const { data, status } = await axios.delete<T>(url, {
      withCredentials: true,
    });
    if (status < 200 || status >= 300) {
      return [null, new AxiosError(`Request failed with status code ${status}`)];
    }
    return [data, null];
  } catch (e) {
    if (e instanceof AxiosError) {
      return [null, e];
    } else {
      return [null, new AxiosError("Request failed")];
    }
  }
};

const apiClient = { postRequest, getRequest, putRequest, deleteRequest };

export default apiClient;
