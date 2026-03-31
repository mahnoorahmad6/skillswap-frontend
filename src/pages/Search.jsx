import { useSelector } from "react-redux";
import { useState } from "react";

function Search() {
  const users = useSelector((state) => state.user.users);
  const [query, setQuery] = useState("");

  // filter users based on skill
  const filteredUsers = users.filter((user) => {
    const search = query.toLowerCase();

    return (
      user.teachSkills.some((skill) =>
        skill.toLowerCase().includes(search)
      ) ||
      user.learnSkills.some((skill) =>
        skill.toLowerCase().includes(search)
      )
    );
  });

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Search Skills</h1>

      <input
        type="text"
        placeholder="Search e.g. React"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="border p-2 w-full mb-4"
      />

      {filteredUsers.map((user, index) => (
        <div key={index} className="border p-3 mb-3 rounded">
          <h2 className="font-bold">{user.name}</h2>

          <p>
            <strong>Teaches:</strong>{" "}
            {user.teachSkills.join(", ") || "None"}
          </p>

          <p>
            <strong>Wants to learn:</strong>{" "}
            {user.learnSkills.join(", ") || "None"}
          </p>
        </div>
        
      ))}
    </div>
  );
}

export default Search;