import { useEffect, useState } from "react";
import { fetchUserDataByUid, UserData } from "../logic/profil/profil";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../firebase";

export function useAuthProvider() {
  const [userData, setUser] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem("user");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setUser(parsed); // load cached user fast
      } catch (e) {
        console.warn("user corrompu dans localStorage");
        localStorage.removeItem("user");
      }
    }

    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (!firebaseUser) {
        setUser(null);
        localStorage.removeItem("user");
        setLoading(false);
        return;
      }

      try {
        const userData = await fetchUserDataByUid(firebaseUser.uid);
        setUser(userData);
        localStorage.setItem("user", JSON.stringify(userData)); // sync cache
        setError(null);
      } catch (err: any) {
        setError(err.message || "Erreur lors du chargement du profil");
      } finally {
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  return { userData, loading, error };
}
