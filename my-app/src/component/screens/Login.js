import React, {useState, useContext} from 'react';
import {Link, useHistory} from "react-router-dom";
import M from "materialize-css";
import constant from "../../const";
import {UserContext} from '../../App';

const Login = () => {
    const {dispatch} = useContext(UserContext);

    const history = useHistory();
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const postData = async () => {
        try {

            // eslint-disable-next-line no-useless-escape
            if (!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)) {
                M.toast({html: 'invalid email', classes: "#c62828 red darken-3"});
            } else {
                const sendData = await fetch(constant.localUrl + 'user/login', {
                    method: 'post',
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        password,
                        email
                    })
                });
                const result = await sendData.json();
                if (result.err || sendData.status === 400) {
                    M.toast({html: result.err, classes: "#c62828 red darken-3"});
                } else {
                    localStorage.setItem('jwt', JSON.stringify(result.token));
                    localStorage.setItem('user', JSON.stringify(result.user));
                    dispatch({type: 'USER', payload: result.user});
                    M.toast({html: 'login successfully', classes: "#1de9b6 teal accent-4"});
                    history.push('/');
                }
            }
        } catch (e) {
            // console.error(e);
            M.toast({html: 'some thing wrong', classes: "#c62828 red darken-3"})

        }

    };

    return (
        <div className='my-card'>
            <div className="card auth-card">
                <h2 className='brand-font'>Instagram</h2>
                <input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    type='text'
                    placeholder='email'/>
                <input
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    type='password'
                    placeholder='password'/>
                <button
                    onClick={postData}
                    className="btn waves-effect waves-light #1e88e5 blue darken-1">
                    Login
                </button>
                <h5>
                    <Link to='/signup'>dont have account!!</Link>
                </h5>
            </div>
        </div>
    );
};
export default Login;