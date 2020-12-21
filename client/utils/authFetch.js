import axios from "axios";

const authFetch = (url) =>
  axios
    .get(url, {
      headers: {
        Authorization: "Bearer " + localStorage.token,
      },
    })
    .then((res) => res.data);

export { authFetch };
