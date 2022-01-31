import reducer, {
  initialState,
  initialConstructorState,
  openDetailsPopup,
  setActiveIngredient,
  resetActiveIngredient,
  closeDetailsPopup,
  addIngredient,
  countPrice,
  deleteIngredient,
  setDragging,
  swapIngredients,
  clearConstructor,
  fetchIngredients,
} from "./ingredients";

const MOCK_INGREDIENTS = [
  {
    _id: "60d3b41abdacab0026a733c7",
    name: "Флюоресцентная булка R2-D3",
    type: "bun",
    proteins: 44,
    fat: 26,
    carbohydrates: 85,
    calories: 643,
    price: 988,
    image: "https://code.s3.yandex.net/react/code/bun-01.png",
    image_mobile: "https://code.s3.yandex.net/react/code/bun-01-mobile.png",
    image_large: "https://code.s3.yandex.net/react/code/bun-01-large.png",
    __v: 0,
  },
  {
    _id: "60d3b41abdacab0026a733c8",
    name: "Филе Люминесцентного тетраодонтимформа",
    type: "main",
    proteins: 44,
    fat: 26,
    carbohydrates: 85,
    calories: 643,
    price: 988,
    image: "https://code.s3.yandex.net/react/code/meat-03.png",
    image_mobile: "https://code.s3.yandex.net/react/code/meat-03-mobile.png",
    image_large: "https://code.s3.yandex.net/react/code/meat-03-large.png",
    __v: 0,
  },
  {
    _id: "60d3b41abdacab0026a733c9",
    name: "Мясо бессмертных моллюсков Protostomia",
    type: "main",
    proteins: 433,
    fat: 244,
    carbohydrates: 33,
    calories: 420,
    price: 1337,
    image: "https://code.s3.yandex.net/react/code/meat-02.png",
    image_mobile: "https://code.s3.yandex.net/react/code/meat-02-mobile.png",
    image_large: "https://code.s3.yandex.net/react/code/meat-02-large.png",
    __v: 0,
  },
  {
    _id: "60d3b41abdacab0026a733ca",
    name: "Говяжий метеорит (отбивная)",
    type: "main",
    proteins: 800,
    fat: 800,
    carbohydrates: 300,
    calories: 2674,
    price: 3000,
    image: "https://code.s3.yandex.net/react/code/meat-04.png",
    image_mobile: "https://code.s3.yandex.net/react/code/meat-04-mobile.png",
    image_large: "https://code.s3.yandex.net/react/code/meat-04-large.png",
    __v: 0,
  },
];

