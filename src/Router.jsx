import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./Home";
import Message from "./Message"
import ErrorPage from "./ErrorPage";


const Router = (props) => {

  const {

    apiItems,
    setApiItems,
    cartItems,
    setCartItems

  } = props;

  const router = createBrowserRouter([
    
    {
      path: "/",
      element: <Home />,
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