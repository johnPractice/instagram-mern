import React, {useState} from 'react';
import {Link, useHistory} from "react-router-dom";
import constant from '../../const';
import M from 'materialize-css';

const SignUp = () => {
    const history = useHistory();
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const postData = async () => {
        try {
            // eslint-disable-next-line no-useless-escape
            if (!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)) {
                M.toast({html: 'invalid email', classes: "#c62828 red darken-3"});
            } else {
                const sendData = await fetch(constant.localUrl + 'user/signup', {
                    method: 'post',
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        name,
                        password,
                        email
                    })
                });
                const result = await sendData.json();
                if (result.err || sendData.status === 400) {
                    M.toast({html: result.err, classes: "#c62828 red darken-3"});
                } else {
                    M.toast({html: 'saved successfully', classes: "#1de9b6 teal accent-4"});
                    history.push('login');
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
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    type='text'
                    placeholder='name'/>
                <input
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    type='password'
                    placeholder='password'/>
                <button
                    onClick={postData}
                    className="btn waves-effect waves-light #1e88e5 blue darken-1">SignUp
                </button>
                <h5>
                    <Link to='/login'>Already have an account!!</Link>
                </h5>
            </div>
        </div>
    );
};
export default SignUp;