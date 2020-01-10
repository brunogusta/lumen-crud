import React, { useState } from "react";
import { Formik } from "formik";
import * as Yup from "yup";

import {
  Container,
  Form,
  FormContainer,
  ResultsContainer,
  TextError,
  SearchButton,
  EmailInput,
  NameInput,
  DropDawnInput,
  PassInput,
  GetPerfilsButton,
  IdInput,
  EmailFilterInput,
  FilterContainer,
  UserDataBox,
  RequestTextError,
  PerfilBox
} from "./styles";

export default function Update() {
  const [error, setError] = useState({
    emptyInputs: false,
    floatNumber: false,
    errorMessage: ""
  });

  const [inputData, setInputData] = useState({
    options: [],
    selected: null,
    data: {},
    isLoaded: false
  });

  const setPerfil = value => {
    setInputData({
      ...inputData,
      selected: value
    });
  };

  const noFieldProvided = () => {
    setInputData({
      ...inputData,
      emptyInputs: true
    });

    setTimeout(() => reset(), 2000);
  };

  const reset = () => {
    setInputData({
      ...inputData,
      emptyInputs: false
    });
  };

  const resetResult = () => {
    setInputData({ ...inputData, isLoaded: false });
    setError({
      ...error,
      userNotFound: false,
      errorMessage: ""
    });
  };

  const handleSubmitValues = async values => {
    resetResult();
    if (values.id === values.emailFilter) {
      return noFieldProvided();
    }

    const getLabel = () => {
      if (inputData.selected) {
        const { label } = inputData.selected;

        return label;
      } else {
        return null;
      }
    };

    const input = {
      id: parseInt(values.id),
      emailFilter: values.emailFilter,
      name: values.name,
      email: values.email,
      password: values.password,
      perfil: getLabel()
    };

    await setInputData({
      ...inputData,
      isLoaded: false,
      data: input
    });
  };

  return (
    <Container duration="1s">
      <Formik
        initialValues={{
          id: "",
          emailFilter: "",
          name: "",
          email: "",
          password: "",
          confirmPassword: "",
          perfil: ""
        }}
        onSubmit={(values, actions) => {
          handleSubmitValues(values);
          actions.resetForm();
        }}
        validationSchema={Yup.object().shape({
          name: Yup.string().required("The name is required"),
          email: Yup.string()
            .email("E-mail is not valid")
            .required("The e-mail is required"),
          password: Yup.string().required("The password is required"),
          id: Yup.number().typeError("The id must be a number"),
          emailFilter: Yup.string().email("The e-mail is not valid")
        })}
        render={({
          values,
          errors,
          touched,
          handleBlur,
          handleChange,
          handleSubmit
        }) => (
          <FormContainer>
            <FilterContainer>
              <h3>Filter User</h3>
              <IdInput
                name="id"
                placeholder="ID"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.id}
              />
              {errors.id && touched.id && <TextError>{errors.id}</TextError>}
              <EmailFilterInput
                name="emailFilter"
                placeholder="E-mail"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.emailFilter}
              />
              {errors.emailFilter && touched.emailFilter && (
                <TextError>{errors.emailFilter}</TextError>
              )}
            </FilterContainer>
            <Form>
              <h3>Update User</h3>
              <NameInput
                name="name"
                placeholder="Name"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.name}
              />
              {errors.name && touched.name && (
                <TextError>{errors.name}</TextError>
              )}
              <EmailInput
                type="email"
                name="email"
                placeholder="E-mail"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.email}
              />
              {errors.email && touched.email && (
                <TextError>{errors.email}</TextError>
              )}
              <PassInput
                type="password"
                name="password"
                placeholder="Password"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.password}
              />
              {errors.password && touched.password && (
                <TextError>{errors.password}</TextError>
              )}
              <DropDawnInput
                name="perfil"
                options={inputData.options}
                onChange={setPerfil}
                placeholder="Chose the perfil"
                value={inputData.selected}
              />
              {inputData.emptyInputs && (
                <TextError>No filter provided</TextError>
              )}
              <GetPerfilsButton type="submit">LOAD PERFILS</GetPerfilsButton>
              <SearchButton type="submit" onClick={handleSubmit}>
                <p>UPDATE</p>
              </SearchButton>
            </Form>
          </FormContainer>
        )}
      />
      <ResultsContainer>
        <div>
          <h3>Results</h3>
        </div>
        {error.errorMessage && (
          <RequestTextError>
            <p>{error.errorMessage}</p>
          </RequestTextError>
        )}
        {inputData.isLoaded && !error.errorMessage && (
          <UserDataBox>
            <p>ID: </p>
            <p>Name: </p>
            <p>E-mail: </p>
            <PerfilBox>
              <p>Perfil(s):</p>
              {[].map(perfil => (
                <div key={perfil.name}>
                  <p>Name: {perfil.name}</p>
                  <p>Label: {perfil.label}</p>
                </div>
              ))}
            </PerfilBox>
          </UserDataBox>
        )}
      </ResultsContainer>
    </Container>
  );
}
