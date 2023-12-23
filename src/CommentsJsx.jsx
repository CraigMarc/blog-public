//function to list comments
const CommentsJsx = (props) => {

    const {

        commentData
    
      } = props;
    
    if (commentData.length == 0) {
      return (
        <div>there are no comments</div>
      )
    }

    return (
      <div>
        {commentData.map((index) => {
            let date = new Date(index.timestamp).toLocaleString()
            
            
            return (

              <div key={index._id} className="product">
                
                  <div id={index._id} className="card" >


                    <h3>{index.name}</h3>
                    <p>{index.text}</p>
                    <p>{date}</p>
                  </div>
                
              </div>

            )
          })}
      </div>
    );
  };

  export default CommentsJsx;
  