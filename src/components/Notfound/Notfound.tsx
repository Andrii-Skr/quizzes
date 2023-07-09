import { Link } from "react-router-dom";
import "./Notfound.css";

const Notfound = () => {
  return (
    <div className="notfoundtitle">
      <h1>Page Not Found</h1>
      <Link to="/">Click to get home page</Link>
    </div>
  );
};

export default Notfound;
