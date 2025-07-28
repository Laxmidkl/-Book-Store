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
import { doc, setDoc, getDoc, updateDoc } from "firebase/firestore";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const userDoc = await getDoc(doc(db, "users", user.uid));
        if (userDoc.exists()) {
          const userData = userDoc.data();
          setCurrentUser({
            uid: user.uid,
            email: user.email,
            ...userData,
          });
        } else {
          await setDoc(doc(db, "users", user.uid), {
            uid: user.uid,
            email: user.email,
            fullName: user.displayName || "",
            phone: "",
            address: "",
            createdAt: new Date(),
          });
          setCurrentUser({
            uid: user.uid,
            email: user.email,
            fullName: user.displayName || "",
            phone: "",
            address: "",
          });
        }
      } else {
        setCurrentUser(null);
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const registerUser = async (email, password, fullName, phone, address) => {
    try {
      // Additional client-side validation before Firebase
      if (
        !/^[a-zA-Z][a-zA-Z0-9._-]*@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)
      ) {
        throw new Error(
          "Invalid email format. Email must start with a letter and use a valid domain."
        );
      }

      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      await updateProfile(auth.currentUser, { displayName: fullName });

      await setDoc(doc(db, "users", userCredential.user.uid), {
        uid: userCredential.user.uid,
        email,
        fullName,
        phone,
        address,
        createdAt: new Date(),
      });

      setCurrentUser({
        uid: userCredential.user.uid,
        email,
        fullName,
        phone,
        address,
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

      await setDoc(
        doc(db, "users", user.uid),
        {
          uid: user.uid,
          email: user.email,
          fullName: user.displayName || "",
          photoURL: user.photoURL || "",
          createdAt: new Date(),
        },
        { merge: true }
      );

      setCurrentUser({
        uid: user.uid,
        email: user.email,
        fullName: user.displayName || "",
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

  const updateUserProfile = async (updates) => {
    if (!currentUser) return;

    try {
      if (updates.fullName) {
        await updateProfile(auth.currentUser, {
          displayName: updates.fullName,
        });
      }

      await updateDoc(doc(db, "users", currentUser.uid), updates);
      setCurrentUser((prev) => ({ ...prev, ...updates }));

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
