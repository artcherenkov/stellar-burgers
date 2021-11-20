const API_URL = "https://norma.nomoreparties.space/api";

export const getResponseData = (res: Response) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(new Error(`Ошибка: ${res.status}`));
};

export const getIngredients = () =>
  fetch(`${API_URL}/ingredients`).then(getResponseData);

export const postOrder = (ingredients: { ingredients: string[] }) =>
  fetch(`${API_URL}/orders`, {
    body: JSON.stringify(ingredients),
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  }).then(getResponseData);

export const register = (data: {
  email: string;
  password: string;
  name: string;
}) => {
  return fetch(`${API_URL}/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  }).then(getResponseData);
};

export const login = (data: { email: string; password: string }) => {
  return fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  }).then(getResponseData);
};

export const refreshToken = (refreshToken: string) => {
  return fetch(`${API_URL}/auth/token`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ token: refreshToken }),
  }).then(getResponseData);
};

export const logout = (refreshToken: string) => {
  return fetch(`${API_URL}/auth/logout`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ token: refreshToken }),
  }).then(getResponseData);
};
