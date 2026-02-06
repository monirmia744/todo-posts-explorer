import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="home-page">
      <div className="hero-section" style={{ textAlign: 'center', padding: '3rem 1rem' }}>
        <h1 style={{ fontSize: '3rem', marginBottom: '1rem', color: '#333' }}>
          📚 Todo & Posts Explorer
        </h1>
        <p style={{ fontSize: '1.2rem', color: '#666', maxWidth: '600px', margin: '0 auto 2rem' }}>
          A powerful React application to manage your todos and explore posts using the JSONPlaceholder API.
          Experience seamless navigation, real-time updates, and beautiful UI.
        </p>
        
        <div className="cta-buttons" style={{ marginTop: '2rem' }}>
          <Link to="/todos">
            <button className="btn btn-primary" style={{ fontSize: '1.1rem', padding: '1rem 2rem' }}>
              🚀 Explore Todos
            </button>
          </Link>
          
          <Link to="/posts">
            <button className="btn btn-primary" style={{ fontSize: '1.1rem', padding: '1rem 2rem', marginLeft: '1rem' }}>
              📖 Browse Posts
            </button>
          </Link>
        </div>
      </div>
      
      <div className="features" style={{ display: 'flex', justifyContent: 'space-around', flexWrap: 'wrap', marginTop: '3rem' }}>
        <div className="feature-card" style={{ textAlign: 'center', padding: '1.5rem', flex: '1', minWidth: '250px', margin: '1rem' }}>
          <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>✅</div>
          <h3>Todo Management</h3>
          <p>Create, toggle, and filter todos with ease</p>
        </div>
        
        <div className="feature-card" style={{ textAlign: 'center', padding: '1.5rem', flex: '1', minWidth: '250px', margin: '1rem' }}>
          <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>📝</div>
          <h3>Posts Explorer</h3>
          <p>Browse and search through hundreds of posts</p>
        </div>
        
        <div className="feature-card" style={{ textAlign: 'center', padding: '1.5rem', flex: '1', minWidth: '250px', margin: '1rem' }}>
          <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>⭐</div>
          <h3>Favorites</h3>
          <p>Save your favorite items with localStorage</p>
        </div>
      </div>
    </div>
  );
};

export default Home;
