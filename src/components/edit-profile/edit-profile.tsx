import {
  Input,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useState } from "react";
import { InputContainer } from "../form";

import styles from "./edit-profile.module.css";
import { useAppSelector, useAppDispatch } from "../../services/hooks";
import { selectUser, patchUser } from "../../services/slices/user";

const EditProfile = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);

  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);

  const handleSubmit = () => {
    dispatch(patchUser({ name, email }));
  };

  const handleReset = () => {
    setName(user.name);
    setEmail(user.email);
  };

  return (
    <div className={styles.form}>
      <InputContainer>
        <Input
          name="name"
          type="text"
          value={name}
          onChange={(evt) => setName(evt.target.value)}
          icon="EditIcon"
          placeholder="Имя"
        />
      </InputContainer>

      <InputContainer>
        <Input
          name="login"
          type="text"
          value={email}
          onChange={(evt) => setEmail(evt.target.value)}
          icon="EditIcon"
          placeholder="Логин"
        />
      </InputContainer>

      <InputContainer>
        <Input
          name="password"
          type="password"
          value="password"
          onChange={() => {}}
          icon="EditIcon"
          placeholder="Пароль"
          disabled
        />
      </InputContainer>

      <div className={styles.buttons}>
        <Button type="secondary" size="medium" onClick={handleReset}>
          Отмена
        </Button>
        <Button onClick={handleSubmit}>Сохранить</Button>
      </div>
    </div>
  );
};

export default EditProfile;
