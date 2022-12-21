import './Login.scss';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { supabase } from '../../supabaseClient';
import { useNavigate } from 'react-router-dom';
import { setUser } from '../../reducers/userReducer';


const Login = () => {
  const user = useSelector(state => state.user);

  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if(user) {
      navigate('/');
    }
  }, [user])

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const { error } = await supabase.auth.signInWithOtp({ email });
      if (error) throw error;
      alert('Check email for the login link!');
    } catch (error) {
      console.error(error.error_description || error.message);
    } finally {
      setLoading(false);
    }
  }

  /*const handleSubmit = (e) => {
    e.preventDefault();
    const newUser = {
      username: username,
      password: password,
      name: fullName
    }

    dispatch(setUser(newUser));
  }*/

  /*const LoginForm = (
    <form onSubmit={handleLogin}>
      <div className="login-form">
        <input type="text" value={username} placeholder="Username" onChange={(e) => setUsername(e.target.value)}/>
        <input type="text" value={password} placeholder="Password" onChange={(e) => setPassword(e.target.value)}/>
        <input type="text" value={fullName} placeholder="Full Name" onChange={(e) => setFullName(e.target.value)}/>
        <button className="login-button" type="submit">Log In</button>
      </div>
    </form>
  )*/

  return (
    <div className="login">
      <h1 className="heading">Login</h1>
      <p>Sign in via magic link with your email</p>
      {loading ? (
        'Sending magic link...'
      ) : (
        <form className="login-form" onSubmit={handleLogin}>
          <div className="input-field">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <button className="login-button">Send magic link</button>
        </form>
      )}
    </div>
  )
}

export default Login;