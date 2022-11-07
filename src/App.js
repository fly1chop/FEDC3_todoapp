import Header from "./Header.js";
import TodoForm from "./TodoForm.js";
import TodoList from "./TodoList.js";
import { request } from "./api.js";

export default function App({ $target }) {

  this.state = {
    username: 'jane',
    todos: [],
    isLoading: false,
  };

  this.setState = (nextState) => {
    this.state = nextState;
    todoList.setState({
      todos: this.state.todos,
      isLoading: this.state.isLoading
    });
    todoForm.setState({
      isLoading: this.state.isLoading
    })
    header.setState({
      username: this.state.username,
      isLoading: this.state.isLoading
    });
  }
  
  const header = new Header({ 
    $target,
    initialState: {
      isLoading: this.state.isLoading,
      username: this.state.username
    }
  })
  
  const todoForm = new TodoForm({
    $target,
    initialState: this.state.isLoading,
    onSubmit: async (content) => {
      const todo = {
        content,
        isCompleted: false
      }

      this.setState({
        ...this.state,
        todos: [
          ...this.state.todos,
          todo
        ]
      })

      await request(`/${this.state.username}?delay=3000`, {
        method: 'POST',
        body: JSON.stringify(todo)
      })
      await fetchTodos()
    }
  })
  
  const todoList = new TodoList({
    $target,
    initialState: {
      todos: this.state.todos,
      isLoading: this.state.isLoading
    },
    onRemove: async (id) => {
      const todoIndex = this.state.todos.findIndex(todo => todo._id === id);

      const nextTodos = this.state.todos.filter((_, i) => i !== todoIndex)

      this.setState({
        ...this.state,
        todos: nextTodos
      })

      await request(`/${this.state.username}/${id}?delay=3000`, {
        method: 'DELETE'
      })
      await fetchTodos()
    },
    onToggle: async (id) => {
      const todoIndex = this.state.todos.findIndex(todo => todo._id === id);

      const nextTodos = [...this.state.todos];
      nextTodos[todoIndex].isCompleted = !nextTodos[todoIndex].isCompleted;

      this.setState({
        ...this.state,
        todos: nextTodos
      })

      await request(`/${this.state.username}/${id}/toggle?delay=3000`, {
        method: 'PUT'
      })
      await fetchTodos()
    }
  });

  const fetchTodos = async (isInit = false) => {
    const { username } = this.state;
    try {
      if(username) {

        if(isInit){
          this.setState({
            ...this.state,
            isLoading: true
          })
        }

        const todos = await request(`/${username}`);
        
        this.setState({
          ...this.state,
          todos,
          isLoading: false
        })
      }
    } catch(e) {
      console.error(e)
    } 
  }

  fetchTodos(true)
}