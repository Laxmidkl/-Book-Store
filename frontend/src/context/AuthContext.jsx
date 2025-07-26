import React, { createContext, useContext, useState, useEffect } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { auth, db } from "../firebase/firebase.config";
import { doc, setDoc, getDoc } from "firebase/firestore";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        // Check Firestore for additional user data
        const userDoc = await getDoc(doc(db, "users", user.uid));
        const userData = userDoc.exists() ? userDoc.data() : {};

        setCurrentUser({
          uid: user.uid,
          email: user.email,
          fullName: userData.fullName || user.displayName || "",
          phone: userData.phone || "",
          address: userData.address || "",
          photoURL: user.photoURL || "",
        });
      } else {
        setCurrentUser(null);
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const registerUser = async (email, password, fullName) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      // Set displayName in Firebase Auth (using fullName)
      await updateProfile(auth.currentUser, { displayName: fullName });

      // Create user document in Firestore
      await setDoc(doc(db, "users", userCredential.user.uid), {
        uid: userCredential.user.uid,
        fullName,
        email,
        createdAt: new Date(),
      });

      setCurrentUser({
        uid: userCredential.user.uid,
        fullName,
        email: userCredential.user.email,
      });

      return userCredential;
    } catch (error) {
      console.error("Error registering user:", error);
      throw error;
    }
  };

  const loginUser = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      // Create user document in Firestore if it doesn't exist
      await setDoc(
        doc(db, "users", user.uid),
        {
          uid: user.uid,
          fullName: user.displayName || "",
          email: user.email,
          photoURL: user.photoURL || "",
          createdAt: new Date(),
        },
        { merge: true }
      );

      setCurrentUser({
        uid: user.uid,
        fullName: user.displayName || "",
        email: user.email,
        photoURL: user.photoURL || "",
      });

      return result;
    } catch (error) {
      console.error("Error signing in with Google:", error);
      throw error;
    }
  };

  const logout = () => {
    setCurrentUser(null);
    return signOut(auth);
  };

  const updateUserProfile = async (uid, updates) => {
    try {
      // Update in Firebase Auth if fullName is provided
      if (updates.fullName) {
        await updateProfile(auth.currentUser, {
          displayName: updates.fullName,
        });
      }

      // Update in Firestore
      await setDoc(doc(db, "users", uid), updates, { merge: true });

      // Update local state
      setCurrentUser((prev) => ({
        ...prev,
        ...updates,
        fullName: updates.fullName || prev.fullName,
      }));

      return true;
    } catch (error) {
      console.error("Error updating profile:", error);
      throw error;
    }
  };

  const value = {
    currentUser,
    registerUser,
    loginUser,
    signInWithGoogle,
    logout,
    loading,
    updateUserProfile,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
