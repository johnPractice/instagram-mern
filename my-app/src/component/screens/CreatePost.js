import React, {useState} from 'react';
import './style/CreatePost.css';
import {localUrl} from '../../const';
import M from "materialize-css";
import {useHistory} from "react-router-dom";

const CreatePost = () => {
    const history = useHistory();
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const [image, setImage] = useState('');
    const newPost = async () => {
        const formData = new FormData();
        formData.append('post', image); // appending file
        formData.append('title', title);
        formData.append('body', body);
        const sendPost = await fetch(localUrl + 'post/', {
            method: 'POST',
            redirect: 'follow',
            headers: {
                "Authorization": ("Bearer " + JSON.parse(localStorage.getItem('jwt')))
            },
            body: formData
        });
        console.log("Bearer " + JSON.parse(localStorage.getItem('jwt')))
        const res = await sendPost.json();
        if (res.login === false) {
            history.push('/login');
            M.toast({html: 'you must be login first', classes: "#c62828 red darken-3"});
        } else {
            console.log(res)
            if (!res.post.photo) M.toast({html: 'not post image', classes: "#c62828 red darken-3"});
            else {
                M.toast({html: 'post successfully upload', classes: "#1de9b6 teal accent-4"});
                history.push('/')
            }
        }
    };
    return (
        <div className='card input-filed'>
            <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                type='text'
                placeholder='title'/>
            <input
                value={body}
                onChange={(e) => setBody(e.target.value)}
                type='text'
                placeholder='body'/>
            <div className="file-field input-field">
                <div className="btn #1e88e5 blue darken-1">
                    <span>Upload Image</span>
                    <input
                        onChange={(e) => setImage(e.target.files[0])}
                        type="file"/>
                </div>
                <div className="file-path-wrapper">
                    <input className="file-path validate" type="text"/>
                </div>
            </div>
            <button
                onClick={newPost}
                className="btn waves-effect waves-light #1e88e5 blue darken-1">Post
            </button>

        </div>
    );
};
export default CreatePost;