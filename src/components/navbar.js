import React from "react";
import '../stylesheets/navbar.module.css'

function NavBar(props) {
    let login;
    let profiel;
    if (props.active === "login") {
        login = "active"
    }else if(props.active === "profiel") {
        profiel = "active"
    }

    return (
        <div id="navbar">
            <ul>
                <li className={login}><a href="/">Login</a></li>
                <li className={profiel}><a href="/profile">Profiel</a></li>
            </ul>
        </div>
    )
}

export default NavBar;