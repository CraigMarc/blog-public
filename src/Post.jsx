import { useState, useEffect } from 'react'
import { Link, useParams } from "react-router-dom";



const Post = (props) => {

  const {

    messages
    
  } = props;

  const urlParams = useParams();
  const postId = urlParams.id

  const postData = messages.filter((post) => post._id == postId)


    return (
      <div>
        <h1>{postData[0].title}</h1>
        <p>{postData[0].text}</p>
        
      </div>
    );
  };
  
  export default Post;