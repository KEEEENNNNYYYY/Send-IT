import React from 'react';
import './profil.css';
import '../../component/ui-component.css';
import { User, Hash, Calendar, MapPin, Clock } from 'lucide-react';

interface UserData {
  id: string;
  first_name: string;
  last_name: string;
  birthday: string;
  numeric_id: number;
  location: string;
  creation_date: string;
}

const fetchUserData = async (userId: number): Promise<UserData> => {
  const response = await fetch(`http://localhost:5000/api/users/${userId}`);
  if (!response.ok) {
    throw new Error(`Failed to fetch user data: ${response.status}`);
  }
  return response.json();
};

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
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

interface ProfileProps {
  userId?: number;
}

const Profile: React.FC<ProfileProps> = ({ userId = 3 }) => {
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
    <div className="profile-container">
      <div className="profile-wrapper">
        <div className="profile-card">
          {/* Header */}
          <div className="profile-header">
            <div className="profile-avatar">
              <User size={40} />
            </div>
            <h2 className="profile-name">
              {user.first_name} {user.last_name}
            </h2>
            <div>
              <span className="profile-badge">
                <Hash size={12} style={{ marginRight: '4px' }} />
                ID: {user.numeric_id}
              </span>
            </div>
          </div>

          {/* Content */}
          <div className="profile-content">
            <div className="profile-grid">
              {/* Personal Information */}
              <div className="profile-section">
                <h3 className="profile-section-title">Personal Information</h3>
                <div>
                  <div className="profile-info-item">
                    <div className="profile-icon-wrapper profile-icon-blue">
                      <Calendar size={18} />
                    </div>
                    <div className="profile-info-text">
                      <p className="profile-info-label">Birthday & Age</p>
                      <p className="profile-info-value">
                        {formatDate(user.birthday)} ({userAge} years old)
                      </p>
                    </div>
                  </div>
                  <div className="profile-info-item">
                    <div className="profile-icon-wrapper profile-icon-green">
                      <MapPin size={18} />
                    </div>
                    <div className="profile-info-text">
                      <p className="profile-info-label">Location</p>
                      <p className="profile-info-value">{user.location}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Account Information */}
              <div className="profile-section">
                <h3 className="profile-section-title">Account Information</h3>
                <div>
                  <div className="profile-info-item">
                    <div className="profile-icon-wrapper profile-icon-purple">
                      <User size={18} />
                    </div>
                    <div className="profile-info-text">
                      <p className="profile-info-label">User ID</p>
                      <p className="profile-info-value profile-info-value-mono">{user.id}</p>
                    </div>
                  </div>
                  <div className="profile-info-item">
                    <div className="profile-icon-wrapper profile-icon-orange">
                      <Clock size={18} />
                    </div>
                    <div className="profile-info-text">
                      <p className="profile-info-label">Member Since</p>
                      <p className="profile-info-value">
                        {formatDate(user.creation_date)}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Stats */}
            <div className="profile-stats">
              <div className="profile-stats-grid">
                <div className="profile-stat-item profile-stat-blue">
                  <p className="profile-stat-number profile-stat-number-blue">{userAge}</p>
                  <p className="profile-stat-label">Years Old</p>
                </div>
                <div className="profile-stat-item profile-stat-green">
                  <p className="profile-stat-number profile-stat-number-green">{user.numeric_id}</p>
                  <p className="profile-stat-label">User Number</p>
                </div>
                <div className="profile-stat-item profile-stat-purple">
                  <p className="profile-stat-number profile-stat-number-purple">
                    {new Date().getFullYear() - new Date(user.creation_date).getFullYear()}
                  </p>
                  <p className="profile-stat-label">Years Active</p>
                </div>
                <div className="profile-stat-item profile-stat-orange">
                  <p className="profile-stat-number profile-stat-number-orange">1</p>
                  <p className="profile-stat-label">Active Profile</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
