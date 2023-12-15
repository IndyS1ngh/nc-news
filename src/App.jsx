import { Route, Routes, BrowserRouter } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Article from "./pages/Article";
import Topics from "./pages/Topics";
import ArticlesByTopic from "./pages/ArticlesByTopic";
import Error from "./components/Error";
import { UserProvider } from "./components/contexts/User";

function App() {
  return (
    <BrowserRouter>
      <UserProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/articles/:article_id" element={<Article />} />
          <Route path="/topics" element={<Topics />} />
          <Route path="/articles" element={<ArticlesByTopic />} />
          <Route path="/*" element={<Error message="Route not found!"/>} />
        </Routes>
      </UserProvider>
    </BrowserRouter>
  );
}

export default App;
