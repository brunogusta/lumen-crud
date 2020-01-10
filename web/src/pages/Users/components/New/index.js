import React, { useState } from "react";
import { Formik } from "formik";
import * as Yup from "yup";

import {
  Container,
  Form,
  FormContainer,
  SearchTitle,
  ResultsContainer,
  TextError,
  NewUserButton,
  EmailInput,
  NameInput,
  DropDawnInput,
  PassInput,
  GetPerfilsButton,
  UserDataBox,
  PerfilBox,
  RequestTextError
} from "./styles";

export default function NewForm() {
  const [error, setError] = useState({
    emptyInputs: false,
    floatNumber: false,
    noAdm: false,
    errorMessage: ""
  });

  const [inputEvents, setInputEvents] = useState({
    options: [],
    selected: null,
    data: {},
    isLoaded: false
  });

  const setPerfil = value => {
    setInputEvents({
      ...inputEvents,
      selected: value
    });
  };

  const { name, email, password, perfils } = inputEvents.data;

  const resetResult = () => {
    setInputEvents({ ...inputEvents, isLoaded: false });
    setError({
      ...error,
      userNotFound: false,
      errorMessage: "",
      noAdm: false
    });
  };

  const handleSubmitValues = async values => {
    let labels = [];

    const label = inputEvents.selected;

    const formatedPerfil = () => {
      if (label) {
        labels.push(label);

        const options = labels.map(value => ({
          name: value.label
        }));

        return options;
      } else return null;
    };

    const data = {
      name: values.name,
      email: values.email,
      password: values.password,
      perfils: formatedPerfil()
    };

    resetResult();

    await setInputEvents({
      ...inputEvents,
      data
    });
  };
  return (
    <Container duration="1s">
      <Formik
        initialValues={{
          name: "",
          email: "",
          password: ""
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
          password: Yup.string().required("The password is required")
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
            <SearchTitle>
              <h3>New user</h3>
            </SearchTitle>
            <Form>
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
                options={inputEvents.options}
                onChange={setPerfil}
                placeholder="Chose the perfil"
                value={inputEvents.selected}
              />
              <GetPerfilsButton type="submit">LOAD PERFILS</GetPerfilsButton>
              <NewUserButton type="submit" onClick={handleSubmit}>
                <p>CREATE NEW USER</p>
              </NewUserButton>
            </Form>
          </FormContainer>
        )}
      />
      <ResultsContainer>
        <div>
          <h3>Results</h3>
        </div>
        {error.noAdm && (
          <RequestTextError>
            <p>{error.errorMessage}</p>
          </RequestTextError>
        )}
        {inputEvents.isLoaded && (
          <UserDataBox>
            <p>ID: </p>
            <p>Name: </p>
            <p>E-mail: </p>
            <PerfilBox>
              <p>Perfil(s):</p>
              {[].perfils.map(perfil => (
                <div key={Math.random()}>
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
