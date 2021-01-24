import React from "react";

function NavigationHeader(props) {

        return (
            <div className="navigation-header">
                    <button>Home</button>
                    <button>New Question</button>
                    <button>Leader Board</button>
                    {/* TODO Based on login/logout:*/}
                    <div>{props.loggedIn.name}</div>
                    <button>Logout</button>
            </div>
        );
}


export default NavigationHeader;