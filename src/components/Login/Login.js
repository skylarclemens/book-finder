import './Login.scss';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { supabase } from '../../supabaseClient';
import { useNavigate, Link } from 'react-router-dom';
import { setUser } from '../../reducers/userReducer';


const Login = () => {
  const user = useSelector(state => state.user);

  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  
  const [password, setPassword] = useState('');
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
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password,
      })
      dispatch(setUser(data.user));
      if(error) throw error;
    } catch (error) {
      console.error(error.error_description || error.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="login">
      <h1 className="heading">Login</h1>
      {loading ? (
        'Logging in...'
      ) : (
        <>
          <form onSubmit={handleLogin}>
            <div className="login-form">
              <input type="email" value={email} placeholder="Email" onChange={(e) => setEmail(e.target.value)}/>
              <input type="password" value={password} placeholder="Password" onChange={(e) => setPassword(e.target.value)}/>
              <button className="login-button" type="submit">Log In</button>
            </div>
          </form>
          <span>
            Need an account? <Link to='/register'>Register here</Link>
          </span>
        </>
      )}
      
    </div>
  )
}

export default Login;