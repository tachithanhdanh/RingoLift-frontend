import "./Profile.css";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import NavBar from "../../components/common/NavBar";
import { getUserById } from "../../services/userService";
import { getGoalByUserId } from "../../services/goalService";
import { getLessonProgressByUserId } from "../../services/userService";
import { getLessonById } from "../../services/lessonService";
import { getDailyProgressByUserIdAndCreatedAt } from "../../services/dailyProgressService";
import { User } from "../../interfaces/models/User";
import { Goal } from "../../interfaces/models/Goal";
import { DailyProgress } from "../../interfaces/models/DailyProgress";
import { LessonProgress } from "../../interfaces/models/LessonProgress";

interface EnhancedLessonProgress extends LessonProgress {
  title: string;
}

function Profile() {
  const { userId } = useParams(); // Retrieve userId from the route
  const [profile, setProfile] = useState<User | null>(null);
  const [goal, setGoal] = useState<Goal | null>(null);
  const [dailyProgress, setDailyProgress] = useState<DailyProgress | null>(null);
  const [lessonProgress, setLessonProgress] = useState<EnhancedLessonProgress[]>([]);

  useEffect(() => {
    async function fetchProfile() {
      if (userId) {
        try {
          const fetchedProfile = await getUserById(Number(userId));
          setProfile(fetchedProfile);

          // Fetch goal and daily progress
          const fetchedGoal = await getGoalByUserId(Number(userId));
          setGoal(fetchedGoal);

          const today = new Date();
          const createdAt = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;
          const fetchedDailyProgress = await getDailyProgressByUserIdAndCreatedAt(Number(userId), createdAt);
          setDailyProgress(fetchedDailyProgress);

          // Fetch lesson progress and titles
          const fetchedLessonProgress = await getLessonProgressByUserId(Number(userId));
          const lessonProgressWithTitles = await Promise.all(
            fetchedLessonProgress.map(async (progress) => {
              const lessonDetails = await getLessonById(progress.lessonId);
              return {
                ...progress,
                title: lessonDetails.title,
              };
            })
          );
          setLessonProgress(lessonProgressWithTitles);
        } catch (error) {
          console.error("Failed to fetch data:", error);
        }
      }
    }

    fetchProfile();
  }, [userId]);

  if (!profile || !goal || !dailyProgress) {
    return <div>Loading...</div>;
  }

  const calculatePercentage = (value: number, total: number) => {
    return total ? Math.round((value / total) * 100) : 0;
  };

  // const timeSpentPercentage = calculatePercentage(dailyProgress.timeSpent, goal.timeSpent);
  const lessonCountPercentage = calculatePercentage(dailyProgress.lessonCount, goal.lessonCount);
  // const wordCountPercentage = calculatePercentage(dailyProgress.wordCount, goal.wordCount);

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
                <h5 className="fw-bold mb-4">Daily Progress</h5>
                {/* <div className="mb-4">
                  <div className="d-flex justify-content-between align-items-center mb-2">
                    <span className="fw-medium">Time Spent</span>
                    <span className="text-muted small">{dailyProgress.timeSpent} / {goal.timeSpent}</span>
                  </div>
                  <div className="progress" style={{ height: "8px" }}>
                    <div
                      className="progress-bar bg-warning"
                      role="progressbar"
                      style={{ width: `${timeSpentPercentage}%` }}
                      aria-valuenow={timeSpentPercentage}
                      aria-valuemin={0}
                      aria-valuemax={100}
                    />
                  </div>
                </div> */}
                <div className="mb-4">
                  <div className="d-flex justify-content-between align-items-center mb-2">
                    <span className="fw-medium">Lesson Count</span>
                    <span className="text-muted small">{dailyProgress.lessonCount} / {goal.lessonCount}</span>
                  </div>
                  <div className="progress" style={{ height: "8px" }}>
                    <div
                      className="progress-bar bg-info"
                      role="progressbar"
                      style={{ width: `${lessonCountPercentage}%` }}
                      aria-valuenow={lessonCountPercentage}
                      aria-valuemin={0}
                      aria-valuemax={100}
                    />
                  </div>
                </div>
                {/* <div>
                  <div className="d-flex justify-content-between align-items-center mb-2">
                    <span className="fw-medium">Word Count</span>
                    <span className="text-muted small">{dailyProgress.wordCount} / {goal.wordCount}</span>
                  </div>
                  <div className="progress" style={{ height: "8px" }}>
                    <div
                      className="progress-bar bg-success"
                      role="progressbar"
                      style={{ width: `${wordCountPercentage}%` }}
                      aria-valuenow={wordCountPercentage}
                      aria-valuemin={0}
                      aria-valuemax={100}
                    />
                  </div>
                </div> */}
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
                  <p className="text-muted">{profile.dateOfBirth?.split('T')[0]}</p>
                </div>
                <div className="mb-4">
                  <label className="form-label fw-bold">Email</label>
                  <p className="text-muted">{profile.email}</p>
                </div>
                <h4 className="fw-bold mb-4">Lesson Progress</h4>
                <ul className="list-group">
                  {lessonProgress.map((lesson) => (
                    <li
                      key={lesson.id}
                      className="list-group-item d-flex justify-content-between align-items-center"
                    >
                      <div>
                        <strong>{lesson.title}</strong>
                      </div>
                      <div className="d-flex align-items-center">
                        <span className="badge bg-success text-white rounded-pill me-2 px-3 py-2">
                          Correct: {lesson.correctCount}
                        </span>
                        <span className="badge bg-danger text-white rounded-pill me-3 px-3 py-2">
                          Incorrect: {lesson.incorrectCount}
                        </span>
                        {/* <span className="badge bg-secondary text-white rounded-pill px-3 py-2">
                          {lesson.timeSpent} mins
                        </span> */}
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
