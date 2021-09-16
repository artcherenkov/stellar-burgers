import React from "react";

import AppHeader from "./app-header/app-header";
import BurgerIngredients from "./burger-ingredients/burger-ingredients";
import BurgerConstructor from "./burger-constructor/burger-constructor";

const App = () => {
    return (
        <>
            <h1>Hello world</h1>
            <AppHeader/>
            <BurgerIngredients/>
            <BurgerConstructor/>
        </>
    );
};

export default App;
