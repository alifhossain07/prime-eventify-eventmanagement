"use client"

import { createContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";

import app from '../firebase/config';

export const AuthContext = createContext(null);

const auth = getAuth(app);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Helper to fetch user role from your backend
  const fetchUserRole = async (email) => {
    try {
      const res = await fetch(`http://localhost:5000/users/getUserRole?email=${encodeURIComponent(email)}`);
      if (!res.ok) throw new Error("Failed to fetch user role");
      const data = await res.json();
      return data.role; // expected: "admin" | "user" | "organizer"
    } catch (error) {
      console.error("Error fetching user role:", error);
      return null;
    }
  };

  // Sign up with email and password
  const createUser = async (email, password, role, displayName) => {
    setLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      const newUser = { email, name: displayName, role: role || 'user' }; // Default role or passed role

      // Save newUser to your backend or database here
      // await saveUserToDB(newUser); // replace with your actual save function

      // Update user profile with display name (no photoURL anymore)
      await user.updateProfile({
        displayName: displayName,
      });

      const userWithRole = { ...user, role: newUser.role };

      console.log('User registered:', userWithRole);
      setUser(userWithRole);
    } catch (error) {
      console.error('Error creating user:', error);
    } finally {
      setLoading(false);
    }
  };

  // Sign in with email and password
  const signIn = async (email, password) => {
    setLoading(true);
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const loggedInUser = userCredential.user;

      // Fetch role from backend API
      const role = await fetchUserRole(loggedInUser.email);

      const userWithRole = { ...loggedInUser, role };

      console.log("User logged in:", userWithRole);
      setUser(userWithRole);
    } catch (error) {
      console.error("Error signing in:", error);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  // Log out
  const logOut = async () => {
    setLoading(true);
    await signOut(auth);
    console.log("User logged out");
    setUser(null);
    setLoading(false);
  };

  // Listen to auth state changes
  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        const role = await fetchUserRole(currentUser.email);
        const userWithRole = { ...currentUser, role };
        setUser(userWithRole);
        setLoading(false);
        console.log("User state changed:", userWithRole);
      } else {
        setUser(null);
        setLoading(false);
        console.log("No user is logged in");
      }
    });

    return () => {
      unSubscribe();
    };
  }, []);

  const authInfo = {
    user,
    loading,
    createUser,
    logOut,
    signIn,
  };

  return (
    <AuthContext.Provider value={authInfo}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
