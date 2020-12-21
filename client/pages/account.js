import { useRouter } from "next/router";

import Button from "@material-ui/core/Button";

import { isAuthenticated } from "@/hooks/isAuthenticated";
import Layout from "@/components/Layout";

import TextField from "@material-ui/core/TextField";

import axios from "axios";

import { useState } from "react";

const LoginPage = () => {
  const router = useRouter();

  const [values, setValues] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    axios({
      method: "post",
      url: `${process.env.NEXT_PUBLIC_BASE_API_URL}/api/users/login`,
      data: {
        email: values.email,
        password: values.password,
      },
    })
      .then(function (response) {
        localStorage.setItem("userId", response.data.userId);
        localStorage.setItem("token", response.data.token);

        router.push("/");
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const handleLogOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");

    router.push("/");
  };

  const isUserAuthenticated = isAuthenticated();

  return (
    <>
      <Layout title="Login">
        <h1>Account</h1>

        {isUserAuthenticated ? (
          <p>
            I want to{" "}
            <Button color="primary" variant="contained" onClick={handleLogOut}>
              Log out
            </Button>
          </p>
        ) : (
          false
        )}

        {!isUserAuthenticated ? (
          <>
            <form noValidate>
              <TextField
                value={values.email}
                onChange={(e) =>
                  setValues({ ...values, email: e.target.value })
                }
                id="email"
                label="E-mail"
              />
              <TextField
                value={values.password}
                id="password"
                onChange={(e) =>
                  setValues({ ...values, password: e.target.value })
                }
                label="Password"
                type="password"
              />

              <Button
                color="primary"
                variant="contained"
                onClick={handleSubmit}
              >
                Submit
              </Button>
            </form>
          </>
        ) : (
          false
        )}
      </Layout>
      <style jsx>{`
      form {
        display:flex;
        flex-direction:column;
        gap:10px;
      }
      `}</style>
    </>
  );
};

export default LoginPage;
