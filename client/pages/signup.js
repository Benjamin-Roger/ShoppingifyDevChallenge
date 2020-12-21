import { useRouter } from "next/router";

import React, { useState } from "react";

import Layout from "@/components/Layout";

import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";

import axios from "axios";

import { NotificationDispatch } from "@/context/Notification/context";
import { addNewNotification } from "@/context/Notification/utils";
import { useContext } from "react";

const SignUpPage = () => {
  const router = useRouter();

  const notificationDispatch = useContext(NotificationDispatch);

  const [values, setValues] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    axios({
      method: "post",
      url: `${process.env.NEXT_PUBLIC_BASE_API_URL}/api/users/signup`,
      data: {
        email: values.email,
        password: values.password,
      },
    })
      .then(function (response) {
        addNewNotification(
          {
            content: `The account has been created. Please log in with your credentials.`,
            severity: "success",
          },
          notificationDispatch
        );

        router.push("/account");
      })
      .catch(function (error) {
        console.log(error);

        addNewNotification(
          {
            content: `There has been an issue with your account creation. Please retry later`,
            severity: "error",
          },
          notificationDispatch
        );
      });
  };

  return (
    <>
      <Layout title="Sign up">
        <h1>Sign up</h1>

        <form noValidate>
          <TextField
            value={values.email}
            onChange={(e) => setValues({ ...values, email: e.target.value })}
            id="email"
            label="E-mail"
          />
          <TextField
            value={values.password}
            id="password"
            onChange={(e) => setValues({ ...values, password: e.target.value })}
            label="Password"
            type="password"
            autoComplete="new-password"
          />

          <Button color="primary" variant="contained" onClick={handleSubmit}>
            Submit
          </Button>
        </form>
      </Layout>
      <style jsx>{`
        form {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
      `}</style>
    </>
  );
};

export default SignUpPage;
