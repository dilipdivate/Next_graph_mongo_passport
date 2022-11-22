import BaseModel from './BaseModel.js';

class User extends BaseModel {
  async getAuthUser(ctx) {
    if (ctx.isAuthenticated()) {
      return await ctx.getUser();
    }

    return null;
  }

  async signUp(signUpData) {
    if (signUpData.password !== signUpData.passwordConfirmation) {
      throw new Error('Password must be the same as confirmation password!');
    }

    try {
      return await this.Model.create(signUpData);
    } catch (e) {
      if (e.code && e.code === 11000) {
        throw new Error('User with provided email already exists!');
      }

      throw e;
    }
  }

  async signIn(signInData, ctx) {
    try {
      // console.log('Is auth b:', ctx.isAuthenticated(), ctx.getUser());
      const user = await ctx.authenticate(signInData);
      // console.log('Is auth a:', ctx.isAuthenticated(), ctx.getUser());
      return user;
    } catch (error) {
      console.log('Is auth error:', ctx.isAuthenticated(), ctx.getUser());
      return error;
    }
  }

  async signOut(ctx) {
    try {
      console.log('Is authb:', ctx.isAuthenticated(), ctx.getUser());
      ctx.logout();
      console.log('Is autha:', ctx.isAuthenticated(), ctx.getUser());
      return true;
    } catch (e) {
      console.log('Is authe:', ctx.isAuthenticated(), ctx.getUser(), e);
      return false;
    }
  }
}

// module.exports = User;
export default User;
