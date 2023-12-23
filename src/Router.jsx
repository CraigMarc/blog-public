import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./Home";
import Post from "./Post"
import ErrorPage from "./ErrorPage";


const Router = (props) => {

  const {

    messages,
    setMessages,
    comments,
    setComments,
    messageId,
    setMessageId

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
        path: "/post/:id",
        element:
          <Post
          messages={messages}
          comments={comments}
          setComments={setComments}
          messageId={messageId}
          setMessageId={setMessageId}
          />,
        
        errorElement: <ErrorPage />,
      },
     

  ]);

  return <RouterProvider router={router} />;
};

export default Router;