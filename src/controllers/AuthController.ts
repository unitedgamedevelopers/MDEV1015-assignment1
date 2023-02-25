import UserModel from '../models/User';

class AuthController {
  static async signUp(email: string, password: string) {
    const user = new UserModel(email, password);
    return await user.signUp();
  }

  static async signIn(email: string, password: string) {
    const user = new UserModel(email, password);
    return await user.signIn();
  }

  static async signOut() {
    return await UserModel.signOut();
  }

  static getCurrentUser() {
    return UserModel.getCurrentUser();
  }
}

export default AuthController;
