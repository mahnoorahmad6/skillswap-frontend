import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changePassword } from "../features/user/userSlice";
import { useNavigate } from "react-router-dom";

function ChangePassword() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.currentUser);
  const navigate = useNavigate();

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  if (!user) {
    return <h3>Please login first</h3>;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (user.password !== oldPassword) {
      alert("Old password is incorrect");
      return;
    }
    if (newPassword !== confirmPassword) {
      alert("New passwords do not match");
      return;
    }
    dispatch(
      changePassword({
        email: user.email,
        newPassword: newPassword,
      })
    );

    alert("Password updated");

    // reset fields
    setOldPassword("");
    setNewPassword("");
    setConfirmPassword("");
      navigate("/")
  };

  return (
    <div>
      <h2>Change Password</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="password"
          placeholder="Old Password"
          value={oldPassword}
          onChange={(e) => setOldPassword(e.target.value)}
        />

        <input
          type="password"
          placeholder="New Password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />

        <input
          type="password"
          placeholder="Confirm New Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />

        <button type="submit">Update Password</button>
      
      </form>
    </div>
  );
}

export default ChangePassword;