import React, {useState, useEffect} from 'react';
import './style/Home.css';
import constant from "../../const";
import M from "materialize-css";

const Home = () => {
    const [data, setData] = useState([]);
    useEffect(async () => {
        try {
            const getData = await fetch(constant.localUrl + 'post/all', {
                method: 'get',
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": ("Bearer " + JSON.parse(localStorage.getItem('jwt')))
                },
            });
            const result = await getData.json();
            if (result) {
                setData(result.posts);
            }
        } catch (e) {
            console.error(e);
            M.toast({html: 'something wrong', classes: "#c62828 red darken-3"});
        }


    }, []);
    return (
        <div className='home'>
            {data.length > 0 ?
                data.map(item => {
                    return (
                        <div className='card home-card'>
                            <h5>{item.postedBy.name}</h5>
                            <div className='card-image'>
                                <img
                                    alt="home"
                                    src={(item.photo).replace('//', '/')}/>
                            </div>
                            <div className='card-content'>
                                <i className="material-icons fav-red">favorite</i>
                                <h6>{item.title}</h6>
                                <p>{item.body}</p>
                                <input type='text' placeholder='add a comment'/>
                            </div>
                        </div>
                    )
                }).reverse()
                : <div className='center no-post'>Nothing posted</div>
            }
        </div>
    );
};
export default Home;