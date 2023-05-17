import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../config/firebase';
import { signInWithGoogle } from '../components/SignInWithGoogle'; // Import the signIn function

interface Props {
  children: React.ReactNode;
}

const AuthChecker = ({ children }: Props) => {
  const navigate = useNavigate();

  useEffect(() => {
    // function for firebase, checking if user auth has changed
    const auth_state = onAuthStateChanged(auth, (user) => {
      if (!user) {
        signInWithGoogle(() => {
          navigate('/Dashboard')
          window.location.reload();
        }); // Call the imported signIn function
      }
    });
    return () => auth_state();
  }, [auth, navigate]);

  return (
    // takes children we're passing in, can run parallel.
    <>{children}</>
  );
};

export default AuthChecker;

