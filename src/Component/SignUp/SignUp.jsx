import React, { useContext, useState } from "react";
import Style from "./SignUp.module.css"
import { useFormik, validateYupSchema } from "formik";
import * as yup from "yup";
import img from "../../Assets/Images/Add notes-bro.png"
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useQuery } from "react-query";
import { userContext } from "../../Context/UserContext";

export default function SignUp() {
  let navigate = useNavigate()
  let { signUp } = useContext(userContext);
  const [SignInError, setSignInError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);



  async function usersignUp(values) {
    setIsLoading(true)
    let res = await signUp(values);
    if (res.data) {
      setIsLoading(false);
      navigate('/Signin')

    }
    if (res.response.data.msg) {
      setSignInError(res.response.data.msg);
    }

  }

  let validationSchema = yup.object({
    name: yup.string().required('*Your name is required').min(3, "min charcs are 3 charcs").max(15, "max charcs are 15 charcs"),
    email: yup.string().required('*Your email is required').email("*Email must be valid email"),
    password: yup.string().required('*Your password is required').matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/, "at least one letter and one number"),
    age: yup.number().required('*Your age is required').min(18, "*Your age must bigger than 18").max(60, "*Your age must lower than 60"),
    phone: yup.string().required('*Your phone is required').matches(/^01[0125][0-9]{8}$/, "*Your number must be an Egyptian number")
  })

  let formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      age: "",
      phone: "",
    },
    onSubmit: usersignUp, validationSchema
  });

  return (
    <>
      <div className="container">
        <div className="row">

          <div className="col-md-6 py-5 rounded-3 shadow  mt-5">

            <form onSubmit={formik.handleSubmit} className={` ${Style.padding}`}>
              {SignInError ? <div className="alert alert-danger">{SignInError}</div> : ""}
              <h2>Sign up</h2>


              <div className="d-flex justify-content-center align-items-center mt-3">
                <label htmlFor="name">
                  <i className="fa-solid fa-user"></i>
                </label>
                <input id="name" value={formik.values.name} onChange={formik.handleChange} onBlur={formik.handleBlur} type="text" placeholder="Your Name" name="name" />
              </div>
              {formik.errors.name && formik.touched.name ? <div className="alert alert-danger mt-3 w-100 py-1">{formik.errors.name}</div> : ""}



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

              <div className="d-flex justify-content-center align-items-center mt-4">
                <label htmlFor="phone">
                  <i className="fa-solid fa-phone"></i>
                </label>
                <input id="phone" value={formik.values.phone} onChange={formik.handleChange} onBlur={formik.handleBlur} type="tel" placeholder="Your Phone" name="phone" />
              </div>
              {formik.errors.phone && formik.touched.phone ? <div className="alert alert-danger mt-3 py-1 mt w-100">{formik.errors.phone}</div> : ""}

              <div className="d-flex justify-content-center align-items-center mt-4">
                <label htmlFor="age">
                  <i className="fa-solid fa-phone"></i>
                </label>
                <input id="age" value={formik.values.age} onChange={formik.handleChange} onBlur={formik.handleBlur} type="number" placeholder="Your Age" name="age" />
              </div>
              {formik.errors.age && formik.touched.age ? <div className="alert alert-danger mt-3 py-1 mt w-100">{formik.errors.age}</div> : ""}



              
              {isLoading === false ? <button disabled={!(formik.isValid && formik.dirty)} type="submit" className="btn btn-danger my-3">Register</button> :
                <button type="submit" className="btn btn-danger my-3"><i className="fas fa-spinner fa-spin"></i></button>
              }
              <h5 className="mt-5">Have an Account ?<Link className="text-decoration-none" to={"/SignIn"}>Sign in</Link></h5>
            </form>
          </div>


          <div className="col-md-6">
            <img className="w-100" src={img} alt="" />
          </div>

        </div>
      </div>
    </>


  );




}
