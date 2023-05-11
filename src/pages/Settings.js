import { useLocation, useNavigate } from 'react-router-dom';
import { Navbar } from '../components';
import { auth } from '../config/firebase';

const Settings = () => {

  const location = useLocation();
  const userDoc = JSON.parse(location.state);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await auth.signOut();
      navigate('/login');
    } catch (error) {
      console.error('Sign-out error:', error);
    }
  }

  const handleResetPassword = () => {
    console.log('reset password!');
  }

  return (
    <>
      <Navbar title='Settings' backArrow={true} />
      <div className='settings-item'>
        <h3>Email:</h3>
        <p>{userDoc && userDoc.email}</p>
      </div>
      <div className='settings-item'>
        <h3>Address:</h3>
        <p>{userDoc && userDoc.address}</p>
      </div>
      <div className='settings-item' onClick={handleResetPassword}>
        <h3>Reset Password</h3>
      </div>
      <div className='settings-item' onClick={handleLogout}>
        <h3>Logout</h3>
      </div>
    </>
  );
}

export default Settings;