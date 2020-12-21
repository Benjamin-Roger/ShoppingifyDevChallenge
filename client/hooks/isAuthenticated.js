const { useState, useEffect } = require("react");

export const isAuthenticated = () => {
  const [token, setToken] = useState("");

  useEffect(() => {
    setToken(localStorage.token);
  });

  return token ? true : false;
};

