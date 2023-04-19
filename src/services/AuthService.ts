import FirebaseService from '../services/FirebaseService';
import User from '../models/User';

class AuthService {
  static async signUp(user: User) {
    try {
      const userCredential = await FirebaseService.register(
        user.email,
        user.password,
      );
      return userCredential.user;
    } catch (error) {
      throw error;
    }
  }

  static async signIn(user: User) {
    try {
      const userCredential = await FirebaseService.login(
        user.email,
        user.password,
      );
      return userCredential.user;
    } catch (error) {
      throw error;
    }
  }

  static async signOut() {
    try {
      return await FirebaseService.logout();
    } catch (error) {
      throw error;
    }
  }

  static getCurrentUser() {
    return FirebaseService.getCurrentUser();
  }
}

export default AuthService;
