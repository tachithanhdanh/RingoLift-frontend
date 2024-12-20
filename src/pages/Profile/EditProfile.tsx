import "./EditProfile.css";
import { useState } from "react";
import NavBar from "../../components/common/NavBar";
import 'bootstrap-icons/font/bootstrap-icons.css';

interface EditableFieldProps {
  label: string;
  initialValue: string;
}

function EditableField({ label, initialValue }: EditableFieldProps) {
  const [value, setValue] = useState(initialValue);
  const [tempValue, setTempValue] = useState(initialValue);
  const [isEditing, setIsEditing] = useState(false);

  const handleEdit = () => {
    setIsEditing(true);
    setTempValue(value);
  };

  const handleSave = () => {
    setValue(tempValue);
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
              className="form-control"
              style={{
                height: "42px",
                fontSize: "15px",
                backgroundColor: isEditing ? "#fff" : "#f8f9fa",
              }}
              value={isEditing ? tempValue : value}
              onChange={(e) => setTempValue(e.target.value)}
              readOnly={!isEditing}
            />
            <div className="d-flex align-items-center">
              {isEditing ? (
                <>
                  <button
                    className="btn btn-outline-secondary d-flex align-items-center justify-content-center"
                    onClick={handleEdit}
                    style={{ width: "42px", height: "42px", padding: 0 }}
                  >
                    <i className="bi bi-pencil fs-5" /> {/* Icon for Edit */}
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

function EditProfile() {
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
                      src="https://via.placeholder.com/150"
                      alt="Profile Avatar"
                      className="avatar rounded-circle"
                    />
                    <button
                      className="btn btn-light btn-sm position-absolute bottom-0 end-0 d-flex align-items-center justify-content-center"
                      style={{
                        width: "35px",
                        height: "35px",
                        boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                      }}
                    >
                      <i className="bi bi-camera fs-5" />
                    </button>
                  </div>
                  {/* <h4 className="fw-bold mb-1">Chainsaw Man</h4> */}
                  <p className="text-muted mb-0">@csm1337</p>
                </div>
                <hr className="my-4" />
                <h5 className="fw-bold mb-4">Achievements</h5>
                <div className="mb-4">
                  <div className="d-flex justify-content-between align-items-center mb-2">
                    <span className="fw-medium">Vocabulary Master</span>
                    <span className="text-muted small">28%</span>
                  </div>
                  <div className="progress" style={{ height: "8px" }}>
                    <div
                      className="progress-bar bg-warning"
                      role="progressbar"
                      style={{ width: "28%" }}
                      aria-valuenow={28}
                      aria-valuemin={0}
                      aria-valuemax={100}
                    />
                  </div>
                </div>
                <div className="mb-4">
                  <div className="d-flex justify-content-between align-items-center mb-2">
                    <span className="fw-medium">Grammar Guru</span>
                    <span className="text-muted small">35%</span>
                  </div>
                  <div className="progress" style={{ height: "8px" }}>
                    <div
                      className="progress-bar bg-info"
                      role="progressbar"
                      style={{ width: "35%" }}
                      aria-valuenow={35}
                      aria-valuemin={0}
                      aria-valuemax={100}
                    />
                  </div>
                </div>
                <div>
                  <div className="d-flex justify-content-between align-items-center mb-2">
                    <span className="fw-medium">Listening Pro</span>
                    <span className="text-muted small">40%</span>
                  </div>
                  <div className="progress" style={{ height: "8px" }}>
                    <div
                      className="progress-bar bg-success"
                      role="progressbar"
                      style={{ width: "40%" }}
                      aria-valuenow={40}
                      aria-valuemin={0}
                      aria-valuemax={100}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Profile Information */}
          <div className="col-lg-8">
            <div className="card border-0 shadow-sm">
              <div className="card-body p-4">
                <h4 className="fw-bold mb-4">Profile Information</h4>
                <EditableField label="Full Name" initialValue="Nguyen Hung" />
                <EditableField label="Date of Birth" initialValue="12/07/2004" />
                <EditableField label="Email" initialValue="22120122@student.hcmus.edu.vn" />
                <EditableField label="Phone Number" initialValue="+98 0990125006" />
                <EditableField
                  label="Address"
                  initialValue="157 Trần Hưng Đạo, phường 6 quận 8 thành phố HCM"
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
