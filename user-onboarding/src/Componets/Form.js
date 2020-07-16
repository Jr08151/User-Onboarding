import React, {useEffect} from 'react';
import { withFormik, Form, Field } from 'formik';
import * as Yup from 'yup';
import styled from 'styled-components';
import axios from 'axios';

const roles = ['Front-End','Back-End','DB Manager','UX Designer'];

const FormDiv = styled.div`
  label {
    margin: 10px 0px;
    &:after {
      content: ': ';
    }
  }
  .check:after {
    content: '';
  }
  input {
    margin: 5px 0px;
  }
`;

const Error = styled.p`
  color: red;
  font-size: 0.6rem;
  margin: 0;
`;

function UserForm(props) {
  useEffect(()=>{
    if (props.isEditing) {
      console.log(props);
      props.setFieldValue('uname',props.uname);
      props.setFieldValue('email',props.email);
      props.setFieldValue('password',props.password);
      props.setFieldValue('tos',props.tos);
      props.setFieldValue('id',props.id);
    }
  },[props.isEditing]);

  return (
    <Form>
      <FormDiv>
        <label htmlFor="uname">Name</label><Field type="text" name="uname" placeholder="Name" /><br />
        {props.touched.uname && props.errors.uname?<Error>{props.errors.uname}</Error>:<></>}
        <label htmlFor="email">Email</label><Field type="email" name="email" placeholder="Email" /><br />
        {props.touched.email && props.errors.email?<Error>{props.errors.email}</Error>:<></>}
        <label htmlFor="password">Password</label><Field type="password" name="password" placeholder="Password" /><br />
        {props.touched.password && props.errors.password?<Error>{props.errors.password}</Error>:<></>}
        <label htmlFor="tos" className="check">Do you agree to the Terms of Service? </label><Field type="checkbox" name="tos" /><br />
        {props.errors.tos?<Error>{props.errors.tos}</Error>:<></>}
        <Field type="hidden" name="id" />
        <button disabled={!props.isValid}>Submit</button>
      </FormDiv>
    </Form>
  );
}

const FormikUserForm = withFormik({
  mapPropsToValues(props) {
    return {
      uname: props.uname || "",
      email: props.email || "",
      role: props.role || "",
      password: props.password || "",
      tos: props.tos || false,
      id: props.id || (props.currentId+1)
    };
  },

  validationSchema: Yup.object().shape({
    uname: Yup.string()
      .required("Please include the user's name"),
    email: Yup.string()
      .email("Must be a valid email address")
      .required("Please enter the user's email"),
    role: Yup.string()
      .oneOf(roles),
    password: Yup.string()
      .min(8, "Password must be at least 8 characters long")
      .required("Password is required"),
    tos: Yup.boolean()
      .required('Must Accept Terms and Conditions')
      .oneOf([true], 'Must Accept Terms and Conditions')
  }),

  handleSubmit(values, formikBag) {
    console.log(values);
    const userToSave = {...values, id: formikBag.props.currentId};
    formikBag.props.addFunction(userToSave);

    formikBag.setStatus("Form Submitting!");
    formikBag.resetForm();



   
  }
})(UserForm);

export default FormikUserForm;