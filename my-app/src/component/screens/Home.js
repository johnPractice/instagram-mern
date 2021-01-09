import React, {useState, useEffect, useContext} from 'react';
import './style/Home.css';
import constant from "../../const";
import {UserContext} from '../../App';
import M from "materialize-css";

const Home = () => {
        const [data, setData] = useState([]);
        const [comment, setComment] = useState([]);
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

        const makeComment = async (postId) => {
            const postComment = await fetch(constant.localUrl + 'post/comment', {
                body: JSON.stringify({
                    postId,
                    comment: comment
                }),
                method: 'put',
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": ("Bearer " + JSON.parse(localStorage.getItem('jwt')))
                },
            });
            const result = await postComment.json();
            if (result.err || postComment.status.toString() === '400') M.toast({
                html: result.err ? result.err : 'something wrong',
                classes: "#c62828 red darken-3"
            });
            const newData = data.map(item => {
                if (item._id.toString() === result.post._id.toString()) return result.post;
                return item;
            });
            setData(newData);
            setComment('');
        };

        const createCommentElement = (item) => {
            const {comments} = item;
            return comments.length < 3 ? comments.map(c => <div className='comment-item'>
                    <span className='comment-name'>{c.commentBy.name} :</span>
                    {c.text}</div>) :
                [<div className='comment-item'>
                    <span>{comments[0].commentBy.name} :</span>
                    {comments[0].text}</div>,
                    <div className='comment-item'> .
                        <span>{comments[0].commentBy.name} :</span>
                        {comments[1].text} </div>];
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

                                    <div className='comment-wrapper'>
                                        {
                                            item.comments.length === 0 ?
                                                <div className='no-comment'>you can add first
                                                    comment</div> : createCommentElement(item)
                                        }
                                    </div>
                                    <div className='comment-post'>
                                        <button
                                            onClick={() => makeComment(item._id)}
                                            className="btn waves-effect waves-light #1e88e5 blue darken-1 post-comment">
                                            Add
                                        </button>
                                        <input
                                            value={comment}
                                            onChange={(e) => setComment(e.target.value)}
                                            type='text'
                                            placeholder='add a comment'
                                            className='comment-area'/>
                                    </div>

                                </div>
                            </div>
                        )
                    }).reverse()
                    : <div className='center no-post'>Nothing posted</div>
                }
            </div>
        );
    }
;
export default Home;