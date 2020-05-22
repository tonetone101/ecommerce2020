import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import Layout from "../core/Layout";
import { signin, authenticate, isAuthenticated } from "./userApi";

const Signin = () => {
  //writing state with multiple properties using useState()
  // values respresents the state and setValues represents a function to update the state
  const [values, setValues] = useState({
    email: "",
    password: "",
    error: "",
    loading: false,
    redirectToReferrer: false,
  });

  //destructuring properties from state
  const { email, password, error, loading, redirectToReferrer } = values;
  const { user } = isAuthenticated();

  // Higher Order Function(HOF), is a functiton returning another function
  const handleChange = (name) => (event) => {
    setValues({ ...values, error: false, [name]: event.target.value });
  };

  const clickSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, error: false, loading: true });
    // sending email, password of user property to backend by destructoring
    signin({ email, password }).then((data) => {
      if (data.error) {
        // updating the state by grabbing all the properties from the state named values with the setValues method
        // then updating them
        setValues({ ...values, error: data.error, loading: false });
      } else {
        // authenticate accepts the user data and a callback function as an arguement
        authenticate(data, () => {
          setValues({
            ...values,
            redirectToReferrer: true,
          });
        });
      }
    });
  };

  const signinForm = () => (
    <form>
      <div className="form-group">
        <label className="text-muted">Email</label>
        <input
          onChange={handleChange("email")}
          type="email"
          value={email}
          className="form-control"
        />
      </div>

      <div className="form-group">
        <label className="text-muted">Password</label>
        <input
          type="password"
          onChange={handleChange("password")}
          value={password}
          className="form-control"
        />
      </div>
      <button onClick={clickSubmit} className="btn btn-primary">
        Sign In
      </button>
    </form>
  );

  const showError = () => (
    <div
      className="alert alert-danger"
      style={{ display: error ? "" : "none" }}
    >
      {error}
    </div>
  );

  const showLoading = () =>
    loading && (
      <div className="alert alert-info">
        <h2>Loading....</h2>
      </div>
    );

  const redirectUser = () => {
    if (redirectToReferrer) {
      if (user && user.role === 1) {
        return <Redirect to="/admin/dashboard" />;
      } else {
        return <Redirect to="/user/dashboard" />;
      }
    }

    if (isAuthenticated()) {
      return <Redirect to="/" />;
    }
  };

  return (
    <Layout
      className="container col-md-8 offset-md-2"
      title="Sign In"
      description="Sign In to E-commerce App"
    >
      {showLoading()}
      {showError()}
      {signinForm()}
      {redirectUser()}
    </Layout>
  );
};

export default Signin;
