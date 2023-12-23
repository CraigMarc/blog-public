import { useState, useEffect } from 'react'
import './App.css'
import Router from './Router'


function App() {

  const [messages, setMessages] = useState([])
  const [comments, setComments] = useState()

   // get comments from api
   const [error, setError] = useState(null);
   const [loading, setLoading] = useState(true);
  
 
   const fetchCommentInfo = async () => {
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
     fetchCommentInfo();
   }, [])
 
   //display error and loading for api call
 
   if (error) return (
     <div>
       
       <p>A network error was encountered</p>
     </div>
   )
 
   if (loading) return <p>Loading...</p>;

//send props to router so routes have them available

return (
  <div>
    
    <Router
    messages={messages}
    setMessages={setMessages}
    comments={comments}
    setComments={setComments}
    />
  </div>
)

}

export default App
