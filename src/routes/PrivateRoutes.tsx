// routes/PrivateRoutes.tsx
import { Route, Routes } from "react-router-dom";
import Profile from "../pages/Profile/Profile";
import EditProfile from "../pages/Profile/EditProfile";
import ChatList from "../pages/Chat/ChatList";
import ChatDetail from "../pages/Chat/ChatDetail";
import FriendList from "../pages/Friends/FriendList";
// import PublicProfile from "../pages/Friends/PublicProfile";
import Chapter from "../pages/Learn/Chapter";
import LessonDetailPage from "../pages/Learn/LessonDetailPage";
import ListeningExercise from "../pages/Learn/ListeningExercise";
import ListeningQuiz from "../pages/Learn/ListeningQuiz";
import QuizFill from "../pages/Learn/QuizFill";
import QuizMultipleChoice from "../pages/Learn/QuizMultipleChoice";
import QuizResult from "../pages/Learn/QuizResult";
import Flashcards from "../pages/Vocabulary/Flashcards";
import Topics from "../pages/Vocabulary/Topics";
import StoryList from "../pages/Stories/StoryList";
import StoryDetail from "../pages/Stories/StoryDetail";
import Vocabulary from "../pages/Vocabulary/Topics";
import Home from "../pages/Home";
import Learn from "../pages/Learn/Learn";
import Mistakes from "../pages/Mistakes/Mistakes";
import MistakeDetail from "../pages/Mistakes/MistakeDetail";

const PrivateRoutes = () => {
  return (
    <Routes>
      <Route path="/home" element={<Home />} />
      <Route path="profile/:userId" element={<Profile />} />
      <Route path="edit-profile" element={<EditProfile />} />
      <Route path="chat-list" element={<ChatList />} />
      <Route path="chat/:chatId" element={<ChatDetail />} />
      <Route path="friends" element={<FriendList />} />
      {/* <Route path="friends/:userId" element={<PublicProfile />} /> */}
      <Route path="learn/" element={<Learn />} />
      <Route path="learn/chapter/:chapterId" element={<Chapter />} />
      <Route path="learn/lesson/:lessonId" element={<LessonDetailPage />} />
      <Route
        path="learn/listening-exercise/:exerciseId"
        element={<ListeningExercise />}
      />
      <Route path="learn/listening-quiz/:quizId" element={<ListeningQuiz />} />
      <Route path="learn/listening-quiz/:quizId" element={<ListeningQuiz />} />
      <Route path="learn/quiz-fill/:quizId" element={<QuizFill />} />
      <Route
        path="learn/quiz-multiple-choice/:quizId"
        element={<QuizMultipleChoice />}
      />
      <Route path="learn/quiz-result/:quizId" element={<QuizResult />} />
      <Route path="vocabulary/flashcards" element={<Flashcards />} />
      <Route path="vocabulary/topics" element={<Topics />} />
      <Route path="stories" element={<StoryList />} />
      <Route path="story/:storyId" element={<StoryDetail />} />
      <Route path="vocabulary" element={<Vocabulary />} />
      <Route path="mistakes" element={<Mistakes />} />
      <Route path="mistakes/:mistakeId" element={<MistakeDetail />} />
    </Routes>
  );
};

export default PrivateRoutes;
