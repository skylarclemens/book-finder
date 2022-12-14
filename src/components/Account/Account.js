import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { removeUser } from '../../reducers/userReducer';
import { resetBooks } from '../../reducers/bookReducer';
import { supabase } from '../../supabaseClient';

const Account = ({ session }) => {
  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState(null);
  const [website, setWebsite] = useState(null);
  const currentUser = useSelector(state => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if(!currentUser) {
      navigate('/login');
      return;
    }
    
    getProfile();
  }, [session]);

  const getProfile = async () => {
    try {
      setLoading(true);
      const { user } = session;
      let { data, error, status } = await supabase
        .from('profiles')
        .select('username, website')
        .eq('id', user.id)
        .single()

      if(error && status !== 406) {
        throw error;
      }

      if(data) {
        setUsername(data.username);
        setWebsite(data.website);
      }
    } catch (error) {
      console.error(error.message);
    } finally {
      setLoading(false);
    }
  }

  const updateProfile = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const { user } = session;

      const updates = {
        id: user.id,
        username,
        website,
        updated_at: new Date()
      }

      let { error } = await supabase.from('profiles').upsert(updates);

      if(error) {
        throw error;
      }
    } catch (error) {
      console.error(error.message);
    } finally {
      setLoading(false);
    }
  }

  //TO-DO: Make a sign out service
  const handleSignOut = async () => {
    const { error } = await supabase.auth.signOut();

    if(error) {
      console.error(error);
      return;
    }

    dispatch(removeUser());
    dispatch(resetBooks());
    navigate('/login');
  }

  return (
    <>
      {loading ? (
        'Saving...'
      ) : (
        <form onSubmit={updateProfile}>
          <div>Email: {session?.user?.email}</div>
          <div>
            <label htmlFor="username">Name</label>
            <input
              type="text"
              id="username"
              value={username || ''}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="website">Website</label>
            <input
              type="url"
              id="website"
              value={website || ''}
              onChange={(e) => setWebsite(e.target.value)}
            />
          </div>
          <div>
            <button disabled={loading}>Update profile</button>
          </div>
        </form>
      )}
      <button type="button" onClick={handleSignOut}>
        Log Out
      </button>
    </>
  )
}

export default Account