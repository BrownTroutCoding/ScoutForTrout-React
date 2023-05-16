import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import { firebaseConfig } from '../config/firebase.config';
import { fetchUserData } from '../custom-hooks/FetchData';

// Initialize Firebase only if it hasn't been initialized yet
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export const signInWithGoogle = async (onSuccess: () => void) => {
  const provider = new firebase.auth.GoogleAuthProvider();

  try {
    const result = await firebase.auth().signInWithPopup(provider);
    const user = result.user;
    const idToken = await user?.getIdToken();

    if (!user || !idToken) {
      console.error('User or ID token is null');
      return;
    }

    // Send the email and ID token to your backend
    const response = await fetch('https://scoutfortrout-flask.onrender.com/auth/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: user.email,
        id_token: idToken,
      }),
    });

    if (response.status === 409) {
      console.log('User already exists. Redirecting to sign in...');
      // Call your sign-in function here or redirect the user to the sign-in page
    } else if (!response.ok) {
      console.error('Error signing up user:', response.statusText);
      return;
    }

    const backendUserData = await response.json();
    console.log('backendUserData:', backendUserData);
    const backendUserToken = backendUserData.token;
    const backendUserId = backendUserData.id;

    // Clear existing values in local storage
    localStorage.removeItem('backendUserToken');
    localStorage.removeItem('backendUserId');

    // Store new values in local storage
    localStorage.setItem('backendUserToken', backendUserToken);
    localStorage.setItem('backendUserId', backendUserId);

    // Add the following lines to check the values in localStorage
    console.log('Stored token:', localStorage.getItem('backendUserToken'));
    console.log('Stored user ID:', localStorage.getItem('backendUserId'));

    // Call fetchUserData() here
    const userData = await fetchUserData(backendUserData.token, backendUserData.id);
    console.log('User data:', userData);

    onSuccess();
  } catch (error) {
    console.error(error);
  }
};

