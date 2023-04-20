import React, {useContext} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {ParamListBase, useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import AuthContext from '../contexts/AuthContext';
import ThemeContext, {Theme} from '../contexts/ThemeContext';

const HomeScreen = () => {
  const {user, authService} = useContext(AuthContext);
  const theme = useContext(ThemeContext);
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();

  const handleLogout = () => {
    authService.signOut().then(() => navigation.replace('Login'));
  };

  const themedStyles = getThemedStyles(theme);

  return (
    <View style={themedStyles.container}>
      <Text>Email: {user?.email}</Text>
      <TouchableOpacity onPress={handleLogout} style={themedStyles.button}>
        <Text style={themedStyles.buttonText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

export default HomeScreen;

const getThemedStyles = (theme: Theme) => {
  return StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    button: {
      backgroundColor: theme.colors.primary,
      borderRadius: theme.borderRadius,
      width: '50%',
      padding: 15,
      alignItems: 'center',
      marginTop: 30,
    },
    buttonText: {
      color: theme.colors.white,
      fontWeight: theme.fontWeight.bold,
      fontSize: theme.fontSize.medium,
    },
  });
};
