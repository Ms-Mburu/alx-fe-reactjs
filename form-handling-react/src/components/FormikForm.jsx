import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const validationSchema = Yup.object({
  username: Yup.string().required("Username required"),
  email: Yup.string().email("Invalid email").required("Email required"),
  password: Yup.string().required("Password required")
});

const FormikForm = () => {
  return (
    <Formik
      initialValues={{ username: "", email: "", password: "" }}
      validationSchema={validationSchema}
      onSubmit={(values, { resetForm }) => {
        console.log("Formik form submitted:", values);
        resetForm();
      }}
    >
      <Form>
        <div>
          <label>Username:</label>
          <Field name="username" />
          <ErrorMessage name="username" component="p" />
        </div>

        <div>
          <label>Email:</label>
          <Field name="email" type="email" />
          <ErrorMessage name="email" component="p" />
        </div>

        <div>
          <label>Password:</label>
          <Field name="password" type="password" />
          <ErrorMessage name="password" component="p" />
        </div>

        <button type="submit">Register</button>
      </Form>
    </Formik>
  );
};

export default FormikForm;