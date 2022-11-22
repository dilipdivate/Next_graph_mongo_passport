import { useRef } from 'react';

const register = useRef(registerRef);
const handleSubmit = (event) => {
  event.preventDefault();
};

const LoginForm = ({ onSubmit, loading }) => {
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="form-group">
        <label htmlFor="email">Email</label>
        <input
          ref={register}
          type="email"
          name="email"
          className="form-control"
          id="email"
        />
      </div>
      <div className="form-group">
        <label htmlFor="password">Password</label>
        <input
          ref={register}
          name="password"
          type="password"
          className="form-control"
          id="password"
        />
      </div>
      {loading && 'Signing in...'}
      {!loading && (
        <button type="submit" className="btn btn-main bg-blue py-2 ttu">
          Submit
        </button>
      )}
    </form>
  );
};

export default LoginForm;
