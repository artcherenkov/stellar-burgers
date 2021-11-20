import { Input } from "@ya.praktikum/react-developer-burger-ui-components";
import React from "react";
import AppHeader from "../../components/app-header/app-header";
import Form, {
  Hint,
  InputContainer,
  Submit,
  Title,
} from "../../components/form";

const ForgotPassword: React.FC = () => {
  const [value, setValue] = React.useState("");

  return (
    <>
      <AppHeader />
      <Form>
        <Title>Восстановление пароля</Title>
        <InputContainer>
          <Input
            name="email"
            value={value}
            onChange={(e) => setValue(e.target.value)}
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
