import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import LoadingSpinner from '../components/LoadingSpinner';

const PostDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isFavorite, setIsFavorite] = useState(false);
  const [comments, setComments] = useState([]);
  const [showComments, setShowComments] = useState(false);

  useEffect(() => {
    fetchPostDetails();
    checkIfFavorite();
  }, [id]);

  const fetchPostDetails = async () => {
    try {
      const [postResponse, commentsResponse] = await Promise.all([
        axios.get(`https://jsonplaceholder.typicode.com/posts/${id}`),
        axios.get(`https://jsonplaceholder.typicode.com/posts/${id}/comments`)
      ]);
      
      setPost(postResponse.data);
      setComments(commentsResponse.data);
      setLoading(false);
    } catch (err) {
      setError('Failed to fetch post details. Please try again later.');
      setLoading(false);
    }
  };

  const checkIfFavorite = () => {
    const favorites = JSON.parse(localStorage.getItem('favoritePosts')) || [];
    setIsFavorite(favorites.includes(Number(id)));
  };

  const toggleFavorite = () => {
    const favorites = JSON.parse(localStorage.getItem('favoritePosts')) || [];
    let newFavorites;
    
    if (isFavorite) {
      newFavorites = favorites.filter(favId => favId !== Number(id));
    } else {
      newFavorites = [...favorites, Number(id)];
    }
    
    localStorage.setItem('favoritePosts', JSON.stringify(newFavorites));
    setIsFavorite(!isFavorite);
  };

  if (loading) return <LoadingSpinner />;
  if (error) return <div className="error">{error}</div>;
  if (!post) return <div>Post not found</div>;

  return (
    <div className="post-detail-page">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <button className="btn btn-secondary" onClick={() => navigate('/posts')}>
          ← Back to Posts
        </button>
        
        <button 
          className={`btn ${isFavorite ? 'btn-primary' : 'btn-secondary'}`}
          onClick={toggleFavorite}
        >
          {isFavorite ? '❤️ Remove from Favorites' : '🤍 Add to Favorites'}
        </button>
      </div>
      
      <article style={{ background: 'white', padding: '2rem', borderRadius: '10px', boxShadow: '0 5px 15px rgba(0,0,0,0.1)' }}>
        <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem', color: '#333' }}>
          {post.title}
        </h1>
        
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '2rem', color: '#666' }}>
          <span style={{ marginRight: '1rem' }}>📝 Post ID: {post.id}</span>
          <span>👤 User ID: {post.userId}</span>
        </div>
        
        <div style={{ fontSize: '1.1rem', lineHeight: '1.8', color: '#444', marginBottom: '2rem' }}>
          {post.body}
        </div>
        
        <div style={{ borderTop: '2px solid #eee', paddingTop: '2rem' }}>
          <button 
            className="btn btn-primary"
            onClick={() => setShowComments(!showComments)}
            style={{ marginBottom: '1rem' }}
          >
            {showComments ? 'Hide' : 'Show'} Comments ({comments.length})
          </button>
          
          {showComments && (
            <div className="comments-section">
              <h3 style={{ marginBottom: '1rem' }}>💬 Comments</h3>
              {comments.map(comment => (
                <div 
                  key={comment.id} 
                  style={{ 
                    background: '#f8f9fa', 
                    padding: '1rem', 
                    marginBottom: '1rem', 
                    borderRadius: '8px',
                    borderLeft: '4px solid #667eea'
                  }}
                >
                  <h4 style={{ color: '#333', marginBottom: '0.5rem' }}>{comment.name}</h4>
                  <p style={{ color: '#666', marginBottom: '0.5rem' }}>
                    <small>By: {comment.email}</small>
                  </p>
                  <p style={{ color: '#444' }}>{comment.body}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </article>
      
      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '2rem' }}>
        <Link to={`/posts/${Number(id) - 1}`}>
          <button className="btn btn-secondary" disabled={Number(id) <= 1}>
            ← Previous Post
          </button>
        </Link>
        
        <Link to={`/posts/${Number(id) + 1}`}>
          <button className="btn btn-secondary">
            Next Post →
          </button>
        </Link>
      </div>
    </div>
  );
};

export default PostDetail;