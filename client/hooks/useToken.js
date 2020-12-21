import { useState, useEffect } from "react";

const useToken = () => {
  const [token, setToken] = useState('');

  useEffect(() => {
    setToken(localStorage.getItem("token") || "");
  }, [token]);

  return token;
};

export { useToken };
