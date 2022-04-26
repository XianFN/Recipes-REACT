import React, {useEffect, useState} from "react";
import AddRecipe from "./AddRecipe";
import Recipe from "./Recipe";
import axios from "axios";

function RecipeList(){
    const [recipes, setRecipes] = useState([]);

    const updateAllRecipesJson = () => {


    const f = async () => {
        await axios.post("/updateAllRecipes", recipes)
            .then(response => response.status)
            .catch(err => console.warn(err));
    }
        f();

    };

    const getAllRecipesJson = () => {

        const f = async () => {
            await    axios.get("/getAllRecipes").then (response =>{
                setRecipes(response.data);

            });
        }
        f();



    };
    useEffect(() => {
        getAllRecipesJson();
    }, [])

    window.onload = getAllRecipesJson;



    const addRecipe = recipe => {
         if (!recipe.name || /^\s*$/.test(recipe.name)){
             return;
         }
        const newRecipe = [recipe, ...recipes];
        setRecipes(newRecipe);
        updateAllRecipesJson();

    };
    const removeRecipe = id => {

        const deleteArr = [ ...recipes].filter(recipe => recipe.id !== id);

        setRecipes(deleteArr);


        updateAllRecipesJson();
    };
    const updateRecipe = (recipeId, newValue) => {
        if (!newValue.name || /^\s*$/.test(newValue.name)){
            return;
        }
        setRecipes(prev => prev.map(item => (item.id === recipeId ? newValue : item)));


        updateAllRecipesJson();
    };
    return (
        <div>

        <AddRecipe onSubmit={addRecipe}/>
        <Recipe
        recipes={recipes}
        removeRecipe={removeRecipe}
        updateRecipe={updateRecipe}

        />

        </div>

    );


}
export default RecipeList