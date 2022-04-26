import React, {useState} from "react";


function AddRecipe (props){

    var nameEdit='';
    var nameDes='prueba';
    var nameIng='';
    if (props.edit){
         nameEdit = props.edit.value.name;
         var stringDes="";



        var str = props.edit.value.description;
        var res = str.split("\n");

        for (var i = 0; i < res.length; i++) {
            if (res[i]!== ""){
                stringDes = stringDes + res[i]+ ';';
            }


        }

        var stringIngr="";


        for (var j = 0; j < props.edit.value.ingredients.length; j++) {
            stringIngr = stringIngr + props.edit.value.ingredients[j].name + "," + props.edit.value.ingredients[j].quantity + "," + props.edit.value.ingredients[j].units + ',';


        }

         nameDes = stringDes;
         nameIng = stringIngr;
    }


    const [input, setInput] = useState(props.edit ? nameEdit : '');
    const [description , setDescription] = useState(props.edit ? nameDes : '');
    const [ingredients, setIngredients] = useState(props.edit ? nameIng : '');

    const handleChangeName = e => {

        setInput(e.target.value);
    }
    const handleChangeDescription = e => {

        setDescription(e.target.value);
    }

    const handleChangeIngredients = e => {

        setIngredients(e.target.value);
    }


    const handleSubmit = e => {
        e.preventDefault();


        var str = ingredients;
        var res = str.split(",");
        var allingredients = [];
        var newingredent= {};

        for (var i = 0; i < res.length; i++) {

            if (i%3===0){

                newingredent.name = res[i];
            }
            if (i%3===1){

                newingredent.quantity = res[i];
            }
            if (i%3===2){

                newingredent.units = res[i];
                allingredients.push(newingredent);

                newingredent= {};

            }

        }
        var strdes = description;
        var resdes = strdes.split(";");
        var descString='';
        for (var k = 0; k < resdes.length; k++) {

            descString+= "\n"+resdes[k];
        }



        props.onSubmit({
            id: Math.floor(Math.random() * 10000),
            name: input,
            description: descString,
            ingredients: allingredients
        });
        setInput('');
        setDescription('');
        setIngredients('');

    };

        return (
            <form onSubmit={handleSubmit}>
                {props.edit ? (
                    <>
                    <input type="text" placeholder = "Update name" value = {input} className = 'recipe-input edit' onChange={handleChangeName} />
                        <input type="text" placeholder = "Update description(separated by ;)" value = {description} className = 'recipe-input edit'  onChange={handleChangeDescription} />
                        <input type="text" placeholder = "Update ingredients(separated by ,)" value = {ingredients} className = 'recipe-input edit'  onChange={handleChangeIngredients} />
                    <button className = 'recipe-button edit' >Update</button>

                    </>

                ):(
                    <>
                    <input type="text" placeholder = "Recipe Name" value = {input}  onChange={handleChangeName} />
                        <input type="text" placeholder = "Description(separated by ;)" value = {description}  onChange={handleChangeDescription} />
                        <input type="text" placeholder = "Ingredients(separated by ,)" value = {ingredients}  onChange={handleChangeIngredients} />
                    <button  >Add Recipe</button>

                    </>

                    )};
            </form>
        )

}


export default AddRecipe

