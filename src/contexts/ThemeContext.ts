import React from 'react';
import theme from '../themes/default';

export type Theme = typeof theme;

const ThemeContext = React.createContext(theme);

export default ThemeContext;
