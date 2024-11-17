import axios from "axios";

const api = axios.create({
  baseURL: "https://api.fr.stg.shipglobal.in/api/v1/auth/login",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

const logOnDev = (message) => {
  console.log(message);
};

const onRequest = (config) => {
  const { method, url } = config;
  const accessToken = localStorage.getItem("token");
  if (accessToken) {
    config.headers["Authorization"] = `Bearer ${accessToken}`;
  }
  logOnDev(`🚀 [API] ${method?.toUpperCase()} ${url} | Request`);

  return config;
};

api.interceptors.request.use(onRequest);

api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response?.status === 401) {
      localStorage.clear();
      sessionStorage.clear();
      window.location.href = "/";
    }
    console.error("Looks like there was a problem. Status Code: " + error.response.status);
    return Promise.reject(error);
  },
);

export const publicApi = axios.create({
  baseURL: "https://api.fr.stg.shipglobal.in/api/v1/auth/login",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

const formDataApi = axios.create({
  baseURL: "https://api.fr.stg.shipglobal.in/api/v1/auth/login",
  headers: {
    Accept: "application/json",
    "Content-type": "multipart/form-data",
  },
});

formDataApi.interceptors.request.use(onRequest);

formDataApi.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response?.status === 401) {
      window.location.href = "/";
    }
    console.error("Looks like there was a problem. Status Code: " + error.response.status);
    return Promise.reject(error);
  },
);

const downloadFile = (res, defaultFileName) => {
  // Determine the file name from the response headers
  const contentDisposition = res.headers["content-disposition"];

  let fileName = defaultFileName;

  if (contentDisposition) {
    // Match both filename and filename* (RFC 5987)
    const fileNameMatch = contentDisposition.match(/filename\*?=['"]?([^;\r\n]+)['"]?/);
    if (fileNameMatch && fileNameMatch.length > 1) {
      fileName = decodeURIComponent(fileNameMatch[1].replace(/['"]/g, ""));
    }
  }

  const blob = new Blob([res.data], { type: res.headers["content-type"] });
  const url = window.URL.createObjectURL(blob);

  // Create a hidden download link and click it programmatically
  const link = document.createElement("a");
  link.href = url;
  link.setAttribute("download", fileName);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  // Clean up the URL object
  window.URL.revokeObjectURL(url);
};

export { formDataApi, downloadFile };
export default api;

export const login = async (data) => {
  try {
    const response = await publicApi.post("", data); // URL already provided in baseURL
    if (response.status === 200) {
      return response.data;
    } else {
      return response.data;
    }
  } catch (error) {
    console.error("Error during login:", error.response || error.message || error);
    // Return an error object to help the caller handle it
    return {
      status: error.response?.status || 500, // Fallback to 500 for unknown errors
      data: error.response?.data || { message: "Something went wrong" },
    };
  }
};
