import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import PostCard from '../components/PostCard';
import SearchBar from '../components/SearchBar';
import LoadingSpinner from '../components/LoadingSpinner';

const Posts = () => {
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newPost, setNewPost] = useState({ title: '', body: '' });
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    fetchPosts();
    const storedFavorites = JSON.parse(localStorage.getItem('favoritePosts') || '[]');
    setFavorites(storedFavorites);
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await axios.get('https://jsonplaceholder.typicode.com/posts');
      setPosts(response.data);
      setFilteredPosts(response.data);
      setLoading(false);
    } catch (err) {
      setError('Failed to fetch posts. Please check your connection and try again.');
      setLoading(false);
    }
  };

  const handleSearch = (query) => {
    const filtered = posts.filter(post =>
      post.title.toLowerCase().includes(query.toLowerCase()) ||
      post.body.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredPosts(filtered);
  };

  const addPost = () => {
    if (!newPost.title.trim() || !newPost.body.trim()) {
      alert('Both title and body are required!');
      return;
    }

    const newPostItem = {
      id: posts.length + 101, // Start from 101 to avoid conflict with API IDs
      title: newPost.title,
      body: newPost.body,
      userId: 1
    };

    const updatedPosts = [newPostItem, ...posts];
    setPosts(updatedPosts);
    setFilteredPosts(updatedPosts);
    setNewPost({ title: '', body: '' });
  };

  const toggleFavorite = (postId) => {
    let newFavorites;
    if (favorites.includes(postId)) {
      newFavorites = favorites.filter(id => id !== postId);
    } else {
      newFavorites = [...favorites, postId];
    }
    
    setFavorites(newFavorites);
    localStorage.setItem('favoritePosts', JSON.stringify(newFavorites));
  };

  if (loading) return <LoadingSpinner />;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="posts-page">
      <h1 style={{ textAlign: 'center', marginBottom: '2rem', color: '#333' }}>
        📰 Posts Explorer
      </h1>
      
      {/* Search Bar */}
      <SearchBar onSearch={handleSearch} placeholder="Search posts by title or content..." />
      
      {/* Add Post Form */}
      <div style={{ background: '#f8f9fa', padding: '1.5rem', borderRadius: '10px', margin: '2rem 0' }}>
        <h3 style={{ marginBottom: '1rem' }}>✍️ Create New Post</h3>
        <input
          type="text"
          className="input-field"
          value={newPost.title}
          onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
          placeholder="Post Title"
        />
        <textarea
          className="input-field"
          value={newPost.body}
          onChange={(e) => setNewPost({ ...newPost, body: e.target.value })}
          placeholder="Post Content"
          rows="4"
        />
        <button className="btn btn-primary" onClick={addPost}>
          Publish Post
        </button>
      </div>
      
      {/* Posts Count */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
        <h3>
          {filteredPosts.length} {filteredPosts.length === 1 ? 'Post' : 'Posts'} Found
          {favorites.length > 0 && ` • ${favorites.length} Favorites`}
        </h3>
        
        {favorites.length > 0 && (
          <Link to="/posts?favorites=true">
            <button className="btn btn-secondary">
              ⭐ View Favorites ({favorites.length})
            </button>
          </Link>
        )}
      </div>
      
      {/* Posts List */}
      <div className="posts-list">
        {filteredPosts.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '2rem', color: '#666' }}>
            <p>No posts found. Try a different search term.</p>
          </div>
        ) : (
          filteredPosts.map(post => (
            <PostCard
              key={post.id}
              post={post}
              isFavorite={favorites.includes(post.id)}
              onToggleFavorite={toggleFavorite}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default Posts;