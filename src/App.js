import React from "react";
import UserContextProvider from "./context";
import Screen from "./Screen";

function App() {
  return (
    <UserContextProvider value={{ name: "hun" }}>
      {/*다른 사용될 모든 컴포넌트*/}
      <Screen />
    </UserContextProvider>
  );
}

export default App;
