import React from "react";
import { useState } from "react";
import { useMutation } from "@apollo/client";
import { ADD_CLIENT } from "../queries/ADD_CLIENT";
import Snackbar from "../components/Snackbar";
import { useSnackbar } from "../hooks/useSnackbar";
import { Link, useNavigate } from "react-router-dom";

export default function Signup() {
  const intialState = {
    name: "",
    email: "",
    phone: "",
    password: "",
  };
  const navigate = useNavigate();
  const [data, setData] = useState(intialState);
  const { isActive, message, openSnackBar } = useSnackbar();
  const [addClient] = useMutation(ADD_CLIENT, {
    onCompleted: () => {
      navigate("/signin");
      openSnackBar("Added new client successfully", "success");
    },
    onError: (err) => {
      let message =
        err.message ?? "Something went wrong while adding new client";
      openSnackBar(message, "error");
    },
  });
  const { name, email, password, phone } = data;

  const onSubmit = (e) => {
    e.preventDefault();
    if (name === "" || email === "" || phone === "" || password === "") {
      return alert("Please fill in all fields");
    }
    addClient({ variables: data });

    // setData(intialState);
  };

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setData((previousState) => ({
      ...previousState,
      [name]: value,
    }));
  };

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-lg-10 col-xl-9 mx-auto">
            <div className="card flex-row my-5 border-0 shadow rounded-3 overflow-hidden">
              <div className="card-img-left d-none d-md-flex"></div>
              <div className="card-body p-4 p-sm-5">
                <h5 className="card-title text-center mb-5 fw-light fs-5">
                  Register
                </h5>
                <form onSubmit={onSubmit}>
                  <div className="form-floating mb-3">
                    <input
                      type="text"
                      className="form-control"
                      id="name"
                      name="name"
                      value={name}
                      onChange={handleOnChange}
                      placeholder="myname"
                      required
                      autoFocus
                    />
                    <label htmlFor="name">Name</label>
                  </div>

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

                  <div className="form-floating mb-3">
                    <input
                      type="text"
                      className="form-control"
                      id="phone"
                      name="phone"
                      value={phone}
                      onChange={handleOnChange}
                      placeholder="999-999-9999"
                    />
                    <label htmlFor="phone">Phone number</label>
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

                  {/* <div className="form-floating mb-3">
                    <input
                      type="password"
                      className="form-control"
                      id="passwordConfirm"
                      placeholder="Confirm Password"
                    />
                    <label htmlFor="passwordConfirm">Confirm Password</label>
                  </div> */}

                  <div className="d-grid mb-2">
                    <button
                      className="btn btn-lg btn-primary btn-Signup fw-bold text-uppercase"
                      type="submit"
                    >
                      Register
                    </button>
                  </div>

                  <Link
                    to={"/login"}
                    className="d-block text-center mt-4 small"
                  >
                    Have an account? Sign In
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
