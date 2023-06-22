import React from "react"
import {Link, useNavigate} from "react-router-dom"
import { useAppState } from "../AppState"

const Nav = (props) => {

    const {state, dispatch} = useAppState();
    const navigate = useNavigate();

    return (
        <header>
            <h1>Paises no detalhe</h1>
            <nav>
                <Link to="/"><div>Home</div></Link>
                { !state.token? 
                    <Link to="/auth/signup"><div>SignUp</div></Link> 
                    : null 
                }
                { !state.token? 
                <Link to="/auth/login"><div>Login</div></Link>
                    : null 
                }
                { state.token? 
                    <div onClick={() => {
                        dispatch({type: "logout"})
                        navigate("/")
                    }}>Logout
                    </div> : null
                }
            </nav>
        </header>
    )
}

export default Nav