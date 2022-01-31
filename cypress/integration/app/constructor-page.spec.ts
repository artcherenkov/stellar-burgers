import { API_URL } from "../../../src/utils/api";

describe("Constructor page works correctly", () => {
  beforeEach(() => {
    cy.intercept("POST", `${API_URL}/orders`).as("postOrder");
    cy.intercept("POST", `${API_URL}/auth/login`).as("login");
    cy.intercept("GET", `${API_URL}/auth/user`).as("getUserInfo");
    cy.intercept("GET", `${API_URL}/ingredients`).as("getIngredients");
    cy.intercept("POST", `${API_URL}/auth/token`).as("refreshToken");

    cy.visit("http://localhost:3000/login");
    cy.get("[name^=email]").type("test2209@gmail.com");
    cy.get("[name^=password]").type("123456");
    cy.get("button").contains("Войти").click();
    cy.wait("@login");
  });

  it("should open ingredients popup", () => {
    cy.wait("@getIngredients");
    cy.get("[class^=burger-ingredients_burgerIngredient__]").first().click();
    cy.get("#ingredientModal button").click();
  });

  it("constructor should work", () => {
    cy.visit("http://localhost:3000");
    cy.wait("@refreshToken");
    cy.get("[class^=burger-ingredients_burgerIngredient__]")
      .contains("Мясо")
      .first()
      .as("main");

    cy.get("[class^=burger-ingredients_burgerIngredient__]")
      .contains("булка")
      .first()
      .as("bun");

    cy.get("[class^=burger-constructor_root__]").as("constructor");
    cy.get("button").contains("Оформить заказ").as("submit");

    cy.get("@bun").trigger("dragstart");
    cy.get("@constructor").trigger("drop");
    cy.get("@main").trigger("dragstart");
    cy.get("@constructor").trigger("drop");

    cy.get("@submit").click().wait("@postOrder");
    cy.get("[class^=modal_closeButton]").click();
  });
});

export {};
