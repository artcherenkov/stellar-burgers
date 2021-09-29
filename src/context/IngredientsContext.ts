import React from "react";
import { TIngredient } from "../components/app/app.typed";

const IngredientsContext = React.createContext<TIngredient[]>([]);

export default IngredientsContext;
