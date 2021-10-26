import {Input} from "@ya.praktikum/react-developer-burger-ui-components";
import {useState} from "react";
import {InputContainer} from "../form";

import styles from "./edit-profile.module.css";

const EditProfile = () => {
  const [value, setValue] = useState("");
  return (
    <form className={styles.form} action="">
      <InputContainer>
        <Input
          name="name"
          type="text"
          value={value}
          onChange={(evt) => setValue(evt.target.value)}
          icon="EditIcon"
          placeholder="Имя"
        />
      </InputContainer>

      <InputContainer>
        <Input
          name="login"
          type="text"
          value={value}
          onChange={(evt) => setValue(evt.target.value)}
          icon="EditIcon"
          placeholder="Логин"
        />
      </InputContainer>

      <InputContainer>
        <Input
          name="password"
          type="password"
          value={value}
          onChange={(evt) => setValue(evt.target.value)}
          icon="EditIcon"
          placeholder="Пароль"
        />
      </InputContainer>
    </form>
  );
};

export default EditProfile;
