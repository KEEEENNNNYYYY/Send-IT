import React from 'react';
import { User } from 'lucide-react';
import ProfileView from '../../view/profil/profil';

interface UserData {
  id: string;
  first_name: string;
  last_name: string;
  birthday: string;
  numeric_id: number;
  location: string;
  creation_date: string;
}

interface ProfileContainerProps {
  userId?: number;
}

const fetchUserData = async (userId: number): Promise<UserData> => {
  const response = await fetch(`http://localhost:5000/api/users/${userId}`);
  if (!response.ok) {
    throw new Error(`Failed to fetch user data: ${response.status}`);
  }
  return response.json();
};

const calculateAge = (birthday: string) => {
  const birthDate = new Date(birthday);
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age;
};

const ProfileContainer: React.FC<ProfileContainerProps> = ({ userId = 3 }) => {
  const [user, setUser] = React.useState<UserData | null>(null);
  const [loading, setLoading] = React.useState<boolean>(true);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    setLoading(true);
    fetchUserData(userId)
      .then((data) => {
        setUser(data);
        setError(null);
      })
      .catch((err) => {
        setError(err.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [userId]);

  if (loading) {
    return (
      <div className="profile-loading">
        <div className="profile-loading-wrapper">
          <div className="profile-loading-card">
            <div className="profile-loading-header">
              <div className="skeleton skeleton-avatar"></div>
              <div className="skeleton skeleton-title"></div>
              <div className="skeleton skeleton-subtitle"></div>
            </div>
            <div className="profile-loading-content">
              <div className="profile-loading-grid">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="profile-loading-item">
                    <div className="skeleton skeleton-icon"></div>
                    <div className="skeleton skeleton-text"></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="profile-error">
        <div className="profile-error-card">
          <div className="profile-error-content">
            <div className="profile-error-icon">
              <User size={48} />
            </div>
            <h3 className="profile-error-title">Failed to Load Profile</h3>
            <p className="profile-error-message">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  if (!user) return null;

  const userAge = calculateAge(user.birthday);

  return (
    <ProfileView user={user} userAge={userAge} />
  );
};

export default ProfileContainer;
