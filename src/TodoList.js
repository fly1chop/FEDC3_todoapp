export default function TodoList({ $target, initialState, onToggle, onRemove }) {
  const $todo = document.createElement('div');

  $target.appendChild($todo);

  /**
   * todos: []
   * isLoading: boolean
   */

  this.state = initialState;

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  }

  this.render = () => {
    const { isLoading, todos } = this.state;

    if(!isLoading && todos.length === 0) {
      $todo.innerHTML = `Todo list empty 🥲`;
      return;
    }

    $todo.innerHTML = `
      <ul>
        ${todos.map(({ _id, content, isCompleted }) => `
          <li class="todo-item" data-id=${_id}>
            ${isCompleted ? `<s>${content}</s>` : content}
            <button class="remove">x</button>
          </li>
        `).join('')}
      </ul>
    `
  }

  $todo.addEventListener('click', e => {
    const $li = e.target.closest('.todo-item');
    if(!$li) return;
    
    const { id } = $li.dataset;
    const { className } = e.target;
    if(className === 'remove'){
      onRemove(id)
    } else {
      onToggle(id)
    }
  })

  this.render();
}