import './Login.scss';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setUser } from '../../reducers/userReducer';

const Login = () => {
  const user = useSelector(state => state.user)
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
  
  const handleSubmit = (e) => {
    e.preventDefault();
    const newUser = {
      username: username,
      password: password,
      name: fullName
    }

    dispatch(setUser(newUser));
  }

  return (
    <form onSubmit={(e) => handleSubmit(e)}>
      <div className="login-form">
        <input type="text" value={username} placeholder="Username" onChange={(e) => setUsername(e.target.value)}/>
        <input type="text" value={password} placeholder="Password" onChange={(e) => setPassword(e.target.value)}/>
        <input type="text" value={fullName} placeholder="Full Name" onChange={(e) => setFullName(e.target.value)}/>
        <button className="login-button" type="submit">Log In</button>
      </div>
    </form>
  )
}

export default Login;