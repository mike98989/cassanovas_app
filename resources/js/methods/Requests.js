import * as constants from "../utils/Constants";
import axios from "axios";
export const fetchApi = async (url, method, body) => {
  let response = [];
  var requestOptions = {
    headers: {
      "cassanovas_authorize": "cassanovas.api",
      "Content-Type": "multipart/form-data",
    },
  };
  try {
    if (method == "POST") {
      response = await axios.post(
        constants.BASE_URL + "/api/v1/" + url,
        body,
        requestOptions
      );
    } else {
      response = await axios.get(
        constants.BASE_URL + "/api/v1/" + url,
        requestOptions
      );
    }
    //let json = response.json(); 
    const all_response = response;
    console.log("all_response", all_response);
    return all_response;
  } catch (error) {
    if (error.response.data) {
      console.log("error", error.response.data);
      return error.response;
    }

  }
};

export const fetchAuthApi = async (url, method, body) => {
  let result = {}
  let authTokens = localStorage.getItem('authTokens') ? JSON.parse(localStorage.getItem('authTokens')) : null
  // const user_data = localStorage.getItem("user_data")
  //   ? JSON.parse(localStorage.getItem("user_data"))
  //   : null;

  //let response = [];

  var requestOptions = {
    headers: {
      "cassanovas_authorize": "cassanovas.api",
      "Content-Type": "multipart/form-data",
      Authorization: "Bearer " + authTokens?.access_token,
    },
  };


  let ret_response = await originalRequest(url, method, body, requestOptions);
  if (ret_response) {
    if (ret_response.statusText == 'Unauthorized') {
      console.log("Get Refresh token");
      let refreshTokens = await refreshToken(authTokens);

      requestOptions["headers"] = {
        Authorization: `Bearer ${refreshTokens.access_token}`,
        "cassanovas_authorize": "cassanovas.api",
      };
      let newResponse = await originalRequest(url, method, body, requestOptions);
      result = newResponse.response;
      //let data = newResponse.data;
    }
    else {
      result = ret_response;
    }
  }

  return result;
};

/////////REFRESH TOKEN
let refreshToken = async (authTokens) => {
  let newToken = {}
  const formData = new FormData();
  formData.append("refresh_token", authTokens.refresh_token);
  formData.append('grant_type', 'refresh_token');
  var requestOptions = {
    headers: {
      "cassanovas_authorize": "cassanovas.api",
      "Content-Type": "multipart/form-data",
    },
  };

  let result = await axios.post(
    constants.BASE_URL + "/api/v1/refresh_token",
    formData,
    requestOptions
  );

  console.log("Data from refresh", result.data);
  if (!result.data.error) {
    console.log('inside this place');
    newToken = result.data;
    localStorage.setItem("authTokens", JSON.stringify(newToken));
    //newToken. = authTokens.refresh_token;
    return newToken;
  } else {
    localStorage.clear();
    window.location.href = constants.BASE_URL + "/signin"
    return result.data;
  }
  //console.log("auth", newToken);
  //localStorage.setItem("authTokens", JSON.stringify(authTokens));

};

let originalRequest = async (url, method, body, requestOptions) => {
  let data = {};
  let res = {}
  try {
    if (method == "POST") {
      res = await axios.post(
        constants.BASE_URL + "/api/v1/" + url,
        body,
        requestOptions
      );
    } else {
      res = await axios.get(
        constants.BASE_URL + "/api/v1/" + url,
        requestOptions
      );
    }
    data = res;

    console.log("REQUESTING", data);
    return data;
  } catch (error) {

    if (error.response.data) {
      console.log("error", error.response.data);
      return error.response;
    }
  }
};
