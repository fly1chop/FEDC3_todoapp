import { setItem, getItem, removeItem } from "./localStorage.js";
import { TODO_TEMP_SAVE_KEY } from "./constants.js";

export default function TodoForm({ $target, onSubmit, initialState }) {
  const $form = document.createElement('form');

  $target.appendChild($form);

  this.state = initialState;

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  }

  this.init = () => {
    $form.innerHTML = `
      <input type="text" placeholder="Add new todo..." />
      <button>Add</button>
    `
  }

  this.render = () => {
    const { isLoading } = this.state;
    if(isLoading){
      $form.querySelector('input').setAttribute('disabled', '');
    } else {
      $form.querySelector('input').removeAttribute('disabled');
    }
  }
  
  this.init()
  
  $form.addEventListener('submit', e => {
    e.preventDefault();
    
    const $input = $form.querySelector('input');
    const content = $input.value;
    
    onSubmit(content);
    $input.value = '';
    removeItem(TODO_TEMP_SAVE_KEY);
  })
  
  
  const $input = $form.querySelector('input');
  $input.value = getItem(TODO_TEMP_SAVE_KEY, '');
  console.log($input);
  
  $input.addEventListener('keyup', e => {
    console.log(e.target.value)
    setItem(TODO_TEMP_SAVE_KEY, e.target.value)
  })
}