import { useState, useEffect } from 'react'
import { Link } from "react-router-dom";
/*
const Home = () => {
    return (
      <div>
        <h1>Hello from the main page of the app!</h1>
        <p>Here are some examples of links to other pages</p>
        
      </div>
    );
  };
  
  export default Home;

  */

  function Home(props) {

    const {
  
      messages,
      setMessages,
      
  
    } = props;
  
   
      const [error, setError] = useState(null);
      const [loading, setLoading] = useState(true);
  
  
      const fetchInfo = async (pics) => {
        //setLoading(true)
  
        try {
          //return fetch(picUrl)
          const res = await fetch("https://blogapi1200.fly.dev/api/published")
  
          const messageData = await res.json();
          console.log('hello')
          //setData(productData)
          setMessages(messageData)
  
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
          <Header />
          <p>A network error was encountered</p>
        </div>
      )
  
      if (loading) return <p>Loading...</p>;
  
    
  
  
    return (
      <div>
       
        <div className='shopContainer'>
          <h1>Our Products</h1>
          <div className="productCard">
  
            {messages.map((index) => {
  
              return (
  
                <div key={index.id} className="product">
                  <Link  to="/product" state={index.id}>
                    <div id={index.id} className="card" >
  
                      
                      <p>{index.title}</p>
                      <p>${index.timestamp}</p>
  
                    </div>
                  </Link>
                </div>
  
              )
            })}
  
          </div>
        </div>
      </div>
    )
  
  
  }
  
  export default Home