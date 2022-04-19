import { handleResponse, handleError } from "./response";

const headers = {
    'Content-Type': 'application/json',
  };
  var requestOptions = {
    method: "POST",
    redirect: "follow",
  };
export const getRandomUser = () => {
    return fetch("https://randomuser.me/api/", {
      ...requestOptions,
      method: "GET",
      headers: {
        ...headers,
      },
    })
      .then(handleResponse)
      .catch(handleError);
  };