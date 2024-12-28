import "./EditProfile.css";
import { useState, useEffect } from "react";
import NavBar from "../../components/common/NavBar";
import 'bootstrap-icons/font/bootstrap-icons.css';
import { useAuth } from "../../hooks/useAuth";
import { User } from "../../interfaces/models/User";
import { getUserById, updateUser } from "../../services/userService"; // API service to fetch and update user profile

interface EditableFieldProps {
  label: string;
  value: string;
  onChange: (newValue: string) => void;
  onSave: () => void;
}

function EditableField({ label, value, onChange, onSave }: EditableFieldProps) {
  const [tempValue, setTempValue] = useState(value);
  const [isEditing, setIsEditing] = useState(false);

  const handleEdit = () => {
    setIsEditing(true);
    setTempValue(value);
  };

  const handleSave = () => {
    onChange(tempValue);
    onSave();
    setIsEditing(false);
  };

  const handleCancel = () => {
    setTempValue(value);
    setIsEditing(false);
  };

  return (
    <div className="mb-4">
      <div className="d-flex align-items-center justify-content-between gap-3">
        <div className="flex-grow-1">
          <label className="form-label mb-2 fw-bold">{label}</label>
          <div className="d-flex gap-2">
            <input
              type="text"
              className={`form-control ${!isEditing ? "field-readonly" : ""}`}
              style={{
                height: "42px",
                fontSize: "15px",
                backgroundColor: isEditing ? "#fff" : "#f8f9fa",
              }}
              value={isEditing ? tempValue : value}
              onChange={(e) => setTempValue(e.target.value)}
              readOnly={!isEditing}
            />
            <div className="d-flex align-items-center gap-2">
              {isEditing ? (
                <>
                  <button
                    className="btn btn-success d-flex align-items-center justify-content-center"
                    onClick={handleSave}
                    style={{ width: "42px", height: "42px" }}
                  >
                    <i className="bi bi-check fs-5" />
                  </button>
                  <button
                    className="btn btn-danger d-flex align-items-center justify-content-center"
                    onClick={handleCancel}
                    style={{ width: "42px", height: "42px" }}
                  >
                    <i className="bi bi-x fs-5" />
                  </button>
                </>
              ) : (
                <button
                  className="btn btn-outline-secondary d-flex align-items-center justify-content-center"
                  onClick={handleEdit}
                  style={{ width: "42px", height: "42px" }}
                >
                  <i className="bi bi-pencil fs-5" />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function EditableDateField({ label, value, onChange, onSave }: EditableFieldProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [tempDate, setTempDate] = useState(value);

  const [year, month, day] = tempDate
    ? tempDate.split("T")[0].split("-")
    : ["", "", ""];

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    onSave();
    setIsEditing(false);
  };

  const handleCancel = () => {
    setTempDate(value);
    setIsEditing(false);
  };

  const handleDateChange = (newYear: string, newMonth: string, newDay: string) => {
    const newDate = `${newYear}-${newMonth.padStart(2, "0")}-${newDay.padStart(2, "0")}T17:00:00`;
    setTempDate(newDate);
    onChange(newDate);
  };

  return (
    <div className="mb-4">
      <label className="form-label fw-bold">{label}</label>
      <div className="d-flex gap-2 align-items-center">
        <select
          className="form-select"
          value={year}
          onChange={(e) => handleDateChange(e.target.value, month, day)}
          disabled={!isEditing}
        >
          <option value="">Year</option>
          {Array.from({ length: 100 }, (_, i) => (
            <option key={i} value={2023 - i}>
              {2023 - i}
            </option>
          ))}
        </select>
        <select
          className="form-select"
          value={month}
          onChange={(e) => handleDateChange(year, e.target.value, day)}
          disabled={!isEditing}
        >
          <option value="">Month</option>
          {Array.from({ length: 12 }, (_, i) => (
            <option key={i + 1} value={i + 1}>
              {i + 1}
            </option>
          ))}
        </select>
        <select
          className="form-select"
          value={day}
          onChange={(e) => handleDateChange(year, month, e.target.value)}
          disabled={!isEditing}
        >
          <option value="">Day</option>
          {Array.from({ length: 31 }, (_, i) => (
            <option key={i + 1} value={i + 1}>
              {i + 1}
            </option>
          ))}
        </select>
        {isEditing ? (
          <>
            <button
              className="btn btn-success d-flex align-items-center justify-content-center"
              onClick={handleSave}
              style={{ width: "42px", height: "42px" }}
            >
              <i className="bi bi-check fs-5" />
            </button>
            <button
              className="btn btn-danger d-flex align-items-center justify-content-center"
              onClick={handleCancel}
              style={{ width: "42px", height: "42px" }}
            >
              <i className="bi bi-x fs-5" />
            </button>
          </>
        ) : (
          <button
            className="btn btn-outline-secondary d-flex align-items-center justify-content-center"
            onClick={handleEdit}
            style={{ width: "42px", height: "42px" }}
          >
            <i className="bi bi-pencil fs-5" />
          </button>
        )}
      </div>
    </div>
  );
}

function EditProfile() {
  const { user } = useAuth(); // Get the authenticated user from context
  const [profile, setProfile] = useState<User | null>(null);
  const [selectedAvatar, setSelectedAvatar] = useState<string | null>(null);

  useEffect(() => {
    async function fetchProfile() {
      if (user) {
        try {
          const fetchedProfile = await getUserById(user.id); // Fetch user profile data
          setProfile(fetchedProfile);
        } catch (error) {
          console.error("Failed to fetch user profile:", error);
        }
      }
    }

    fetchProfile();
  }, [user]);

  const handleFieldChange = async (field: keyof User, newValue: string) => {
    if (profile) {
      const updatedProfile = { ...profile, [field]: newValue };

      const apiPayload = {
        username: updatedProfile.username,
        email: updatedProfile.email,
        firstName: updatedProfile.firstName,
        lastName: updatedProfile.lastName,
        dateOfBirth: updatedProfile.dateOfBirth,
        genderId: updatedProfile.gender === "MALE" ? 1 : updatedProfile.gender === "FEMALE" ? 2 : 3,
        picture: updatedProfile.picture,
        goalId: undefined, // Adjust as needed
        // password: updatedProfile.password,
        isPublic: updatedProfile.isPublic,
        googleId: updatedProfile.googleId,
        accessToken: undefined,
      };

      try {
        await updateUser(profile.id, apiPayload);

        const refreshedProfile = await getUserById(profile.id);
        setProfile(refreshedProfile);
      } catch (error) {
        console.error(`Failed to update ${field}:`, error);
      }
    }
  };

  const handleAvatarChange = async () => {
    if (profile && selectedAvatar) {
      const updatedProfile = { ...profile, picture: selectedAvatar };
      try {
        await updateUser(profile.id, { ...updatedProfile });
        const refreshedProfile = await getUserById(profile.id);
        setProfile(refreshedProfile);
      } catch (error) {
        console.error("Failed to update avatar:", error);
      }
    }
  };

  useEffect(() => {
    console.log("Profile updated:", profile);
  }, [profile]);

  if (!profile) {
    return <div>Loading...</div>; // Show a loading state while fetching data
  }

  const avatarOptions = [
    "https://raw.githubusercontent.com/shadow578/Project-Padoru/refs/heads/master/Padoru/aichannel-ai-chan.png",
    "https://raw.githubusercontent.com/shadow578/Project-Padoru/refs/heads/master/Padoru/blends-maika.png",
    "https://raw.githubusercontent.com/shadow578/Project-Padoru/refs/heads/master/Padoru/cells-at-work-patelet.png",
    "https://raw.githubusercontent.com/shadow578/Project-Padoru/refs/heads/master/Padoru/clannad-nagisa-furukawa.png",
    "https://raw.githubusercontent.com/shadow578/Project-Padoru/refs/heads/master/Padoru/darling-in-the-franxx-zero-two.png",
    "https://raw.githubusercontent.com/shadow578/Project-Padoru/refs/heads/master/Padoru/demon-girl-next-door-shamiko.png",
    "https://raw.githubusercontent.com/shadow578/Project-Padoru/refs/heads/master/Padoru/demon-slayer-kanao-tsuyuri.png",
    "https://raw.githubusercontent.com/shadow578/Project-Padoru/refs/heads/master/Padoru/demon-slayer-nezuko.png",
    "https://raw.githubusercontent.com/shadow578/Project-Padoru/refs/heads/master/Padoru/disgaea-rozalin.png",
    "https://raw.githubusercontent.com/shadow578/Project-Padoru/refs/heads/master/Padoru/dragon-maid-kanna.png",
    "https://raw.githubusercontent.com/shadow578/Project-Padoru/refs/heads/master/Padoru/dragon-maid-tooru.png",
    "https://raw.githubusercontent.com/shadow578/Project-Padoru/refs/heads/master/Padoru/emergence-saki.png",
    // "https://raw.githubusercontent.com/shadow578/Project-Padoru/refs/heads/master/Padoru/fate-astolfo.png",
    // "https://raw.githubusercontent.com/shadow578/Project-Padoru/refs/heads/master/Padoru/fate-nero-claudius.png",
    // "https://raw.githubusercontent.com/shadow578/Project-Padoru/refs/heads/master/Padoru/fire-emblem-azura.png",
    // "https://raw.githubusercontent.com/shadow578/Project-Padoru/refs/heads/master/Padoru/fire-emblem-bernadetta.png",
  ];

  // const handleDateOfBirthChange = (year: string, month: string, day: string) => {
  //   const newDate = `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}T17:00:00`;
  //   handleFieldChange("dateOfBirth", newDate);
  // };
  
  // const [year, month, day] = profile.dateOfBirth
  //   ? profile.dateOfBirth.split("T")[0].split("-")
  //   : ["", "", ""];  

  return (
    <div className="min-vh-100 bg-light">
      <NavBar />
      <div className="edit-profile container">
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
                <div className="text-center">
                  <h5 className="fw-bold mb-3">Choose an Avatar</h5>
                  <div className="d-flex flex-wrap justify-content-center gap-2">
                    {avatarOptions.map((url, index) => (
                      <img
                        key={index}
                        src={url}
                        alt={`Avatar ${index}`}
                        className={`avatar-option rounded-circle ${selectedAvatar === url ? "selected" : ""}`}
                        style={{ width: "80px", height: "80px", cursor: "pointer", border: selectedAvatar === url ? "2px solid #007BFF" : "none" }}
                        onClick={() => setSelectedAvatar(url)}
                      />
                    ))}
                  </div>
                  <button
                    className="btn btn-primary mt-3"
                    onClick={handleAvatarChange}
                    disabled={!selectedAvatar}
                  >
                    Save Avatar
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Profile Information */}
          <div className="col-lg-8">
            <div className="card border-0 shadow-sm">
              <div               className="card-body p-4">
                <h4 className="fw-bold mb-4">Profile Information</h4>
                <EditableField
                  label="First Name"
                  value={profile.firstName || ""}
                  onChange={(newValue) => handleFieldChange("firstName", newValue)}
                  onSave={() => handleFieldChange("firstName", profile.firstName || "")}
                />
                <EditableField
                  label="Last Name"
                  value={profile.lastName || ""}
                  onChange={(newValue) => handleFieldChange("lastName", newValue)}
                  onSave={() => handleFieldChange("lastName", profile.lastName || "")}
                />
                <EditableField
                  label="Gender"
                  value={profile.gender ? profile.gender.charAt(0).toUpperCase() + profile.gender.slice(1).toLowerCase() : ""}
                  onChange={(newValue) => handleFieldChange("gender", newValue)}
                  onSave={() => handleFieldChange("gender", profile.gender || "")}
                />
                <EditableDateField
                  label="Date of Birth"
                  value={profile.dateOfBirth || ""}
                  onChange={(newValue) => handleFieldChange("dateOfBirth", newValue)}
                  onSave={() => handleFieldChange("dateOfBirth", profile.dateOfBirth || "")}
                />
                <EditableField
                  label="Email"
                  value={profile.email || ""}
                  onChange={(newValue) => handleFieldChange("email", newValue)}
                  onSave={() => handleFieldChange("email", profile.email || "")}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditProfile;
