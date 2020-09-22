import React, { useState } from "react";

export const UserContext = React.createContext();

// const UserContextProvider = ({ children }) => (
//   <UserContext.Provider value={{ name: "hun" }}>
//     {/* 여기서의 children은 다른 Component들을 뜻한다 */}
//     {children}
//   </UserContext.Provider>
// );

const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState({
    name: "hun",
    loggedIn: false,
  });
  const logUserIn = () => setUser({ ...user, loggedIn: true });
  return (
    <UserContext.Provider value={{ user, logUserIn }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
