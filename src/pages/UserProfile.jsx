import { useParams } from "react-router-dom";
import { useSelector,useDispatch } from "react-redux";
import {sendRequest} from "../features/user/userSlice"
function UserProfile() {
  const { email } = useParams();
  const users = useSelector((state) => state.user.users);
  const currentUser= useSelector((state) => state.user.currentUser);
  const user = users.find((u) => u.email === email);
    const dispatch = useDispatch();

  if (!user) return <p>User not found</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">{user.name}</h1>

      <p className="mt-2">
        <strong>Teaches:</strong>{" "}
        {user.teachSkills.join(", ") || "None"}
      </p>

      <p className="mt-2">
        <strong>Wants to Learn:</strong>{" "}
        {user.learnSkills.join(", ") || "None"}
      </p>
        <button
          onClick={() => dispatch(sendRequest(user.email))}
          disabled={currentUser.connections.includes(user.email)}
        >
          Send Request
        </button>
      
    </div>
  );
}

export default UserProfile;