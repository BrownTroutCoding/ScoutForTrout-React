import { useState } from "react";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import { signOut } from "firebase/auth";
import { auth } from "../config/firebase";
import { signInWithGoogle } from "./SignInWithGoogle";

function Navbar() {
  const [isVisible, setIsVisible] = useState(false);

  const signInSuccess = () => {
    console.log("Sign In was successful!");
    setIsVisible(false);
  };

  const signOutOnClick = () => {
    console.log("Sign Out was successful");
    signOut(auth);
    location.reload();
  };

  const dropDown = () => {
    setIsVisible(!isVisible);
  };

  const clicked = () => {
    setIsVisible(false);
  };

  return (
    <nav className="flex items-center justify-between flex-wrap bg-gray-500 p-6">
      <div className="flex items-center flex-shrink-0 text-white mr-6">
        <Link to="/" className="font-semibold text-xl tracking-tight text-gray-200">
          Scout for Trout
        </Link>
      </div>
      <div className="block">
        <button
          onClick={dropDown}
          className="flex items-center px-3 py-2 text-gray-200 border rounded border-gray-400
           hover:text-white hover:border-white"
        >
          <i className="fa-solid fa-bars"></i>
        </button>
      </div>
      {isVisible ? (
        <div className="w-full block flex-grow items-center">

          <div className="space-x-4 mt-4 flex">
          <Link
            to="/"
            onClick={clicked}
          >
            <Button
              variant="contained"
              className="flex place-items-center mt-4 lg:inline-block lg:mt-0 text-gray-200
              hover:text-white mr-4"
            >
              Home
            </Button>
          </Link>
          <Link
            to="/dashboard"
            onClick={clicked}
          >
            <Button
              variant="contained"
              className="flex place-items-center mt-4 lg:inline-block lg:mt-0 text-gray-200
              hover:text-white mr-4"
            >
              Dashboard
            </Button>
          </Link>
          <Link
            to="/About"
            onClick={clicked}
          >
            <Button
              variant="contained"
              className="flex place-items-center mt-4 lg:inline-block lg:mt-0 text-gray-200
              hover:text-white mr-4"
            >
              About
            </Button>
          </Link>
          {!auth.currentUser ? (
            <Button
              variant="contained"
              onClick={() => {
                setIsVisible(false);
                signInWithGoogle(signInSuccess);
              }}
            >
              Sign In With Google
            </Button>
          ) : (
            <Button
              variant="contained"
              onClick={() => {
                setIsVisible(false);
                signOutOnClick();
              }}
            >
              Sign Out
            </Button>
          )}
        </div>
        </div>
      ) : (
        <></>
      )}
    </nav>
  );
}

export default Navbar;
