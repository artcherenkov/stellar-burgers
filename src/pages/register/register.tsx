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
import { useAppDispatch } from "../../services/hooks";
import { register } from "../../services/slices/user";
import { useHistory } from "react-router-dom";

const Register: React.FC = () => {
  const dispatch = useAppDispatch();
  const history = useHistory();

  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const handleSubmit = async (evt: React.SyntheticEvent) => {
    evt.preventDefault();
    const data = { name, email, password };

    const resultAction = await dispatch(register(data));
    if (register.fulfilled.match(resultAction)) {
      history.replace("/");
    }
  };

  return (
    <>
      <AppHeader />
      <Form onSubmit={handleSubmit}>
        <Title>Регистрация</Title>
        <InputContainer>
          <Input
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            type="text"
            placeholder="Имя"
            error={false}
            errorText="Ошибка"
          />
        </InputContainer>
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
        <Submit>Зарегистрироваться</Submit>
        <Hint linkHref="/login" linkTitle="Войти">
          Уже зарегистрированы?
        </Hint>
      </Form>
    </>
  );
};

export default Register;
