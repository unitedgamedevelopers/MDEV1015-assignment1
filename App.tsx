import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import LoginScreen from './src/views/LoginScreen';
import HomeScreen from './src/views/HomeScreen';
import AuthProvider from './src/providers/AuthProvider';
import ThemeProvider from './src/providers/ThemeProvider';
import theme from './src/themes/default';

const Stack = createNativeStackNavigator();

function App(): JSX.Element {
  return (
    <AuthProvider>
      <ThemeProvider value={theme}>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen
              options={{headerShown: false}}
              name="Login"
              component={LoginScreen}
            />
            <Stack.Screen name="Home" component={HomeScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;
