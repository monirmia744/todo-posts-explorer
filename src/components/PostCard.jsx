import { Link } from 'react-router-dom';

const PostCard = ({ post, isFavorite, onToggleFavorite }) => {
  return (
    <div className="post-card">
      <h3 className="post-title">{post.title}</h3>
      <p className="post-body">
        {post.body.length > 100 ? `${post.body.substring(0, 100)}...` : post.body}
      </p>
      
      <div className="post-actions">
        <Link to={`/posts/${post.id}`}>
          <button className="btn btn-primary">Read More</button>
        </Link>
        
        <button 
          className={`btn ${isFavorite ? 'btn-primary' : 'btn-secondary'}`}
          onClick={() => onToggleFavorite(post.id)}
        >
          {isFavorite ? '❤️ Favorite' : '🤍 Add to Favorites'}
        </button>
      </div>
    </div>
  );
};

export default PostCard;