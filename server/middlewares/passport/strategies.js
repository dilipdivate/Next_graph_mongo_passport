// const { Strategy } = require('passport-strategy');
import { Strategy } from 'passport-strategy';

// Strategy get options(email, password) needed to authenticate user
// Strategy gets a callback function that will contain functionality to verify an user
// Strategy has to have "authenticate" function
// Strategy has access to "error" "fail" "success" functions
class GraphqlStrategy extends Strategy {
  constructor(verify) {
    super();

    if (!verify) {
      throw new Error('Graphql strategy requires a verify callback');
    }

    console.log('DilVerify:', verify);
    this.verify = verify;
    this.name = 'graphql';
  }

  authenticate(_, options) {
    console.log('DilipAuth:', options);
    const done = (error, user, info) => {
      console.log('DilipAuthUser:', user);
      if (error) {
        return this.error(error);
      }
      if (!user) {
        return this.fail(401);
      }

      return this.success(user, info);
    };

    this.verify(options, done);
  }
}

// module.exports = GraphqlStrategy;
export default GraphqlStrategy;
