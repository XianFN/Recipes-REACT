import './App.css';
import {
    BrowserRouter as Router,
    Switch,
    Route

} from "react-router-dom";

//components
import RecipeList from "./components/RecipeList";
import ShoppingList from "./components/ShoppingList";
import Nav from "./Nav";
import React from "react";


function App() {
  return (
      <Router>


    <div className="App">
        <Nav/>
        <Switch>

            <Route  path="/ShoppingList" component={ShoppingList}></Route>

            <Route  path="/" component={Home}></Route>


        </Switch>


    </div>
      </Router>
  );
}
const Home=() =>(
    <div>

        <header>
            <h1>Recipe manager</h1>
            <br/>
        </header>
    <RecipeList />
    </div>
);

export default App;


