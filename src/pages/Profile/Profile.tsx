import "./Profile.css";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import NavBar from "../../components/common/NavBar";
import { getUserById } from "../../services/userService";
import { User } from "../../interfaces/models/User";
// import { toCamelCase } from "../../utils/caseConverter";

function Profile() {
  const { userId } = useParams(); // Retrieve userId from the route
  const [profile, setProfile] = useState<User | null>(null);

  useEffect(() => {
    async function fetchProfile() {
      if (userId) {
        try {
          const fetchedProfile = await getUserById(Number(userId)); // Fetch user profile data
          setProfile(fetchedProfile);
        } catch (error) {
          console.error("Failed to fetch user profile:", error);
        }
      }
    }

    fetchProfile();
  }, [userId]);

  useEffect(() => {
    console.log("Profile updated:", profile);
  }, [profile]);

  if (!profile) {
    return <div>Loading...</div>; // Show a loading state while fetching data
  }

  return (
    <div className="min-vh-100 bg-light">
      <NavBar />
      <div className="friend-profile container">
        <div className="row g-4 justify-content-center">
          {/* Left Column: Avatar + Achievements */}
          <div className="col-lg-4">
            <div className="card border-0 shadow-sm">
              <div className="card-body p-4">
                <div className="text-center mb-4">
                  <div className="position-relative d-inline-block mb-3">
                    <img
                      src={profile.picture || "https://via.placeholder.com/150"}
                      alt="Profile Avatar"
                      className="avatar rounded-circle"
                    />
                  </div>
                  <p className="text-muted mb-0">@{profile.username}</p>
                </div>
                <hr className="my-4" />
                <h5 className="fw-bold mb-4">Achievements</h5>
                <div className="mb-4">
                  <div className="d-flex justify-content-between align-items-center mb-2">
                    <span className="fw-medium">Vocabulary Master</span>
                    <span className="text-muted small">75%</span>
                  </div>
                  <div className="progress" style={{ height: "8px" }}>
                    <div
                      className="progress-bar bg-warning"
                      role="progressbar"
                      style={{ width: "75%" }}
                      aria-valuenow={75}
                      aria-valuemin={0}
                      aria-valuemax={100}
                    />
                  </div>
                </div>
                <div className="mb-4">
                  <div className="d-flex justify-content-between align-items-center mb-2">
                    <span className="fw-medium">Grammar Guru</span>
                    <span className="text-muted small">60%</span>
                  </div>
                  <div className="progress" style={{ height: "8px" }}>
                    <div
                      className="progress-bar bg-info"
                      role="progressbar"
                      style={{ width: "60%" }}
                      aria-valuenow={60}
                      aria-valuemin={0}
                      aria-valuemax={100}
                    />
                  </div>
                </div>
                <div>
                  <div className="d-flex justify-content-between align-items-center mb-2">
                    <span className="fw-medium">Listening Pro</span>
                    <span className="text-muted small">85%</span>
                  </div>
                  <div className="progress" style={{ height: "8px" }}>
                    <div
                      className="progress-bar bg-success"
                      role="progressbar"
                      style={{ width: "85%" }}
                      aria-valuenow={85}
                      aria-valuemin={0}
                      aria-valuemax={100}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Profile Information + Shared Activities */}
          <div className="col-lg-8">
            <div className="card border-0 shadow-sm">
              <div className="card-body p-4">
                <h4 className="fw-bold mb-4">Profile Information</h4>
                <div className="mb-4">
                  <label className="form-label fw-bold">Full Name</label>
                  <p className="text-muted">{profile.firstName} {profile.lastName}</p>
                </div>
                <div className="mb-4">
                  <label className="form-label fw-bold">Date of Birth</label>
                  <p className="text-muted">{profile.dateOfBirth}</p>
                </div>
                <div className="mb-4">
                  <label className="form-label fw-bold">Email</label>
                  <p className="text-muted">{profile.email}</p>
                </div>
                <h4 className="fw-bold mb-4">Shared Activities</h4>
                <div>
                  <ul className="list-group">
                    <li className="list-group-item d-flex justify-content-between align-items-center">
                      Completed "English Vocabulary Challenge"
                      <span className="badge bg-primary rounded-pill">Top 10%</span>
                    </li>
                    <li className="list-group-item d-flex justify-content-between align-items-center">
                      Attended "Advanced Grammar Workshop"
                      <span className="badge bg-success rounded-pill">June 2024</span>
                    </li>
                    <li className="list-group-item d-flex justify-content-between align-items-center">
                      Finished "Listening Skills Mastery"
                      <span className="badge bg-info rounded-pill">Certificate</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
