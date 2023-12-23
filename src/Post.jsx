import { useState, useEffect } from 'react'
import { Link, useParams } from "react-router-dom";
import CommentsJsx from './CommentsJsx'


const Post = (props) => {

  const {

    messages,
    comments,
    setComments,
    messageId,
    setMessageId
    
  } = props;

  const addComment = async (name, text, postId) => {
    await fetch('https://blogapi1200.fly.dev/api/comments', {
       method: 'POST',
       body: JSON.stringify({
          name: name,
          text: text,
          posts_id: postId,
       }),
       headers: {
          'Content-type': 'application/json; charset=UTF-8',
       },
    })
       .then((response) => response.json())
       .then((data) => {
          console.log(data)
          setComments(data)
          //maybe set state for a rerender
       })
       .catch((err) => {
          console.log(err.message);
       });
 };
 

  const handleCommentSubmit = (event) => {
    event.preventDefault();
    const data = Object.fromEntries(new FormData(event.target).entries());
    
    addComment(data.name, data.comment, postId)

    clearAllInputs()
  }



  function clearAllInputs() {
    let nameInput = document.getElementById('name');
    let commentInput = document.getElementById('comment');
    //let textArea = document.querySelector('textarea')
    nameInput.value = '';
    commentInput.value = '';
   // textArea.value = ''
  }

  //filter posts for proper post

  const urlParams = useParams();
  const postId = urlParams.id

  const postData = messages.filter((post) => post._id == postId)

  //filter comments for the proper comments
 
  const commentData = comments.filter((comment) => comment.posts_id == postId)

//jsx return
    return (
      <div>
        <h1>{postData[0].title}</h1>
        <p>{postData[0].text}</p>

        <h2>Comments</h2>

        <CommentsJsx
         commentData={commentData}
        />

        <form id="commentForm" onSubmit={handleCommentSubmit}>
               
                <label>
                    Name {' '}
                    <input
                        id="name"
                        type="text"
                        name="name"
                        required
                      
                    />
                </label>

                <label>
                    Comment {' '}
                    <input
                        id="comment"
                        type="text"
                        name="comment"
                        required
                     
                    />
                </label>

                <div className="submitContainer">
                <input type="submit" value="add a comment" />
                </div>
            </form>
        
      </div>
    );
  };
  
  export default Post;