import './Register.scss';
import { useState } from 'react';
import { supabase } from '../../supabaseClient';

const Register = () => {
  const [loading, setLoading] = useState(false);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const { data, error } = await supabase.auth.signUp(
        {
          email: email,
          password: password,
          options: {
            data: {
              full_name: fullName
            }
          }
        }
      );
      if (error) throw error;
    } catch (error) {
      console.error(error.error_description || error.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <h1>Register</h1>
      {loading ? (
        'Signing up...'
      ) : (
        <form onSubmit={handleRegister}>
          <div className="register-form">
            <input type="email" value={email} placeholder="Email" onChange={(e) => setEmail(e.target.value)}/>
            <input type="password" value={password} placeholder="Password" onChange={(e) => setPassword(e.target.value)}/>
            <input type="text" value={fullName} placeholder="Full Name" onChange={(e) => setFullName(e.target.value)}/>
            <button className="register-button" type="submit">Sign Up</button>
          </div>
        </form>
      )}
    </>
  )
}

export default Register;