import React from 'react';

import ThemeContextProvider from './context/ThemeContext/ThemeContextProvider';
import MenuContextProvider from './context/MenuContext/MenuContextProvider';
import UserContextProvider from './context/UserContext/UserContextProvider';

import AppRouter from './AppRouter';

function App() {
  return (
    <UserContextProvider>
      <ThemeContextProvider>
        <MenuContextProvider>
          <AppRouter />
        </MenuContextProvider>
      </ThemeContextProvider>
    </UserContextProvider>
  );
}

export default App;