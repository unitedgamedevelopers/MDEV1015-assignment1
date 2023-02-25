import React, {useEffect, useState} from 'react';
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
import {login, register} from '../services/AuthService';
import {auth} from '../firebase';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();

  const validateEmail = (value: string) => {
    const re = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return re.test(String(value).toLowerCase());
  };

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

    login(email, password).catch(error => setErrorMessage(error.message));
  };

  const handleRegister = () => {
    setErrorMessage('');

    register(email, password).catch(error => setErrorMessage(error.message));
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <View style={styles.formContainer}>
        <TextInput
          placeholder="Email"
          value={email}
          onChangeText={value => setEmail(value)}
          style={styles.input}
          autoCapitalize="none"
          autoCorrect={false}
        />
        <TextInput
          placeholder="Password"
          value={password}
          onChangeText={value => setPassword(value)}
          style={styles.input}
          secureTextEntry
        />
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={handleLogin} style={styles.button}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handleRegister}
          style={[styles.button, styles.buttonOutline]}>
          <Text style={styles.buttonTextOutline}>Register</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>{errorMessage}</Text>
      </View>
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ececec',
  },
  formContainer: {
    width: '90%',
  },
  input: {
    backgroundColor: 'white',
    paddingHorizontal: 15,
    paddingVertical: 20,
    borderRadius: 10,
    marginBottom: 10,
  },
  buttonContainer: {
    width: '90%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 15,
  },
  button: {
    backgroundColor: '#2c6bed',
    width: '100%',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonOutline: {
    backgroundColor: 'white',
    marginTop: 10,
    borderColor: '#2c6bed',
    borderWidth: 2,
  },
  buttonText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 16,
  },
  buttonTextOutline: {
    color: '#2c6bed',
    fontWeight: '700',
    fontSize: 16,
  },
  errorContainer: {
    marginTop: 30,
    alignItems: 'center',
  },
  errorText: {
    color: 'red',
  },
});
