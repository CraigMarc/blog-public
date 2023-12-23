import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./Home";
import Message from "./Message"
import ErrorPage from "./ErrorPage";


const Router = (props) => {

  const {

    messages,
    setMessages,
    cartItems,
    setCartItems

  } = props;

  const router = createBrowserRouter([
    
    {
      path: "/",
      element: <Home
      messages={messages}
        setMessages={setMessages}
      />,
      errorElement: <ErrorPage />,
    },
    {
        path: "/message",
        element:
          <Message 
          
          />,
        
        errorElement: <ErrorPage />,
      },
     

  ]);

  return <RouterProvider router={router} />;
};

export default Router;