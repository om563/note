import React, { useContext, useState } from "react";
import Style from "./SignIn.module.css"
import { useFormik, validateYupSchema } from "formik";
import * as yup from "yup";
import img from "../../Assets/Images/Notebook-cuate.png"
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useQuery } from "react-query";
import { userContext } from "../../Context/UserContext";

export default function SignUp() {
  let navigate = useNavigate()
  let { signIn } = useContext(userContext);
  const [SignInError, setSignInError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);



  async function usersignIn(values) {
    setIsLoading(true)
    let res = await signIn(values);
    if (res.data) {
      setIsLoading(false);
      navigate('/notes')
      localStorage.setItem('token',`3b8ny__${res.data.token}`);
    }
    if (res.response.data.msg) {
      setSignInError(res.response.data.msg);
    }

  }

  let validationSchema = yup.object({
    email: yup.string().required('*Your email is required').email("*Email must be valid email"),
    password: yup.string().required('*Your password is required').matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/, "at least one letter and one number"),

  })

  let formik = useFormik({
    initialValues: {
      email: "",
      password: "",

    },
    onSubmit: usersignIn, validationSchema
  });

  return (
    <>
      <div className="container">
        <div className="row">

          <div className="col-md-6">
            <img className="w-100" src={img} alt="" />
          </div>

          <div className="col-md-6 py-5 rounded-3 shadow  mt-5  ">

            <form onSubmit={formik.handleSubmit} className={` ${Style.padding}`}>
              {SignInError ? <div className="alert alert-danger py-2">{SignInError}</div> : ""}
              <h2>Sign up</h2>

              <div className="d-flex justify-content-center align-items-center mt-3">
                <label htmlFor="email">
                  <i className="fa-solid fa-envelope"></i>
                </label>
                <input id="email" value={formik.values.email} onChange={formik.handleChange} onBlur={formik.handleBlur} type="email" placeholder="Your Email" name="email" />
              </div>
              {formik.errors.email && formik.touched.email ? <div className="alert alert-danger mt-3 w-100 py-1 mt-3">{formik.errors.email}</div> : ""}

              <div className="d-flex justify-content-center align-items-center mt-4">
                <label htmlFor="password">
                  <i className="fa-solid fa-lock"></i>
                </label>
                <input id="password" value={formik.values.password} onChange={formik.handleChange} onBlur={formik.handleBlur} type="password" placeholder="Your Password" name="password" />
              </div>
              {formik.errors.password && formik.touched.password ? <div className="alert alert-danger mt-3 py-1 mt w-100">{formik.errors.password}</div> : ""}

              {isLoading === false ? <button disabled={!(formik.isValid && formik.dirty)} type="submit" className="btn btn-danger my-3">Login</button> :
                <button type="submit" className="btn btn-danger my-3"><i className="fas fa-spinner fa-spin"></i></button>
              }
              <div className="d-flex justify-content-center align-items-center flex-column"> 
              <h5>Or Sign in with</h5>
              <div className="w-25  fs-4 d-flex justify-content-between">
                <i className="fa-brands fa-facebook text-primary"></i>
                <i className="fa-brands fa-twitter text-info"></i>
                <i className="fa-brands fa-google-plus-g text-danger"></i>
              </div>
              
              <h5 className="mt-5">Don't Have an Account ?<Link className="text-decoration-none" to={"/"}>  Sign Up</Link></h5>
              </div>
            </form>
          </div>




        </div>
      </div>
    </>


  );




}
