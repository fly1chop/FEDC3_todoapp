import { request } from "./api.js";
import UserList from "./UserList.js";
import Header from "./Header.js";
import TodoForm from "./TodoForm.js";
import TodoList from "./TodoList.js";

export default function App({ $target }) {

  const $userListContainer = document.createElement('div');
  const $todoListContainer = document.createElement('div');

  $target.appendChild($userListContainer)
  $target.appendChild($todoListContainer)

  this.state = {
    userList : [],
    selectedUsername: null,
    todos: [],
    isLoading: false,
  };

  this.setState = (nextState) => {
    this.state = nextState;
    todoList.setState({
      todos: this.state.todos,
      isLoading: this.state.isLoading,
      username: this.state.selectedUsername
    });
    todoForm.setState({
      isLoading: this.state.isLoading
    })
    header.setState({
      username: this.state.selectedUsername,
      isLoading: this.state.isLoading
    });

    userList.setState(this.state.userList)

    this.render()
  }

  this.render = () => {
    const { selectedUsername } = this.state
    $todoListContainer.style.display = selectedUsername ? 'block' : 'none';
  }

  const userList = new UserList({ 
    $target: $userListContainer,
    initialState: this.state.userList,
    onSelect: async (username) => {
      this.setState({
        ...this.state,
        selectedUsername: username
      })
      await fetchTodos(true);
    }
  })
  
  const header = new Header({ 
    $target: $todoListContainer,
    initialState: {
      isLoading: this.state.isLoading,
      username: this.state.selectedUsername
    }
  })
  
  const todoForm = new TodoForm({
    $target: $todoListContainer,
    initialState: this.state.isLoading,
    onSubmit: async (content) => {
      const isFirstTodoAdd = this.state.todos.length === 0;
      
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


      await request(`/${this.state.selectedUsername}`, {
        method: 'POST',
        body: JSON.stringify(todo)
      })
      await fetchTodos()

      if(isFirstTodoAdd){
        await fetchUserList();
      }
    }
  })
  
  const todoList = new TodoList({
    $target: $todoListContainer,
    initialState: {
      todos: this.state.todos,
      isLoading: this.state.isLoading,
      username: this.state.selectedUsername
    },
    onRemove: async (id) => {
      const todoIndex = this.state.todos.findIndex(todo => todo._id === id);

      const nextTodos = this.state.todos.filter((_, i) => i !== todoIndex)

      this.setState({
        ...this.state,
        todos: nextTodos
      })

      await request(`/${this.state.selectedUsername}/${id}?delay=3000`, {
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

      await request(`/${this.state.selectedUsername}/${id}/toggle?delay=3000`, {
        method: 'PUT'
      })
      await fetchTodos()
    }
  });

  const fetchUserList = async () => {
    const userList = await request('/users');

    this.setState({
      ...this.state,
      userList
    })
  }

  const fetchTodos = async (isInit = false) => {
    const { selectedUsername } = this.state;
    try {
      if(selectedUsername) {

        if(isInit){
          this.setState({
            ...this.state,
            isLoading: true
          })
        }

        const todos = await request(`/${selectedUsername}?delay=3000`);
        
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

  const init = async () => {
    await fetchUserList()
  }

  this.render();
  init();
}