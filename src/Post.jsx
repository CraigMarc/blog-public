import { useState, useEffect } from 'react'
import { Link, useParams } from "react-router-dom";
import CommentsJsx from './CommentsJsx'
import Header from './Header'

const Post = (props) => {

  const {

    messages,
    comments,
    setComments,


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
  let image = ''
  if (postData[0].image) {
  image = `https://blogapi1200.fly.dev/uploads/${postData[0].image}`
  }
 console.log(image)
  //filter comments for the proper comments

  const commentData = comments.filter((comment) => comment.posts_id == postId)
  let postJsx = ""
  if (image) {
  postJsx =
    
      <div>
      <h2>{postData[0].title}</h2>
      <img className="imgPost" src={image}></img>
      <div className='postPadding'>
      <p>{postData[0].text}</p>
      </div>
      </div>
  }
  else {
    postJsx =
      <div>
      <h2>{postData[0].title}</h2>
      <div className='postPadding'>
      <p>{postData[0].text}</p>
      </div>
      </div>
  }
  
  //jsx return
  return (
    <div>
      <Header/>
      
      <div>{postJsx}</div>

      <h2>Comments</h2>

      <CommentsJsx
        commentData={commentData}
      />

      <form id="commentForm" onSubmit={handleCommentSubmit}>

        <label>
         <p>Name {' '}</p> 
          <input
            id="name"
            type="text"
            name="name"
            required

          />
        </label>

        <label>
         <p>Comment {' '}</p> 
          <input
            id="comment"
            type="text"
            name="comment"
            required

          />
        </label>

        <div className="submitContainer">
          <input className='commentSubmit'  type="submit" value="Add a Comment" />
        </div>
      </form>

    </div>
  );
};

export default Post;