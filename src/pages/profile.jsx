import { useDispatch, useSelector } from "react-redux";
import {
  addTeachSkill,
  addLearnSkill,
  removeTeachSkill,
  removeLearnSkill,
} from "../features/user/userSlice";
import { useState } from "react";

function Profile() {
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user.currentUser);
  if (!currentUser)
  {
     return <p>Please log in to see your profile</p>;
  }
  const { teachSkills, learnSkills } = useSelector(
    (state) => state.user.currentUser
  );

  const [teachInput, setTeachInput] = useState("");
  const [learnInput, setLearnInput] = useState("");

  const handleAddTeach = () => {
    if (teachInput.trim()) {
      dispatch(addTeachSkill(teachInput));
      setTeachInput("");
    }
  };

  const handleAddLearn = () => {
    if (learnInput.trim()) {
      dispatch(addLearnSkill(learnInput));
      setLearnInput("");
    }
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Your Profile</h1>

      {/* Teach Skills */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-2">
          Skills You Can Teach
        </h2>

        <div className="flex gap-2 mb-3">
          <input
            type="text"
            value={teachInput}
            onChange={(e) => setTeachInput(e.target.value)}
            className="border p-2 rounded w-full"
            placeholder="e.g. React, Photoshop"
          />
          <button
            onClick={handleAddTeach}
            className="bg-blue-500 text-white px-4 rounded"
          >
            Add
          </button>
        </div>

        <div className="flex flex-wrap gap-2">
          {teachSkills.map((skill, index) => (
            <div
              key={index}
              className="bg-blue-100 px-3 py-1 rounded flex items-center gap-2"
            >
              {skill}
              <button
                onClick={() => dispatch(removeTeachSkill(skill))}
                className="text-red-500"
              >
                ✕
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Learn Skills */}
      <div>
        <h2 className="text-xl font-semibold mb-2">
          Skills You Want to Learn
        </h2>

        <div className="flex gap-2 mb-3">
          <input
            type="text"
            value={learnInput}
            onChange={(e) => setLearnInput(e.target.value)}
            className="border p-2 rounded w-full"
            placeholder="e.g. Python, UI Design"
          />
          <button
            onClick={handleAddLearn}
            className="bg-green-500 text-white px-4 rounded"
          >
            Add
          </button>
        </div>

        <div className="flex flex-wrap gap-2">
          {learnSkills.map((skill, index) => (
            <div
              key={index}
              className="bg-green-100 px-3 py-1 rounded flex items-center gap-2"
            >
              {skill}
              <button
                onClick={() => dispatch(removeLearnSkill(skill))}
                className="text-red-500"
              >
                ✕
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Profile;