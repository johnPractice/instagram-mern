import React, {useContext, useEffect, useState} from 'react';
import './style/Profile.css';
import constant from "../../const";
import M from "materialize-css";
import {UserContext} from "../../App";

const Profile = () => {
    const [data, setData] = useState([]);
    const {state, dispatch} = useContext(UserContext);
    useEffect(async () => {
        try {
            const getData = await fetch(constant.localUrl + 'post/', {
                method: 'get',
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": ("Bearer " + JSON.parse(localStorage.getItem('jwt')))
                },
            });
            const result = await getData.json();
            if (result && result.posts) {
                console.log(result)
                setData(result.posts);
            }
        } catch (e) {
            console.error(e);
            M.toast({html: 'something wrong', classes: "#c62828 red darken-3"});
        }
    }, []);
    return (
        <div className='container-user-page'>
            <div className='df user-top-info'>
                <div className='w40'>
                    <img className='image-avatar'
                         alt='user'
                         src='data:image/png;base64,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'
                    />
                </div>
                <div className='w40'>
                    <h4 style={{color: "grey"}}>{(state && state.name) ? state.name : "loading"}</h4>
                    <div className='df follow-info w70'>
                        <h5>85 posts</h5>
                        <h5>0 followers</h5>
                        <h5>100K following</h5>
                    </div>
                </div>
            </div>

            {/*    gallery here*/}
            <div className='user-gallery'>

                {
                    data.map(item => {
                        return (
                            <img className='gallery-item'
                                 src={item.photo}
                                 alt='gallery'/>
                        )
                    }).reverse()

                }


            </div>

        </div>
    );
};
export default Profile;