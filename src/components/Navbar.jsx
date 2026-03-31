import { Link, useNavigate } from "react-router-dom"; // ✅ single import
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../features/user/userSlice";

function Navbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.currentUser);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/"); // redirect to home
  };

  return (
    <nav className="navbar">
      {user ? (
        <button onClick={handleLogout} className="btn btn-secondary">
          Logout
        </button>
      ) : (
        <>
          <Link to="/login" className="btn btn-secondary">Login</Link>
          <Link to="/register" className="btn btn-secondary">Register</Link>
        </>
      )}
    </nav>
  );
}

export default Navbar;