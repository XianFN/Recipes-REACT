import React, {useState} from "react";
import {RiCloseCircleLine } from 'react-icons/ri'
import {TiEdit } from 'react-icons/ti'
import AddRecipe from "./AddRecipe";

const Recipe = ({recipes,removeRecipe, updateRecipe}) => {
    const [edit, setEditRecipe] = useState({
        id: null,
        name:'',
        description: [],
        ingredients: []

    });

    const submitUpdate = value => {
        updateRecipe(edit.id, value)
        setEditRecipe({
            id: null,
            name:'',
            description: [],
            ingredients: []

        })
    }
   if (edit.id){
       return <AddRecipe edit={edit} onSubmit={submitUpdate}/>;
   }


    return recipes.map((recipe,index)=> (
        <div key={index} className="recipe-row">
            <div key= {recipe.id}>
                {recipe.name}
            </div>
            <div className='icons'>
                <RiCloseCircleLine
                onClick={()=> removeRecipe(recipe.id)}
                className='delete-icon' />
                <TiEdit
                    onClick={() => setEditRecipe({id: recipe.id, value: recipe})}
                    className='edit-icon' />
            </div>
        </div>

    ));


}
export default Recipe