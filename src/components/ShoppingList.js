import React, {useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import axios from "axios";


const useStyles = makeStyles((theme) => ({
    root: {
        margin: 'auto',
    },
    paper: {
        width: 200,
        height: 230,
        overflow: 'auto',
    },
    button: {
        margin: theme.spacing(0.5, 0),
    },
}));

function not(a, b) {
    return a.filter((value) => b.indexOf(value) === -1);
}

function intersection(a, b) {
    return a.filter((value) => b.indexOf(value) !== -1);
}

export default function ShoppingList() {
    const classes = useStyles();
    const [checked, setChecked] = React.useState([]);
    const [left, setLeft] = React.useState([]);
    const [right, setRight] = React.useState([]);

    const getAllRecipesJson = () => {

        axios.get("/getAllRecipes").then (response =>{


            setLeft(response.data);

        });



    };

    useEffect(() => {
        getAllRecipesJson();
    }, [])
    window.onload = getAllRecipesJson;

    const leftChecked = intersection(checked, left);
    const rightChecked = intersection(checked, right);

    const handleToggle = (value) => () => {
        const currentIndex = checked.indexOf(value);
        const newChecked = [...checked];

        if (currentIndex === -1) {
            newChecked.push(value);
        } else {
            newChecked.splice(currentIndex, 1);
        }

        setChecked(newChecked);
    };

    const handleAllRight = () => {
        setRight(right.concat(left));
        //setLeft([]);
    };

    const handleCheckedRight = () => {
        setRight(right.concat(leftChecked));
       // setLeft(not(left, leftChecked));
        setChecked(not(checked, leftChecked));
    };

    const handleCheckedLeft = () => {
      //  setLeft(left.concat(rightChecked));
        setRight(not(right, rightChecked));
        setChecked(not(checked, rightChecked));
    };

    const handleAllLeft = () => {
       // setLeft(left.concat(right));
        setRight([]);
    };
    const handleClick = () => {


        var allingr=[];



        for( var i = 0; i < right.length; i++) {

            for( var j = 0; j < right[i].ingredients.length; j++){

                if (allingr.length===0) {


                    allingr.push(right[i].ingredients[j]);
                }else{

                    var existIndex = -1;
                    for( var k = 0; k < allingr.length; k++){
                        if (right[i].ingredients[j].name===allingr[k].name && right[i].ingredients[j].units===allingr[k].units) {
                            existIndex = k;
                        }
                    }
                    if (existIndex!==-1) {

                        var newValue= parseFloat(allingr[existIndex].quantity) + parseFloat(right[i].ingredients[j].quantity);
                        var aux={};
                        aux.name=allingr[existIndex].name;
                        aux.units=allingr[existIndex].units;
                        aux.quantity=newValue.toFixed(2);


                        allingr.splice(existIndex, 1);
                        allingr.push(aux);


                    }else{
                        allingr.push(right[i].ingredients[j]);
                    }
                }
            }
        }
        var auxString="";
        for(var l = 0; l < allingr.length; l++){

             auxString += allingr[l].name+ ": "+ allingr[l].quantity +" "+ allingr[l].units+ "\n";

        }

        alert(auxString);




    };


    const customList = (items) => (
        <Paper className={classes.paper}>
            <List dense component="div" role="list">
                {items.map((recipe) => {
                    const labelId = `transfer-list-item-${recipe.id}-label`;

                    return (
                        <ListItem key={recipe.id} role="listitem" button onClick={handleToggle(recipe)}>
                            <ListItemIcon>
                                <Checkbox
                                    checked={checked.indexOf(recipe.id) !== -1}
                                    tabIndex={-1}
                                    disableRipple
                                    inputProps={{ 'aria-labelledby': labelId }}
                                />
                            </ListItemIcon>
                            <ListItemText id={labelId} primary={` ${recipe.name}`} />
                        </ListItem>
                    );
                })}
                <ListItem />
            </List>
        </Paper>
    );

    return (

            <div className="App">
                <header>
                    <h1>Shopping List</h1>
                    <br/>
                </header>

        <Grid container spacing={2} justify="center" alignItems="center" className={classes.root}>
            <Grid item>{customList(left)}</Grid>
            <Grid item>
                <Grid container direction="column" alignItems="center">
                    <Button
                        variant="outlined"
                        size="small"
                        className={classes.button}
                        onClick={handleAllRight}
                        disabled={left.length === 0}
                        aria-label="move all right"
                    >
                        ≫
                    </Button>
                    <Button
                        variant="outlined"
                        size="small"
                        className={classes.button}
                        onClick={handleCheckedRight}
                        disabled={leftChecked.length === 0}
                        aria-label="move selected right"
                    >
                        &gt;
                    </Button>
                    <Button
                        variant="outlined"
                        size="small"
                        className={classes.button}
                        onClick={handleCheckedLeft}
                        disabled={rightChecked.length === 0}
                        aria-label="move selected left"
                    >
                        &lt;
                    </Button>
                    <Button
                        variant="outlined"
                        size="small"
                        className={classes.button}
                        onClick={handleAllLeft}
                        disabled={right.length === 0}
                        aria-label="move all left"
                    >
                        ≪
                    </Button>
                </Grid>
            </Grid>
            <Grid item>{customList(right)}</Grid>
        </Grid>
            <div >
                <br/>
                <br/>
                <button className="buttonShop" onClick={handleClick}  >Get shopping List</button>
            </div>
        </div>

    );
}
