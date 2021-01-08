import './App.css';
import React, {createContext, useContext, useEffect, useReducer} from 'react';
import NavBar from "./component/NavBar";
import Profile from "./component/screens/Profile";
import Home from "./component/screens/Home";
import SignUp from "./component/screens/SignUp";
import Login from "./component/screens/Login";
import CreatePost from "./component/screens/CreatePost";

import {BrowserRouter, Route, Switch, useHistory} from 'react-router-dom';
import {initialState, reducer} from "./reducers/userReduces";

export const UserContext = createContext();
const Routing = () => {
    const history = useHistory();
    const {dispatch} = useContext(UserContext);
    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'));
        if (user) {
            dispatch({type: "USER", payload: user});
            // history.push('/');
        } else history.push('/login');

    }, []);
    return (
        <Switch>
            <Route exact path='/'>
                <Home/>
            </Route>
            <Route path='/profile'>
                <Profile/>
            </Route>
            <Route path='/signup'>
                <SignUp/>
            </Route>
            < Route path='/login'>
                < Login/>
            </Route>
            <Route path='/createpost'>
                <CreatePost/>
            </Route>
        </Switch>
    );
};

function App() {
    const [state, dispatch] = useReducer(reducer, initialState);
    return (
        <UserContext.Provider value={{state, dispatch}}>
            <BrowserRouter>
                <NavBar/>
                <Routing/>
            </BrowserRouter>
        </UserContext.Provider>
    );
}

export default App;