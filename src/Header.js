export default function Header({ $target, initialState }) {
  const $header = document.createElement('header');
  $target.appendChild($header);

  this.state = initialState;

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  }

  this.render = () => {
    const { username, isLoading } = this.state;
    
    if(!username) {
      $header.innerHTML = '';
      return
    }
    
    $header.innerHTML = 
    `<h2>${username[0].toUpperCase() + username.slice(1)}'s Todo List ${isLoading ? 'is loading...⏳' : ''}</h2>`
  }

  this.render();
}