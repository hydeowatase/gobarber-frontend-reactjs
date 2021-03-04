import React, { useCallback, useRef, useContext } from "react";
import { FiLogIn, FiMail, FiLock } from "react-icons/fi";
import { FormHandles } from "@unform/core";
import { Form } from "@unform/web";
import * as Yup from "yup";

import {AuthContext} from "../../context/AuthContext";
import getValidationErros from "../../utils/getValidationErros";

import logoImg from "../../assets/logo.svg";

import Input from "../../components/Input/index";
import Button from "../../components/Button/index";

import { Container, Content, Backgound } from "./styles";

const SignIn: React.FC = () => {
  const formRef = useRef<FormHandles>(null);

  const {signIn} = useContext(AuthContext);

  const handleSubmit = useCallback(
    async (data: object) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          email: Yup.string()
            .required("E-mail é obrigatório.")
            .email("Digite um e-mail válido."),
          password: Yup.string().required("Senha obrigatória."),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        signIn();
      } catch (err) {
        const errors = getValidationErros(err);

        formRef.current?.setErrors(errors);
      }
    },
    [signIn]
  );

  return (
    <Container>
      <Content>
        <img src={logoImg} alt="GoBarber-logo" />
        <Form ref={formRef} onSubmit={handleSubmit}>
          <h1>Faça seu logon</h1>
          <Input name="email" icon={FiMail} placeholder="E-mail" />
          <Input
            name="password"
            icon={FiLock}
            type="password"
            placeholder="Senha"
          />
          <Button type="submit">Entrar</Button>
          <a href="#">Esqueci minha senha</a>
        </Form>
        <a href="#">
          <FiLogIn /> Criar conta
        </a>
      </Content>
      <Backgound />
    </Container>
  );
};

export default SignIn;
