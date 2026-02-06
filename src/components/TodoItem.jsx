import { useState } from 'react';

const TodoItem = ({ todo, toggleTodo }) => {
  const [isFavorite, setIsFavorite] = useState(false);

  const handleFavorite = () => {
    const favorites = JSON.parse(localStorage.getItem('favoriteTodos')) || [];
    
    if (isFavorite) {
      const newFavorites = favorites.filter(id => id !== todo.id);
      localStorage.setItem('favoriteTodos', JSON.stringify(newFavorites));
    } else {
      localStorage.setItem('favoriteTodos', JSON.stringify([...favorites, todo.id]));
    }
    
    setIsFavorite(!isFavorite);
  };

  return (
    <div className={`todo-item ${todo.completed ? 'completed' : 'pending'}`}>
      <div className="todo-content">
        <h3 className="todo-title">{todo.title}</h3>
        <span className={`todo-status ${todo.completed ? 'completed' : 'pending'}`}>
          {todo.completed ? '✅ Completed' : '⏳ Pending'}
        </span>
      </div>
      
      <div className="todo-actions">
        <button 
          className={`btn ${todo.completed ? 'btn-secondary' : 'btn-primary'}`}
          onClick={() => toggleTodo(todo.id)}
        >
          {todo.completed ? 'Mark Pending' : 'Mark Done'}
        </button>
        
        <button 
          className={`btn ${isFavorite ? 'btn-primary' : 'btn-secondary'}`}
          onClick={handleFavorite}
        >
          {isFavorite ? '❤️ Remove Favorite' : '🤍 Add Favorite'}
        </button>
      </div>
    </div>
  );
};

export default TodoItem;