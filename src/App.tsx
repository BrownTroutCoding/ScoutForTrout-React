import { BrowserRouter, HashRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import routes from './config/routes';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import AuthChecker from './auth/AuthChecker';
import { LoadScript } from '@react-google-maps/api'; 
import Footer from './components/Footer';

function App() {
  const handleSignInSuccess = () => {
    console.log("Sign in successful!");
  };

  return (
    <LoadScript googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}>
      <HashRouter>
        <Navbar />
        <Provider store={store}>
          <Routes>
            {routes.map((route: any, index: any) => (
              <Route
                key={index}
                path={route.path}
                element={
                  route.protected ? (
                    <AuthChecker>
                      <route.component />
                    </AuthChecker>
                  ) : (
                    <route.component />
                  )
                }
              />
            ))}
          </Routes>
          <Footer />
        </Provider>
      </HashRouter>
    </LoadScript>
  );
}

export default App;

