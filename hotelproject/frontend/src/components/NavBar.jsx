import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

const NavBar = () => {
  return (
    <Navbar expand="lg" className="bg-gray-700">
      <Navbar.Brand href="/" className="text-white m-3">
        Hotel Project
      </Navbar.Brand>
      <Nav className="ml-auto">
      </Nav>
    </Navbar>
  );
};

export default NavBar;
