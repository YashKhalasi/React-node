import {
  Formik,
  Form,
  Field,
  ErrorMessage
} from "formik";
import * as Yup from "yup";
import React, { useEffect, useState } from "react";
import { Container, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { userDataAction } from "../slice/user";
import TextError from "../commonComponent/TextError";

const initialValues = {
  userName: "",
  emailID: "",
  portfolio: "",
  loginId: "",
  password: "",
  confirmPassword: "",
};



const validationSchema = Yup.object({
  userName: Yup.string()
  .trim('The contact name cannot include leading and trailing spaces')
  .strict(true)
  .min(2, 'Too Short!')
  .max(50, 'Too Long!')
  .required("Please enter your Name"),

  emailID: Yup.string().email("Invalid email format").max(255).required("Please enter your Email id"),
  loginId: Yup.number().positive().required("Please enter your Account number").max(11).min(2),
  portfolio: Yup.number().positive().required("Please enter your Portfolio").test(
    'is-decimal',
    'invalid decimal',
    value => (value + "").match(/^[0-9]+(\.[0-9][0-9]?)?$/),
  ),
  password: Yup.string().required("Please enter your Password")
  .matches(
    /^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
    "Password must contain at least 8 characters, one uppercase,one lower, one number and one special case character"
  ),
  confirmPassword: Yup.string().when("password", {
    is: val => (val && val.length > 0 ? true : false),
    then: Yup.string().oneOf(
      [Yup.ref("password")],
      "Both password need to be the same"
    )
  })
});

const Signup = ({ history }) => {
  const dispatch = useDispatch();
  const storeData = useSelector((state) => state.userData.userDataList);
  const [formValues, setFormValues] = useState(null);

  console.log("location", history);
  const [userDetails, setUserData] = useState();
  const [isPassmatch, setPassMatch] = useState(null);
  const [validationmsg, setValidationMessage] = useState(null);

  const addSignupHandler = async (e) => {
    e.preventDefault();

    // if (confirmPassword === password) {
    //   setPassMatch(null);
    //   let data = {
    //     holder_name: userName,
    //     holder_email: emailID,
    //     holder_accno: loginId,
    //     holder_portfolio: portfolio,
    //     holder_Active: true,
    //     holder_Password: confirmPassword,
    //   };
    //   console.log("signup details...", data);

    //   dispatch(
    //     userDataAction.addUser({
    //       userDataList: data,
    //     })
    //   );
    // } else {
    //   setPassMatch("Password does not match , Please try again.");
    // }
  };

  const onSubmit = (values, submitProps) => {
    console.log("Form data", values);
    console.log("submitProps", submitProps);
  
    if (values.confirmPassword === values.password) {
      setPassMatch(null);
      let data = {
        holder_name: values.userName,
        holder_email: values.emailID,
        holder_accno: values.loginId,
        holder_portfolio: values.portfolio,
        holder_Active: true,
        holder_Password: values.confirmPassword,
      };
      console.log("signup details...", data);
  
      dispatch(
        userDataAction.addUser({
          userDataList: data,
        })
      );

      submitProps.setSubmitting(false);
    submitProps.resetForm();
    } else {
      setPassMatch("Password does not match , Please try again.");
    }
  
    // submitProps.setSubmitting(false);
    // submitProps.resetForm();
  };

  useEffect(() => {
    console.log(  "Table toggle store Data: ",storeData);
    if (storeData !== undefined && Object.keys(storeData).length > 0) {
      let isSuccess = storeData.data.success;
      console.log(" location data...", storeData.data);
      if (isSuccess) {
        setUserData(storeData.data);
      } else {
        console.log("error message...", storeData.data);
        setValidationMessage(storeData.data.message);
      }
    }
  }, [storeData]);

  console.log("location ==", userDetails);
  if (userDetails !== undefined && userDetails.success) {
    console.log("in if success", userDetails);
    history.push({ pathname: "/login" });
    setUserData(undefined);
  }

  return (
    <>
    
      <Container className="mt-5 p-2">
      <div className="d-flex flex-row-reverse px-5">
        <Button type="reset" variant="primary" onClick={()=>history.push({ pathname: "/"})}>Go to Login</Button>
        </div>
        <h1>Sigup from Here</h1>
        
        <hr />

        {/* <Form onSubmit={addSignupHandler} > */}
        <Formik
          initialValues={formValues || initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
          enableReinitialize
          // validateOnChange={false}
          // validateOnBlur={false}
          // validateOnMount
        >
          {(formik) => {
            console.log("Formik props", formik);
            return (
              <Form>
                <div className="mb-3 form-control">
                  <label className="p-2" htmlFor="userName">
                    User Name
                  </label>
                  <Field type="text" id="userName" name="userName" />
                  <ErrorMessage name="userName" component={TextError} />
                </div>

                <div className="mb-3 form-control">
                  <label className="p-2" htmlFor="emailID">
                    Email Id
                  </label>
                  <Field type="emailID" id="emailID" name="emailID" />
                  <ErrorMessage name="emailID">
                    {(error) => <p className="text-danger">{error}</p>}
                  </ErrorMessage>
                </div>

                <div className="mb-3 form-control">
                  <label className="p-2" htmlFor="portfolio">
                    Portfolio
                  </label>
                  <Field type="number" id="portfolio" name="portfolio" />
                  <ErrorMessage name="portfolio" component={TextError} />
                </div>

                <div className="mb-3 form-control">
                  <label className="p-2" htmlFor="loginId">
                    Account Number
                  </label>
                  <Field type="number" id="loginId" name="loginId" />
                  <ErrorMessage name="loginId" component={TextError} />
                </div>

                <div className="mb-3 form-control">
                  <label className="p-2" htmlFor="password">
                    Password
                  </label>
                  <Field type="text" id="password" name="password" />
                  <ErrorMessage name="password" component={TextError} />
                </div>

                <div className="mb-3 form-control">
                  <label className="p-2" htmlFor="confirmPassword">
                    Confirm Password
                  </label>
                  <Field
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                  />
                  <ErrorMessage name="confirmPassword" component={TextError} />
                </div>

                <p className="text-danger">{isPassmatch}</p>

                <p className="text-danger">{validationmsg}</p>

                <Button
                  variant="primary"
                  type="submit"
                  disabled={!formik.isValid || formik.isSubmitting}
                >
                  Submit
                </Button>
                    &nbsp;&nbsp;&nbsp;
                <Button type="reset" variant="warning">
                  Reset
                </Button>
              </Form>
            );
          }}
        </Formik>
      </Container>
    </>
  );
};

export default Signup;
