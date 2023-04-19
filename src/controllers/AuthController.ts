import AuthService from '../services/AuthService';
import User from '../models/User';

class AuthController {
  static async signUp(email: string, password: string) {
    const user = new User(email, password);
    return await AuthService.signUp(user);
  }

  static async signIn(email: string, password: string) {
    const user = new User(email, password);
    return await AuthService.signIn(user);
  }

  static async signOut() {
    return await AuthService.signOut();
  }

  static getCurrentUser() {
    return AuthService.getCurrentUser();
  }
}

export default AuthController;
