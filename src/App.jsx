import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Todos from './pages/Todos';
import Posts from './pages/Posts';
import PostDetail from './pages/PostDetail';
import Navbar from './components/Navbar';
import './index.css';

function App() {
  return (
    <Router>
      <div className="app">
        <Navbar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/todos" element={<Todos />} />
            <Route path="/posts" element={<Posts />} />
            <Route path="/posts/:id" element={<PostDetail />} />
            <Route path="*" element={<h2>404 - Page Not Found</h2>} />
          </Routes>
        </main>
        <footer className="footer">
          <p>Todo & Posts Explorer ©2026 MONIR MIA - Using JSONPlaceholder API</p>
          <p>
            <a href="https://github.com/monirmia744/todo-posts-explorer.git" target="_blank" rel="noopener noreferrer">
              View on GitHub
            </a>
          </p>
        </footer>
      </div>
    </Router>
  );
}

export default App;