import React, {useContext} from 'react';
import {Link, useHistory} from "react-router-dom";
import {UserContext} from '../App';

const NavBar = () => {
    const {state, dispatch} = useContext(UserContext);
    const history = useHistory();

    const logout = () => {
        dispatch({type: "USER", payload: null});
        localStorage.clear();
        history.push('/login');

    };
    const renderList = () => {
        if (state) {
            return [
                <li key='1'><Link to="/profile">Profile</Link></li>,
                <li key='2'><Link to="/createpost">Create Post</Link></li>,
                <li key='5'>
                    <button
                        onClick={logout}
                        className="btn waves-effect waves-light #1e88e5 red darken-1">
                        Logout
                    </button>
                </li>

            ]
        } else {
            return [
                <li key='3'><Link to="/login">Login</Link></li>,
                <li key='4'><Link to="/signup">SignUp</Link></li>
            ]
        }
    };
    return (<nav>
        <div className="nav-wrapper white">
            <Link to={state ? "/" : "/login"} className="brand-logo left brand-font">Insatgram</Link>
            <ul id="nav-mobile" className="right hide-on-med-and-down">
                {renderList()}
            </ul>
        </div>
    </nav>);
};

export default NavBar;