import React from "react";
import './App.css';
import {Link} from "react-router-dom";

function Nav() {
    return (
        <nav>
            <Link  to={"/"}>
                <div>
                    <h1>Recipes app</h1>
                </div>

            </Link>
            <Link  to={"/ShoppingList"}>
                <div>
                    <p>    Shopping List</p>
                </div>

            </Link>


        </nav>
    );

}
export default Nav;