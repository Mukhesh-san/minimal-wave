
import React, { useState, useEffect } from 'react';
import { Check, Plus, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from '@/hooks/use-toast';

interface Todo {
  id: string;
  text: string;
  completed: boolean;
}

const TodoApp: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>(() => {
    // Load todos from localStorage on initial render
    const savedTodos = localStorage.getItem('todos');
    return savedTodos ? JSON.parse(savedTodos) : [
      { id: '1', text: 'Learn React', completed: true },
      { id: '2', text: 'Build a Todo App', completed: false },
      { id: '3', text: 'Add styling with Tailwind', completed: false },
    ];
  });
  
  const [newTodo, setNewTodo] = useState('');

  // Save todos to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const addTodo = () => {
    if (newTodo.trim() !== '') {
      const todo: Todo = {
        id: Date.now().toString(),
        text: newTodo,
        completed: false
      };
      
      setTodos([...todos, todo]);
      setNewTodo('');
      toast({
        title: "Todo added",
        description: `"${newTodo}" added to your list.`,
      });
    }
  };

  const toggleTodo = (id: string) => {
    setTodos(todos.map(todo => 
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const deleteTodo = (id: string) => {
    const todoToDelete = todos.find(todo => todo.id === id);
    setTodos(todos.filter(todo => todo.id !== id));
    
    if (todoToDelete) {
      toast({
        title: "Todo removed",
        description: `"${todoToDelete.text}" removed from your list.`,
      });
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      addTodo();
    }
  };

  return (
    <div className="w-full border border-border rounded-lg shadow-sm bg-card p-4">
      <div className="mb-4 flex gap-2">
        <Input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Add a new task..."
          className="flex-1"
        />
        <Button onClick={addTodo} size="icon">
          <Plus className="h-4 w-4" />
        </Button>
      </div>
      
      <div className="space-y-2">
        {todos.length === 0 ? (
          <p className="text-center text-muted-foreground py-4">No todos yet. Add some!</p>
        ) : (
          todos.map(todo => (
            <div 
              key={todo.id} 
              className="flex items-center justify-between p-2 border border-border rounded-md group hover:bg-secondary/30 transition-colors"
            >
              <div className="flex items-center gap-2">
                <button 
                  onClick={() => toggleTodo(todo.id)}
                  className={`h-5 w-5 rounded-md border flex items-center justify-center transition-colors ${
                    todo.completed 
                      ? 'bg-primary border-primary text-primary-foreground' 
                      : 'border-primary/50 hover:border-primary/80'
                  }`}
                >
                  {todo.completed && <Check className="h-3 w-3" />}
                </button>
                <span className={todo.completed ? 'line-through text-muted-foreground' : ''}>
                  {todo.text}
                </span>
              </div>
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={() => deleteTodo(todo.id)}
                className="opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <Trash2 className="h-4 w-4 text-muted-foreground hover:text-destructive" />
              </Button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default TodoApp;
