import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

function UserProfile() {
  const { email } = useParams();
  const users = useSelector((state) => state.user.users);

  const user = users.find((u) => u.email === email);

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
    </div>
  );
}

export default UserProfile;