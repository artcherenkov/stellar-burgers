import {
  Input,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import React from "react";
import AppHeader from "../../components/app-header/app-header";
import { Hint, InputContainer, Submit, Title } from "../../components/form";
import Form from "../../components/form/form";

const Login: React.FC = () => {
  const [value, setValue] = React.useState("");

  return (
    <>
      <AppHeader />
      <Form>
        <Title>Вход</Title>
        <InputContainer>
          <Input
            name="email"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            type="text"
            placeholder="E-mail"
            error={false}
            errorText="Ошибка"
          />
        </InputContainer>
        <InputContainer>
          <PasswordInput
            name="password"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
        </InputContainer>
        <Submit>Войти</Submit>
        <Hint linkHref="/register" linkTitle="Зарегистрироваться">
          Вы новый пользователь?
        </Hint>
        <Hint linkHref="/forgot-password" linkTitle="Восстановить пароль">
          Забыли пароль?
        </Hint>
      </Form>
    </>
  );
};

export default Login;
