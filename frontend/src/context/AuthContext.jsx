

import React, { createContext, useContext, useEffect, useState } from "react";
import { auth, db } from "../firebase/firebase.config";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const registerUser = async (email, password, firstName, lastName, phone, address) => {
    const result = await createUserWithEmailAndPassword(auth, email, password);

    await updateProfile(result.user, {
      displayName: `${firstName} ${lastName}`,
      photoURL: null
    });

    await setDoc(doc(db, "users", result.user.uid), {
      email,
      fullName: `${firstName} ${lastName}`,
      phone,
      address,
      uid: result.user.uid,
      createdAt: new Date().toISOString(),
    });

    return result;
  };

  const loginUser = async (email, password) => {
    return await signInWithEmailAndPassword(auth, email, password);
  };

  const logout = () => {
    return signOut(auth);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const userDoc = await getDoc(doc(db, "users", user.uid));
        if (userDoc.exists()) {
          setCurrentUser({ ...user, ...userDoc.data() });
        } else {
          setCurrentUser(user);
        }
      } else {
        setCurrentUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const googleProvider = new GoogleAuthProvider();
  const signInWithGoogle = async () => {
    const result = await signInWithPopup(auth, googleProvider);

    const userDoc = await getDoc(doc(db, "users", result.user.uid));
    if (!userDoc.exists()) {
      await setDoc(doc(db, "users", result.user.uid), {
        email: result.user.email,
        fullName: result.user.displayName,
        phone: "",
        address: "",
        uid: result.user.uid,
        createdAt: new Date().toISOString(),
      });
    }

    return result;
  };

  const value = {
    currentUser,
    registerUser,
    loginUser,
    signInWithGoogle,
    logout,
    loading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};



export { AuthContext };


