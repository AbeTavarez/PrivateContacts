import { Link } from "react-router-dom";

const Navbar = ({ title, icon }) => {
  return (
    <div>
      <h1>
        <i className={icon}></i> {title}
      </h1>
      <ul>
          <li>
              <Link to='/'>Home</Link>
          </li>
          <li>
              <Link to='/about'>About</Link>
          </li>
      </ul>
    </div>
  );
};



Navbar.defaultProps = {
  title: "Private Contacts",
  icon: "fas fa-id-card-alt",
};

export default Navbar;
