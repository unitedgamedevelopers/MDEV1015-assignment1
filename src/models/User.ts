import FirebaseService from '../services/FirebaseService';

interface User {
  uid: string;
  email: string;
  password: string;
}

class User {
  constructor(email: string, password: string) {
    this.email = email;
    this.password = password;
  }

  async signUp() {
    try {
      const userCredential = await FirebaseService.register(
        this.email,
        this.password,
      );
      return userCredential.user;
    } catch (error) {
      throw error;
    }
  }

  async signIn() {
    try {
      const userCredential = await FirebaseService.login(
        this.email,
        this.password,
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

export default User;
