import { useState, useEffect } from 'react';
import axios from 'axios';
import TodoItem from '../components/TodoItem';
import SearchBar from '../components/SearchBar';
import LoadingSpinner from '../components/LoadingSpinner';

const Todos = () => {
  const [todos, setTodos] = useState([]);
  const [filteredTodos, setFilteredTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newTodo, setNewTodo] = useState('');
  const [showCompleted, setShowCompleted] = useState('all'); // 'all', 'completed', 'pending'

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const response = await axios.get('https://jsonplaceholder.typicode.com/todos');
      const todosWithFavorites = response.data.map(todo => ({
        ...todo,
        isFavorite: JSON.parse(localStorage.getItem('favoriteTodos') || '[]').includes(todo.id)
      }));
      
      setTodos(todosWithFavorites);
      setFilteredTodos(todosWithFavorites);
      setLoading(false);
    } catch (err) {
      setError('Failed to fetch todos. Please check your connection and try again.');
      setLoading(false);
    }
  };

  const handleSearch = (query) => {
    let filtered = todos.filter(todo =>
      todo.title.toLowerCase().includes(query.toLowerCase())
    );

    if (showCompleted === 'completed') {
      filtered = filtered.filter(todo => todo.completed);
    } else if (showCompleted === 'pending') {
      filtered = filtered.filter(todo => !todo.completed);
    }

    setFilteredTodos(filtered);
  };

  const toggleTodo = (id) => {
    const updatedTodos = todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    
    setTodos(updatedTodos);
    setFilteredTodos(updatedTodos.filter(todo => 
      showCompleted === 'all' ? true :
      showCompleted === 'completed' ? todo.completed :
      !todo.completed
    ));
  };

  const addTodo = () => {
    if (!newTodo.trim()) {
      alert('Todo title cannot be empty!');
      return;
    }

    const newTodoItem = {
      id: Date.now(),
      title: newTodo,
      completed: false,
      userId: 1,
      isFavorite: false
    };

    const updatedTodos = [newTodoItem, ...todos];
    setTodos(updatedTodos);
    setFilteredTodos(updatedTodos);
    setNewTodo('');
  };

  const filterByStatus = (status) => {
    setShowCompleted(status);
    let filtered = todos;
    
    if (status === 'completed') {
      filtered = todos.filter(todo => todo.completed);
    } else if (status === 'pending') {
      filtered = todos.filter(todo => !todo.completed);
    }
    
    setFilteredTodos(filtered);
  };

  if (loading) return <LoadingSpinner />;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="todos-page">
      <h1 style={{ textAlign: 'center', marginBottom: '2rem', color: '#333' }}>
        📋 Todo Manager
      </h1>
      
      {/* Search Bar */}
      <SearchBar onSearch={handleSearch} placeholder="Search todos by title..." />
      
      {/* Filter Buttons */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', margin: '1rem 0' }}>
        <button 
          className={`btn ${showCompleted === 'all' ? 'btn-primary' : 'btn-secondary'}`}
          onClick={() => filterByStatus('all')}
        >
          All Todos
        </button>
        <button 
          className={`btn ${showCompleted === 'completed' ? 'btn-primary' : 'btn-secondary'}`}
          onClick={() => filterByStatus('completed')}
        >
          Completed
        </button>
        <button 
          className={`btn ${showCompleted === 'pending' ? 'btn-primary' : 'btn-secondary'}`}
          onClick={() => filterByStatus('pending')}
        >
          Pending
        </button>
      </div>
      
      {/* Add Todo Form */}
      <div style={{ background: '#f8f9fa', padding: '1.5rem', borderRadius: '10px', margin: '2rem 0' }}>
        <h3 style={{ marginBottom: '1rem' }}>➕ Add New Todo</h3>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <input
            type="text"
            className="input-field"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            placeholder="Enter todo title..."
            onKeyPress={(e) => e.key === 'Enter' && addTodo()}
            style={{ flex: 1 }}
          />
          <button className="btn btn-primary" onClick={addTodo}>
            Add Todo
          </button>
        </div>
      </div>
      
      {/* Todos List */}
      <div className="todos-list">
        <h3 style={{ marginBottom: '1rem' }}>
          {filteredTodos.length} {filteredTodos.length === 1 ? 'Todo' : 'Todos'} Found
        </h3>
        
        {filteredTodos.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '2rem', color: '#666' }}>
            <p>No todos found. Try changing your search or filter.</p>
          </div>
        ) : (
          filteredTodos.map(todo => (
            <TodoItem key={todo.id} todo={todo} toggleTodo={toggleTodo} />
          ))
        )}
      </div>
    </div>
  );
};

export default Todos;