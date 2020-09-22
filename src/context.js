import React, { useState, useContext } from "react";

export const UserContext = React.createContext();

// const UserContextProvider = ({ children }) => (
//   <UserContext.Provider value={{ name: "hun" }}>

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
    //   value에 전역적으로 들어갈 state들을 넣어줌으로써 다른 Component에서 사용가능하게 한다.
    <UserContext.Provider value={{ user, fn: { logUserIn } }}>
      {/* 여기서의 children은 다른 Component들을 뜻한다 */}
      {children}
    </UserContext.Provider>
  );
};

export const useFns = () => {
  const { fn } = useContext(UserContext);
  return fn;
};

export const useUser = () => {
  const { user } = useContext(UserContext);
  return user;
};

export default UserContextProvider;
