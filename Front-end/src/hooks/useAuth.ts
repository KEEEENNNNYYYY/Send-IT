import { useEffect, useState } from "react";
import { fetchUserDataByUid, UserData } from "../logic/profil/profil";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../firebase";

export function useAuthProvider() {
  const [userData, setUser] = useState<UserData | null>();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      console.log("onAuthStateChanged fired, firebaseUser:", firebaseUser);
      if (!firebaseUser) {
        setError("No user logged in");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const userData = await fetchUserDataByUid(firebaseUser.uid);
        setTimeout(() => {
          setUser(userData);
        }, 2000);
        setError(null);
      } catch (err: any) {
        setError(err.message || "Failed to fetch user data");
      } finally {
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);
  if (loading) {
    console.log("loading");
  }
  if (error) {
    console.log("error", error);
  }

  return { userData };
}