describe("ingredients reducer", () => {
  it("should return the initial state", () => {
    expect(reducer(undefined, { type: "test" })).toEqual(initialState);
  });
  it("should handle openDetailsPopup", () => {
    const prevState = initialState;
    expect(reducer(prevState, openDetailsPopup())).toEqual({
      ...prevState,
      isDetailsPopupOpen: true,
    });
  });
  it("should handle closeDetailsPopup", () => {
    const prevState = initialState;
    expect(reducer(prevState, closeDetailsPopup())).toEqual({
      ...prevState,
      isDetailsPopupOpen: false,
    });
  });
  it("should handle setActiveIngredient", () => {
    const prevState = initialState;
    const mockId = "some id";

    expect(reducer(prevState, setActiveIngredient(mockId))).toEqual({
      ...prevState,
      activeIngredientId: mockId,
    });
  });
  it("should handle resetActiveIngredient", () => {
    const prevState = initialState;

    expect(reducer(prevState, resetActiveIngredient())).toEqual({
      ...prevState,
      activeIngredientId: "",
    });
  });
  describe("should handle addIngredient", () => {
    it("should add ingredient", () => {
      const prevState = { ...initialState, ingredients: MOCK_INGREDIENTS };
      const ingId = "60d3b41abdacab0026a733c8";

      const newState = {
        ...prevState,
        constructor: {
          ...prevState.constructor,
          mains: [{ id: ingId, qty: 1 }],
        },
      };
      expect(reducer(prevState, addIngredient(ingId))).toEqual({
        ...newState,
        constructor: { ...newState.constructor, price: countPrice(newState) },
      });
    });
    it("should replace bun", () => {
      const prevState = { ...initialState, ingredients: MOCK_INGREDIENTS };
      const bunId = "60d3b41abdacab0026a733c7";

      const newState = {
        ...prevState,
        constructor: {
          ...prevState.constructor,
          bun: { id: bunId, qty: 2 },
        },
      };
      expect(reducer(prevState, addIngredient(bunId))).toEqual({
        ...newState,
        constructor: { ...newState.constructor, price: countPrice(newState) },
      });
    });
    it("should increase same ingredients count", () => {
      const ingId = "60d3b41abdacab0026a733c8";

      const stateWithIngredients = {
        ...initialState,
        ingredients: MOCK_INGREDIENTS,
      };

      const constructor = {
        ...stateWithIngredients.constructor,
        mains: [{ id: ingId, qty: 1 }],
      };

      const prevState = {
        ...stateWithIngredients,
        constructor: {
          ...constructor,
          price: countPrice({ ...stateWithIngredients, constructor }),
        },
      };

      const newState = {
        ...prevState,
        constructor: {
          ...prevState.constructor,
          mains: [{ id: ingId, qty: 2 }],
          price: prevState.constructor.price * 2,
        },
      };

      expect(reducer(prevState, addIngredient(ingId))).toEqual(newState);
    });
    it("should return initial state if ingredient not found", () => {
      const stateWithIngredients = {
        ...initialState,
        ingredients: MOCK_INGREDIENTS,
      };
      const randomIngId = "some-id";

      expect(reducer(stateWithIngredients, addIngredient(randomIngId))).toEqual(
        stateWithIngredients
      );
    });
  });
  describe("should handle deleteIngredient", () => {
    it("should delete ingredient", () => {
      const ingId = "60d3b41abdacab0026a733c8";

      const prevState = {
        ...initialState,
        ingredients: MOCK_INGREDIENTS,
        constructor: {
          ...initialState.constructor,
          mains: [{ id: ingId, qty: 1 }],
        },
      };

      const newState = {
        ...prevState,
        constructor: {
          ...prevState.constructor,
          mains: [],
        },
      };
      expect(reducer(prevState, deleteIngredient(ingId))).toEqual({
        ...newState,
        constructor: { ...newState.constructor, price: countPrice(newState) },
      });
    });
    it("should not delete bun", () => {
      const bunId = "60d3b41abdacab0026a733c7";

      const prevState = {
        ...initialState,
        ingredients: MOCK_INGREDIENTS,
        constructor: {
          mains: [],
          bun: { id: bunId, qty: 2 },
          price: 988 * 2,
        },
      };

      expect(reducer(prevState, deleteIngredient(bunId))).toEqual(prevState);
    });
    it("should decrease same ingredients count", () => {
      const ingId = "60d3b41abdacab0026a733c8";

      const prevState = {
        ...initialState,
        ingredients: MOCK_INGREDIENTS,
        constructor: {
          bun: null,
          mains: [{ id: ingId, qty: 2 }],
          price: 988 * 2,
        },
      };

      const newState = {
        ...prevState,
        constructor: {
          bun: null,
          mains: [{ id: ingId, qty: 1 }],
          price: 988,
        },
      };

      expect(reducer(prevState, deleteIngredient(ingId))).toEqual(newState);
    });
    it("should return initial state if ingredient not found", () => {
      const randomIngId = "some-id";
      const ingId = "60d3b41abdacab0026a733c8";
      const bunId = "60d3b41abdacab0026a733c7";
      const prevState = {
        ...initialState,
        ingredients: MOCK_INGREDIENTS,
        constructor: {
          mains: [{ id: ingId, qty: 1 }],
          bun: { id: bunId, qty: 2 },
          price: 988 * 3, // 3 ингредиента одной цены
        },
      };

      expect(reducer(prevState, deleteIngredient(randomIngId))).toEqual(
        prevState
      );
    });
  });
  it("should handle setDragging", () => {
    const randomIngId = "some-id";
    expect(reducer(initialState, setDragging(randomIngId))).toEqual({
      ...initialState,
      dragging: randomIngId,
    });
  });
  describe("should handle swapIngredients", () => {
    const hoveredIngId = "60d3b41abdacab0026a733c9"; // 1337
    const draggingIngId = "60d3b41abdacab0026a733ca"; // 3000

    it("should swap up", () => {
      const prevState = {
        ...initialState,
        ingredients: MOCK_INGREDIENTS,
        dragging: draggingIngId,
        constructor: {
          ...initialState.constructor,
          mains: [
            { id: hoveredIngId, qty: 1 },
            { id: draggingIngId, qty: 1 },
          ],
        },
      };
      const newState = {
        ...prevState,
        constructor: {
          ...prevState.constructor,
          mains: [
            { id: draggingIngId, qty: 1 },
            { id: hoveredIngId, qty: 1 },
          ],
        },
      };

      expect(reducer(prevState, swapIngredients(hoveredIngId))).toEqual(
        newState
      );
    });
    it("should swap down", () => {
      const prevState = {
        ...initialState,
        ingredients: MOCK_INGREDIENTS,
        dragging: draggingIngId,
        constructor: {
          ...initialState.constructor,
          mains: [
            { id: draggingIngId, qty: 1 },
            { id: hoveredIngId, qty: 1 },
          ],
        },
      };
      const newState = {
        ...prevState,
        constructor: {
          ...prevState.constructor,
          mains: [
            { id: hoveredIngId, qty: 1 },
            { id: draggingIngId, qty: 1 },
          ],
        },
      };

      expect(reducer(prevState, swapIngredients(hoveredIngId))).toEqual(
        newState
      );
    });
  });
  it("should handle clearConstructor", () => {
    const bunId = "60d3b41abdacab0026a733c7";
    const ingId = "60d3b41abdacab0026a733c9";

    const prevState = {
      ...initialState,
      constructor: {
        bun: { id: bunId, qty: 2 },
        mains: [{ id: ingId, qty: 3 }],
        price: 988 * 2 + 1337 * 3,
      },
    };

    expect(reducer(prevState, clearConstructor())).toEqual({
      ...prevState,
      constructor: initialConstructorState,
    });
  });
  describe("should handle fetchIngredients thunk", () => {
    it("should handle fetchIngredients.pending", () => {
      const action = { type: fetchIngredients.pending.type };
      expect(reducer(initialState, action)).toEqual({
        ...initialState,
        ingredientsLoading: true,
      });
    });
    it("should handle fetchIngredients.fulfilled", () => {
      const action = {
        type: fetchIngredients.fulfilled.type,
        payload: { data: MOCK_INGREDIENTS, success: true },
      };
      expect(reducer(initialState, action)).toEqual({
        ...initialState,
        ingredientsLoading: false,
        ingredients: MOCK_INGREDIENTS,
      });
    });
    it("should handle fetchIngredients.rejected", () => {
      const action = { type: fetchIngredients.rejected.type };
      expect(reducer(initialState, action)).toEqual({
        ...initialState,
        ingredientsError: true,
      });
    });
  });
});
