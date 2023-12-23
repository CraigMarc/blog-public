//import { Link } from "react-router-dom"
import { Link, useParams } from "react-router-dom";

function Header() {
return (
<div>
<header>

<Link className="heading" to="/">
  <h1>Blog</h1>
</Link>
</header>
</div>
)
}


export default Header