import React, {useEffect} from 'react';
import ProfileView from '../../view/profil/profil';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../../../firebase';

interface UserData {
  id: string;
  first_name: string;
  last_name: string;
  birthday: string;
  numeric_id: number;
  location: string;
  creation_date: string;
}

const fetchUserDataByUid = async (uid: string): Promise<UserData> => {
  const response = await fetch(`http://localhost:5000/api/users/by-id/${uid}`);
  if (!response.ok) {
    throw new Error(`Failed to fetch user data: ${response.status}`);
  }
  return response.json();
};

const calculateAge = (birthday: string): number => {
  const birthDate = new Date(birthday);
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age;
};

const ProfileContainer: React.FC = () => {
  const [user, setUser] = React.useState<UserData | null>(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      console.log('onAuthStateChanged fired, firebaseUser:', firebaseUser);
      if (!firebaseUser) {
        setError('No user logged in');
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const userData = await fetchUserDataByUid(firebaseUser.uid);
        setUser(userData);
        setError(null);
      } catch (err: any) {
        setError(err.message || 'Failed to fetch user data');
      } finally {
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);
  useEffect(() => {
    console.log("Profil → user:", user);
  }, [user]);

  if (loading) return <div className="profile-loading">Loading profile...</div>;
  if (error) return <div className="profile-error">Error: {error}</div>;
  if (!user) return null;

  const userAge = calculateAge(user.birthday);

  return <ProfileView user={user} userAge={userAge} />;
};

export default ProfileContainer;
