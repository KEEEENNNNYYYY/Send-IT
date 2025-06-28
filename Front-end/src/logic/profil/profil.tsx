import React, {useEffect} from 'react';
import ProfileView from '../../view/profil/profil';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../../../firebase';
import { useAuthProvider } from '../../hooks/useAuth';

export interface UserData {
  id: string;
  first_name: string;
  last_name: string;
  birthday: string;
  numeric_id: number;
  location: string;
  creation_date: string;
}

export const fetchUserDataByUid = async (uid: string): Promise<UserData> => {
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
  const {userData,loading,error}= useAuthProvider();
  console.log(userData);
  
  if (loading) return <div className="profile-loading">Loading profile...</div>;
  if (error) return <div className="profile-error">Error: {error}</div>;
  if (!userData) return <div>nope nope</div>;
  const userAge = calculateAge(userData?.birthday);
  
  return <ProfileView user={userData} userAge={userAge} />;
};

export default ProfileContainer;
