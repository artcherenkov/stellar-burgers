import React from "react";
import { TIngredient } from "../components/burger-ingredients/burger-ingredients";

const IngredientsContext = React.createContext<TIngredient[]>([]);

export default IngredientsContext;
