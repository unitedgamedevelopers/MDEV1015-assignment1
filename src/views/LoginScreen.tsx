import React, {useEffect, useState, useContext} from 'react';
import {ParamListBase, useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {onAuthStateChanged} from 'firebase/auth';
import {auth} from '../firebase';
import User from '../models/User';
import AuthContext from '../contexts/AuthContext';
import ThemeContext, {Theme} from '../contexts/ThemeContext';
import {validateEmail} from '../utils/utils';

const LoginScreen = () => {
  const {authService} = useContext(AuthContext);
  const theme = useContext(ThemeContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();

  useEffect(() => {
    return onAuthStateChanged(auth, user => {
      if (user) {
        navigation.replace('Home');
      }
    });
  }, [navigation]);

  const handleLogin = () => {
    setErrorMessage('');

    if (!email || !password) {
      setErrorMessage('Please enter your email and password!');
      return;
    }

    if (!validateEmail(email)) {
      setErrorMessage('Please enter a valid email!');
      return;
    }

    authService
      .signIn(new User(email, password))
      .catch((error: Error) => setErrorMessage(error.message));
  };

  const handleRegister = () => {
    setErrorMessage('');

    if (!email || !password) {
      setErrorMessage('Please enter email and password!');
      return;
    }

    authService
      .signUp(new User(email, password))
      .catch((error: Error) => setErrorMessage(error.message));
  };

  const themedStyles = getThemedStyles(theme);

  return (
    <KeyboardAvoidingView style={themedStyles.container} behavior="padding">
      <View style={themedStyles.formContainer}>
        <TextInput
          placeholder="Email"
          value={email}
          onChangeText={value => setEmail(value)}
          style={themedStyles.input}
          autoCapitalize="none"
          autoCorrect={false}
        />
        <TextInput
          placeholder="Password"
          value={password}
          onChangeText={value => setPassword(value)}
          style={themedStyles.input}
          secureTextEntry
        />
      </View>

      <View style={themedStyles.buttonContainer}>
        <TouchableOpacity onPress={handleLogin} style={themedStyles.button}>
          <Text style={themedStyles.buttonText}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handleRegister}
          style={[themedStyles.button, themedStyles.buttonOutline]}>
          <Text style={themedStyles.buttonTextOutline}>Register</Text>
        </TouchableOpacity>
      </View>

      <View style={themedStyles.errorContainer}>
        <Text style={themedStyles.errorText}>{errorMessage}</Text>
      </View>
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;

const getThemedStyles = (theme: Theme) => {
  return StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: theme.colors.secondary,
    },
    formContainer: {
      width: '90%',
    },
    input: {
      backgroundColor: theme.colors.white,
      paddingHorizontal: theme.input.paddingHorizontal,
      paddingVertical: theme.input.paddingVertical,
      borderRadius: theme.borderRadius,
      marginBottom: 10,
    },
    buttonContainer: {
      width: '90%',
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 15,
    },
    button: {
      backgroundColor: theme.colors.primary,
      width: '100%',
      padding: theme.button.padding,
      borderRadius: theme.borderRadius,
      alignItems: 'center',
    },
    buttonOutline: {
      backgroundColor: theme.colors.white,
      marginTop: 10,
      borderColor: theme.colors.primary,
      borderWidth: 2,
    },
    buttonText: {
      color: theme.colors.white,
      fontWeight: theme.fontWeight.bold,
      fontSize: theme.fontSize.medium,
    },
    buttonTextOutline: {
      color: theme.colors.primary,
      fontWeight: theme.fontWeight.bold,
      fontSize: theme.fontSize.medium,
    },
    errorContainer: {
      marginTop: 30,
      alignItems: 'center',
    },
    errorText: {
      color: theme.colors.error,
    },
  });
};
