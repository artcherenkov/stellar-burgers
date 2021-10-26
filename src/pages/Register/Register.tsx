import {
  Input,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import React from "react";
import AppHeader from "../../components/app-header/app-header";
import Form, {
  Hint,
  InputContainer,
  Submit,
  Title,
} from "../../components/form";

const Register: React.FC = () => {
  const [value, setValue] = React.useState("");

  return (
    <>
      <AppHeader />
      <Form>
        <Title>Регистрация</Title>
        <InputContainer>
          <Input
            name="name"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            type="text"
            placeholder="Имя"
            error={false}
            errorText="Ошибка"
          />
        </InputContainer>
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
        <Submit>Зарегистрироваться</Submit>
        <Hint linkHref="/login" linkTitle="Войти">
          Уже зарегистрированы?
        </Hint>
      </Form>
    </>
  );
};

export default Register;
