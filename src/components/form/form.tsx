import React from "react";
import styles from "./form.module.css";

interface IForm {
  children: React.ReactNode;
}

const Form = ({ children }: IForm) => {
  return <form className={styles.form}>{children}</form>;
};

export default Form;
