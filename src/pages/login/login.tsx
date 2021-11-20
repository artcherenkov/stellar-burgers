import {
  Input,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import React from "react";
import AppHeader from "../../components/app-header/app-header";
import { Hint, InputContainer, Submit, Title } from "../../components/form";
import Form from "../../components/form/form";
import { useAppDispatch } from "../../services/hooks";
import { useHistory } from "react-router-dom";
import { login } from "../../services/slices/user";

const Login: React.FC = () => {
  const dispatch = useAppDispatch();
  const history = useHistory();

  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const handleSubmit = async (evt: React.SyntheticEvent) => {
    evt.preventDefault();
    const data = { email, password };

    const resultAction = await dispatch(login(data));
    if (login.fulfilled.match(resultAction)) {
      history.replace("/");
    }
  };

  return (
    <>
      <AppHeader />
      <Form onSubmit={handleSubmit}>
        <Title>Вход</Title>
        <InputContainer>
          <Input
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="text"
            placeholder="E-mail"
            error={false}
            errorText="Ошибка"
          />
        </InputContainer>
        <InputContainer>
          <PasswordInput
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
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
