import "./QuizResult.css";
import NavBar from "../../components/common/NavBar";
import 'bootstrap-icons/font/bootstrap-icons.css';

function QuizResult() {
  const achievements = [
    { icon: "bi-lightning-charge-fill", title: "Chuỗi học tập", value: "7 ngày" },
    { icon: "bi-trophy-fill", title: "Điểm kinh nghiệm", value: "+150 XP" },
    { icon: "bi-clock-fill", title: "Thời gian học", value: "45 phút" }
  ];

  const nextLessons = [
    {
      title: "Giao tiếp cơ bản",
      level: "Beginner",
      duration: "15 phút",
      progress: 0
    },
    {
      title: "Từ vựng công sở",
      level: "Intermediate",
      duration: "20 phút",
      progress: 0
    }
  ];

  return (
    <div className="min-vh-100 bg-light">
      <NavBar />
      <div className="container navbar-padding">
        <div className="row">
          {/* Left Sidebar - Achievement Stats */}
          <div className="col-md-3">
            <div className="bg-white rounded-4 p-4 shadow-sm mb-4">
              <h5 className="fw-bold mb-4">Thành tích</h5>
              {achievements.map((item, index) => (
                <div key={index} className="d-flex align-items-center mb-3">
                  <i className={`bi ${item.icon} text-primary fs-4 me-3`}></i>
                  <div>
                    <div className="text-muted small">{item.title}</div>
                    <div className="fw-bold">{item.value}</div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="bg-white rounded-4 p-4 shadow-sm">
              <h5 className="fw-bold mb-3">Bảng xếp hạng tuần</h5>
              <div className="position-relative">
                <div className="d-flex align-items-center mb-3">
                  <img src="https://via.placeholder.com/40" alt="User" className="rounded-circle me-2" />
                  <div className="flex-grow-1">
                    <div className="fw-bold">Nguyễn Văn A</div>
                    <div className="text-muted small">1250 XP</div>
                  </div>
                  <span className="badge bg-warning">1</span>
                </div>
                {/* Add more users here */}
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="col-md-6">
            <div className="bg-white rounded-4 p-4 shadow-sm">
              {/* Original Quiz Result Content */}
              <div className="quiz-result d-flex flex-column align-items-center">
                <div className="text-center mb-4">
                  <img
                    src="https://via.placeholder.com/200"
                    alt="Quiz Result"
                    className="avatar rounded-circle mb-3"
                  />
                  <h4 className="fw-bold text-orange">Hoàn thành bài học</h4>
                  <p className="text-muted">Thời gian hoàn thành: <strong>10m26s</strong></p>
                </div>

                <div className="d-flex justify-content-center align-items-center gap-2 mb-4">
                  <i className="bi bi-star-fill text-warning fs-3"></i>
                  <i className="bi bi-star-fill text-warning fs-3"></i>
                  <i className="bi bi-star-fill text-warning fs-3"></i>
                  <i className="bi bi-star text-muted fs-3"></i>
                  <i className="bi bi-star text-muted fs-3"></i>
                </div>

                <div className="summary mb-4 text-center">
                  <p className="text-muted">Bạn trả lời đúng <strong>8/10</strong> câu hỏi.</p>
                </div>

                {/* <div className="suggestions mb-4 w-100">
                  <h5 className="fw-bold">Gợi ý cải thiện</h5>
                  <ul className="list-unstyled">
                    <li className="text-muted">- Xem lại ngữ pháp cơ bản: thì hiện tại đơn.</li>
                    <li className="text-muted">- Luyện tập từ vựng về chủ đề công việc.</li>
                    <li className="text-muted">- Cải thiện kỹ năng nghe qua bài tập thực tế.</li>
                  </ul>
                </div> */}

                {/* Action Buttons */}
                <div className="d-flex justify-content-between w-100 gap-3">
                  <button className="btn btn-primary flex-grow-1 py-3" style={{ borderRadius: '30px' }}>
                    Xem lại bài học
                  </button>
                  <button className="btn btn-success flex-grow-1 py-3" style={{ borderRadius: '30px' }}>
                    Tiếp tục
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Right Sidebar - Next Lessons */}
          <div className="col-md-3">
            <div className="bg-white rounded-4 p-4 shadow-sm mb-4">
              <h5 className="fw-bold mb-4">Bài học tiếp theo</h5>
              {nextLessons.map((lesson, index) => (
                <div key={index} className="mb-4">
                  <div className="d-flex justify-content-between align-items-center mb-2">
                    <h6 className="fw-bold mb-0">{lesson.title}</h6>
                    <span className="badge bg-light text-dark">{lesson.level}</span>
                  </div>
                  <div className="text-muted small mb-2">
                    <i className="bi bi-clock me-2"></i>
                    {lesson.duration}
                  </div>
                  <div className="progress" style={{ height: '5px' }}>
                    <div
                      className="progress-bar"
                      style={{ width: `${lesson.progress}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-white rounded-4 p-4 shadow-sm">
              <h5 className="fw-bold mb-3">Thống kê học tập</h5>
              <div className="mb-3">
                <div className="text-muted small mb-1">Độ chính xác</div>
                <div className="progress mb-2" style={{ height: '5px' }}>
                  <div className="progress-bar bg-success" style={{ width: '80%' }}></div>
                </div>
                <div className="small text-end">80%</div>
              </div>
              <div>
                <div className="text-muted small mb-1">Hoàn thành mục tiêu</div>
                <div className="progress mb-2" style={{ height: '5px' }}>
                  <div className="progress-bar bg-primary" style={{ width: '60%' }}></div>
                </div>
                <div className="small text-end">60%</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default QuizResult;