//@ts-nocheck
import React, { FormEvent, useReducer, useState } from "react";
import useForm from './useForm.tsx'
import './style.css'

type AuthAction = 
| { type: 'logout'}
| { type: 'login', payload : loginForm };



// interface LoginForm {
//     signedin : Boolean,
//     user: string,
//     password: string,
    
// }

// const AuthInitialState : LoginForm = {
//     signedin: false,
//     user: '',
//     password: '',
// }
interface loginForm {
    user: string,
    password: string,
    signedin: Boolean,
    
}

const initalState : loginForm = {
    user : '',
    password : '',
    signedin : false,
}



const authReducer = (state : LoginForm, action : AuthAction) : LoginForm => {
    switch(action.type) {
        case 'logout':
            console.log(state.signedin)
            return {
                ...initalState,
            }

        case 'login':
            const {user, password} = action.payload
            console.log(state.signedin)
            return {
                user, 
                password,
                signedin : true,             
            };

        default:
            return console.error(
                ''
            );
            ;
    }
}
   



function Form() {

    const [error, setError] = useState(false)
    const [state, dispatch] = useReducer(authReducer, initalState);
    const [{user, password}, handleChange] = useForm(initalState);


    const logout = () => {
        setError(false)
        dispatch({type : 'logout'})
    }

    const login = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (user === 'admin' && password === '12345'){
            setError(false)
            dispatch({type: 'login', payload : {user: user, password: password}})
        }
        else{
            setError(true)

        }
        
    }

        return (

            <div className="parent">

                <div className="forms">
                    <form onSubmit={login}>
                        <label className="label" htmlFor=""> User: </label>
                        <br />
                        <input  type="text" name="user" value={user} onChange={handleChange} 
                        />
                        <br />
                        <label className="label" htmlFor=""> Password:  </label>
                        <br />
                        <input type="text" name="password" value={password} onChange={handleChange}/>
                        <br />
                        <input type="submit" value='login' className="input" />
                        <br />
                        
                    </form>
                    <button className="input" onClick={logout}> 
                    Logout
                    </button>
                </div>

                <div className="message">
                    {error && <h4>Error: try agian</h4>}
                    {state.signedin===true && 
                    <div>
                    <h4> Welcome:  {user} 
                    </h4> <img src="https://media.tenor.com/wsChytFfrS4AAAAM/monki-flip-monkey.gif"></img>
                        
                    </div>
                    }

                </div>

            </div>
        );
}

export default Form