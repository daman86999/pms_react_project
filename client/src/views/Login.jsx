import { useLazyQuery } from "@apollo/client";
import React, { useContext, useState } from "react";
import Snackbar from "../components/Snackbar";
import { useSnackbar } from "../hooks/useSnackbar";
import { LOGIN } from "../queries/LOGIN";
import AuthContext from "../context/authContext";
import { Link } from "react-router-dom";
import Spinner from "../components/Spinner";

function Login() {
  const intialState = {
    email: "",
    password: "",
  };

  const [data, setData] = useState(intialState);

  const { isActive, message, openSnackBar } = useSnackbar();

  const { setCurrentAuthData } = useContext(AuthContext);

  const [login, { loading }] = useLazyQuery(LOGIN, {
    onCompleted: (authData) => {
      const { token, id, tokenExpiration } = authData.login;
      setCurrentAuthData({ token, id, tokenExpiration });
      openSnackBar("Logged in successfully", "success");
    },
    onError: (err) => {
      let message = err.message ?? "Something went wrong while signing in";
      openSnackBar(message, "error");
    },
  });

  const { email, password } = data;

  const onSubmit = (e) => {
    e.preventDefault();

    if (email === "" || password === "") {
      return alert("Please fill in all fields");
    }

    login({
      variables: data,
    });
  };

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setData((previousState) => ({
      ...previousState,
      [name]: value,
    }));
  };

  if (loading) return <Spinner />;

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-lg-10 col-xl-9 mx-auto">
            <div className="card flex-row my-5 border-0 shadow rounded-3 overflow-hidden">
              <div className="card-img-left d-none d-md-flex"></div>
              <div className="card-body p-4 p-sm-5">
                <h5 className="card-title text-center mb-5 fw-light fs-5">
                  Sign In
                </h5>
                <form onSubmit={onSubmit}>
                  <div className="form-floating mb-3">
                    <input
                      type="email"
                      className="form-control"
                      id="email"
                      name="email"
                      value={email}
                      onChange={handleOnChange}
                      placeholder="name@example.com"
                    />
                    <label htmlFor="email">Email address</label>
                  </div>

                  <hr />

                  <div className="form-floating mb-3">
                    <input
                      type="password"
                      className="form-control"
                      id="password"
                      name="password"
                      value={password}
                      onChange={handleOnChange}
                      placeholder="Password"
                    />
                    <label htmlFor="password">Password</label>
                  </div>

                  <div className="d-grid mb-2">
                    <button
                      className="btn btn-lg btn-primary btn-login fw-bold text-uppercase"
                      type="submit"
                    >
                      Sign in
                    </button>
                  </div>
                  <Link
                    to={"/signup"}
                    className="d-block text-center mt-4 small"
                  >
                    Don&apos;t have an account? Register here
                  </Link>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Snackbar isActive={isActive} message={message} />
    </>
  );
}

export default Login;
