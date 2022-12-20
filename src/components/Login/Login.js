import './Login.scss';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setUser } from '../../reducers/userReducer';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const dispatch = useDispatch();
  
  const handleSubmit = () => {
    const user = {
      username: username,
      password: password,
      name: fullName
    }

    dispatch(setUser(user));

    setUsername('');
    setPassword('');
    setFullName('');
  }

  return (
    <form onSubmit={handleSubmit}>
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