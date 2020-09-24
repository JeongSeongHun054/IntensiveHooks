# Context && Reducer

## 2020.09.22

### Redux를 쓰는 이유?

- 방대한 양의 State를 관리하기 위해
- 너무 깊이 Props를 내려보내야할 경우

- Context & Redux
  - Context => 간단한 React application에 적용할 수 있지만 파워풀한 방식
  - Redux => 커다란 States와 많은 변화들이 있을 때 적합

## Context 기본 사용법

`context.js`

```javascript
import React from "react";

export const UserContext = React.createContext();

// Context를 통해 전역 State를 사용하기 위해서는 App안에 컴포넌트들을 UserContextProvider 감싸주어야한다.
// 여기서의 children은 App에서 UserContextProvider 컴포넌트 안에서 사용될 모든 컴포넌트들을 의미한다.

const UserContextProvider = ({ children }) => (
  <UserContext.Provider value={{ name: "hun" }}>
    {children}
  </UserContext.Provider>
);

export default UserContextProvider;
```

`App.js`

```javascript
import React from "react";
import UserContextProvider from "./context";
import Header from "./Header";

function App() {
  return (
    <UserContextProvider value={{ name: "hun" }}>
      {/*다른 사용될 모든 컴포넌트*/}
      <Header />
    </UserContextProvider>
  );
}

export default App;
```

`Header.js`

```javascript
import React, { useContext } from "react";
// const context = useContext(UserContext)
const {name} = useContext(UserContext);
const Header = () => {
  return (
    <header>
      <a href="#">Home</a> Hello, {name}
  </header>;
  )
};

export default Header;
```

## Context 또 다른 사용법

`context.js`

```javascript
import React, { useState } from "react";

export const UserContext = React.createContext();

const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState({
    name: "Hun",
    loggedIn: false,
  });

  const logUserIn = () => setUser({ ...user, loggedIn: true });

  return (
    <UserContext.Provider value={{ user, logUserIn }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContextprovider;
```

`Header.js`

```javascript
import React, { useContext } from "react";
import { UserContext } from "./context";

const Header = () => {
  const { name, LoggedIn } = useContext(UserContext);
  return (
    <header>
      <a href="#">Home</a> Hello, {name}, you are
      {LoggedIn ? "Log In" : "Log Out"}
    </header>
  );
};

export default Header;
```

`Screen.js`

```javascript
import React, { useContext } from "react";
import { UserContext } from "./context";
import Header from "./Header";

const Screen = () => {
  const { logUserIn } = useContext(UserContext);
  return (
    <div>
      <Header />
      <h1>First Screen</h1>
      <button onClick={logUserIn}>Log user in</button>
    </div>
  );
};

export default Screen;
```

`App.js`

```javascript
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
```

## useReducer

- Reducer 원리

```javascript
import React, { useReducer } from "react";

// action은 단지 reducer정보를 주기 위한 argument, 변수명은 아무 상관이 없음.

const INCREMENT = "increment";
const DECREMENT = "decrement";

const reducer = (state, action) => {
  switch (type.action) {
    case INCREMENT:
      return { count: state.count + 1 };
    case DECREMENT:
      return { count: state.count - 1 };
    default:
      return;
  }
};

function App() {
  // useReducer는 두 개의 argument를 가진다. 첫번째 arugement는 함수 두 번째 argument는 초기값을 의미한다.
  // dispatch는 reducer에 action을 보내는 역할 그리고 reducer를 실행한다.
  // dispatch를 통해서 실행된 reducer에서 return 된 값이 state로 대체가 된다.
  // dispatch의 첫번 째 argument는 action에 할당된다.
  const [state, dispatch] = useReducer(reducer, { count: 0 });
  return (
    <>
      <h1>{state.count}</h1>
      <button onClick={() => dispatch({ type: INCREMENT })}>Add</button>
      <button onClick={() => dispatch({ type: DECREMENT })}>Minus</button>
    </>
  );
}

export default App;
```
