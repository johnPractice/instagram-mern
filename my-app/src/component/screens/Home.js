import React, {useState, useEffect, useContext} from 'react';
import './style/Home.css';
import constant from "../../const";
import {UserContext} from '../../App';
import M from "materialize-css";

const Home = () => {
    const [data, setData] = useState([]);
    const {state} = useContext(UserContext);
    useEffect(() => {
        async function fetchData() {
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
        }

        fetchData();
    }, []);
    const like = async (postId) => {
        try {
            const likeData = await fetch(constant.localUrl + 'post/like', {
                method: 'put',
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": ("Bearer " + JSON.parse(localStorage.getItem('jwt')))
                },
                body: JSON.stringify({postId})
            });
            const result = await likeData.json();
            if (likeData.status === 400 || likeData.status === '400') {

                M.toast({html: result.err ? result.err : 'something wrong', classes: "#c62828 red darken-3"});
            } else {
                if (result) {
                    const newData = await data.map(item => {
                        if (item._id.toString() === result.post._id.toString()) return result.post;
                        return item;
                    });
                    setData(newData);
                } else M.toast({html: 'something wrong', classes: "#c62828 red darken-3"});
            }


        } catch (e) {
            console.error(e);
            M.toast({html: 'something wrong', classes: "#c62828 red darken-3"});
        }
    };
    return (
        <div className='home'>
            {data.length > 0 ?
                data.map(item => {

                    return (
                        <div className='card home-card' key={item._id}>
                            <h5>{item.postedBy.name}</h5>
                            <div className='card-image'>
                                <img
                                    alt="home"
                                    src={(item.photo).replace('//', '/')}/>
                            </div>
                            <div className='card-content'>
                                <div className='bottom-pic-wrapper'>
                                    <i
                                        className={"material-icons  like " + `${state && item.likes.includes(state._id) ? 'liked' : ''}`}
                                        onClick={() => like(item._id)}>favorite_border</i>
                                    <span className='count-like'>{item.likes.length}</span>
                                </div>
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