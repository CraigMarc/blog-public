import { useState, useEffect } from 'react'
import { Link } from "react-router-dom";
import Header from './Header'
import './App.css'

function Home(props) {

  const {

    messages,
    setMessages,
    comments,
    setComments


  } = props;


  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);


  const fetchInfo = async () => {
    //setLoading(true)

    try {
      //return fetch(picUrl)
      //const res = await fetch("https://blogapi1200.fly.dev/api/published")
      const [apiPosts, apiComments] = await Promise.all([
        fetch('https://blogapi1200.fly.dev/api/published', {

        }),
        fetch("https://blogapi1200.fly.dev/api/comments")
      ]);

      //const messageData = await res.json();

      const messageData = await apiPosts.json();
      const commentData = await apiComments.json();

      //setData(productData)
      setMessages(messageData)
      setComments(commentData)
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




  return (

    <div>
      <div className="headerContainer">
      <Header />
      </div>
      <div className='postContainer'>

        <div className="postCard">

          {messages.map((index) => {
            let date = new Date(index.timestamp).toLocaleString()
            const postComments = comments.filter((comment) => comment.posts_id == index._id).length
            let image = index.image
            let url = ""
            if (image) {
              url = `https://blogapi1200.fly.dev/uploads/${index.image}`
            }
            if (image) {
              return (

                <div key={index._id} className="post">
                  <Link to={`post/${index._id}`} state={index._id}>
                    <div id={index._id} className="card" >
                      <h2>{index.title}</h2>
                      <img className="imgHome" src={url}></img>
                      <div className="commentContainer">
                        <div>
                          <p>{date}</p>
                        </div>
                        <div>
                          <p>Comments: {postComments}</p>
                        </div>
                      </div>
                    </div>
                  </Link>
                </div>

              )
            }
            else {
              return (

                <div key={index._id} className="post">
                  <Link to={`post/${index._id}`} state={index._id}>
                    <div id={index._id} className="card" >
                      <h2>{index.title}</h2>
                      <div className="commentContainer">
                        <div className='dateContainer'>
                          <p>{date}</p>
                        </div>
                        <div className='commentPadding'>
                          <p>Comments: {postComments}</p>
                        </div>
                      </div>
                    </div>
                  </Link>
                </div>

              )


            }
          })}

        </div>
      </div>
    </div>
  )



}



export default Home