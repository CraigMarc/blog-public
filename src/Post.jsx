import { useState, useEffect } from 'react'
import { Link, useParams } from "react-router-dom";
import CommentsJsx from './CommentsJsx'


const Post = (props) => {

  const {

    messages,
    comments,
    setComments
    
  } = props;

  const handleCommentSubmit = (event) => {
    event.preventDefault();
    const data = Object.fromEntries(new FormData(event.target).entries());
    console.log(data)
    /*
    let uuid = self.crypto.randomUUID();
    const idData = { ...data, id: uuid }
    const newSchool = [...schoolData, idData]
    setSchoolData(newSchool);
*/

    clearAllInputs()
  }

  function clearAllInputs() {
    let allInputs = document.querySelectorAll('input');
    //let textArea = document.querySelector('textarea')
    allInputs.forEach(singleInput => singleInput.value = '');
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
                <input type="submit" />
                </div>
            </form>
        
      </div>
    );
  };
  
  export default Post;