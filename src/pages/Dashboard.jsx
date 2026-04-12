import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

function Dashboard() {
  const user = useSelector((state) => state.user.currentUser);

  return (
    <div className="dashboard-container">
      <h1 className="dashboard-title">Skill Swap: swap your skills away!</h1>

      {user ? (
        <p className="text-lg font-medium text-gray-600">
          Welcome back, <span className="text-indigo-600 font-bold">{user.name}</span>!
        </p>
      ) : (
        <p className="text-lg font-semibold text-red-500 bg-red-50 px-4 py-1 rounded-full border border-red-100">
          Please login to continue
        </p>
      )}

      <Link to="/profile">
        <button className="w-full h-32 rounded-2xl font-bold text-xl text-white shadow-[0_10px_20px_-5px_rgba(59,130,246,0.4)] bg-gradient-to-br from-blue-500 to-blue-700 hover:scale-[1.03] transition-all duration-300">
          Go to Profile
        </button>
      </Link>

      <Link to="/change-password">
        <button className="w-full py-3 rounded-lg bg-blue-600 text-white font-semibold shadow-md hover:bg-blue-700 hover:shadow-lg transition">
          Change Password
        </button>
      </Link>


      <Link to="/search">
  <button>Search Skills</button></Link>
    </div>
  );
}

export default Dashboard;