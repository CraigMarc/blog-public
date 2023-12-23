import { useState, useEffect } from 'react'
import { Link, useParams } from "react-router-dom";
import CommentsJsx from './CommentsJsx'


const Post = (props) => {

  const {

    messages,
    comments,
    setComments
    
  } = props;

 // get comments from api

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchInfo = async () => {
    //setLoading(true)

    try {
      
      const res = await fetch("https://blogapi1200.fly.dev/api/comments")

      const commentsData = await res.json();
     
      //setData(productData)
      setComments(commentsData)

    }

    catch (error) {
      console.error("There has been a problem with your fetch operation:", error);
      //add error message to dom
      setError("true")

    }
    setLoading(false)

  }


  useEffect(() => {
    fetchInfo();
  }, [])

  //display error and loading for api call

  if (error) return (
    <div>
      
      <p>A network error was encountered</p>
    </div>
  )

  if (loading) return <p>Loading...</p>;

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
        
      </div>
    );
  };
  
  export default Post;