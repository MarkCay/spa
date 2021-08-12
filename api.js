const api = {};

api.get = (url, onSuccess, onError, parseJson = true) => {
  const xhr = new XMLHttpRequest();
  xhr.open("GET", url);
  xhr.setRequestHeader("x-api-key", "MORK_COY");
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.setRequestHeader("Access-Control-Allow-Credentials", true);
  xhr.setRequestHeader(
    "Authorization",
    "Basic " + btoa("markcay:mysql_markcay")
  );
  xhr.onload = () => {
    if (xhr.status === 404) {
      onError(xhr.responseText);
    } else if (xhr.status >= 200 <= 299) {
      onSuccess(parseJson ? JSON.parse(xhr.response) : xhr.response);
    }
  };
  xhr.onerror = () => {
    onError(xhr);
  };
  xhr.send();
};
