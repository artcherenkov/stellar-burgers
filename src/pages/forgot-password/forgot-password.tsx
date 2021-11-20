import { Input } from "@ya.praktikum/react-developer-burger-ui-components";
import React from "react";
import AppHeader from "../../components/app-header/app-header";
import Form, {
  Hint,
  InputContainer,
  Submit,
  Title,
} from "../../components/form";
import { useAppDispatch } from "../../services/hooks";
import { forgotPassword } from "../../services/slices/user";
import { useHistory } from "react-router-dom";

const ForgotPassword: React.FC = () => {
  const dispatch = useAppDispatch();
  const history = useHistory();

  const [email, setEmail] = React.useState("");

  const handleSubmit = async (evt: React.SyntheticEvent) => {
    evt.preventDefault();

    const resultAction = await dispatch(forgotPassword(email));
    if (forgotPassword.fulfilled.match(resultAction)) {
      history.replace("/reset-password");
    }
  };

  return (
    <>
      <AppHeader />
      <Form onSubmit={handleSubmit}>
        <Title>Восстановление пароля</Title>
        <InputContainer>
          <Input
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="text"
            placeholder="Укажите e-mail"
            error={false}
            errorText="Ошибка"
          />
        </InputContainer>
        <Submit>Восстановить</Submit>
        <Hint linkHref="/login" linkTitle="Войти">
          Вспомнили пароль?
        </Hint>
      </Form>
    </>
  );
};

export default ForgotPassword;
