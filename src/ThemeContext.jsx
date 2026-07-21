import React from 'react';
import useLocalStorage from './hooks/useLocalStorage';

export const ThemeContext = React.createContext();

export const ThemeProvider = ({ children }) => {
  const [storedHouse, setHouse] = useLocalStorage('casa', 'default');
  const house =
    storedHouse && storedHouse.trim() !== '' ? storedHouse : 'default';

  React.useEffect(() => {
    document.documentElement.setAttribute('data-theme', house);
  }, [house]);

  const selectHouseTheme = (houseName) => {
    const validThemes = [
      'default',
      'gryffindor',
      'slytherin',
      'ravenclaw',
      'hufflepuff',
    ];
    if (validThemes.includes(houseName)) {
      setHouse(houseName);
    }
  };

  const resetTheme = () => setHouse('default');

  return <ThemeContext.Provider value={{house, selectHouseTheme, resetTheme}}>{children}</ThemeContext.Provider>;
};
