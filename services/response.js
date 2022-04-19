// response.js

export function handleResponse(response) {
    if (response.results) {
      return response.results;
    }
  
    if (response.data) {
      return response.data;
    }
    else if(response.body)
    return response.json();

    return response;
  }

  
  export function handleError(error) {
    console.log('Error', JSON.stringify(error));
    if (error.data) {
      return error.data;
    }
    return error;
  }