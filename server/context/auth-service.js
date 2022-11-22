import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();
export const authenticate = (email, password) => {
  let user;

  // Implement the credential validation however you'd like.
  if (email.length && password.length) {
    user = {
      id: 1,
      roles: ['admin'],
    };
  }

  if (!user) throw new Error('Invalid credentials.');

  return jwt.sign(user, process.env.JWT_SECRET);
};

export const validateToken = (token) => {
  try {
    const { id, roles } = jwt.verify(token, process.env.JWT_SECRET);
    console.log(id, roles);
    return { id, roles };
  } catch (e) {
    console.log(e);
    throw new Error('Authentication token is invalid.');
  }
};
