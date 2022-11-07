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
    $header.innerHTML = 
    `<h1>${username[0].toUpperCase() + username.slice(1)}'s Todo List ${isLoading ? 'is loading...⏳' : ''}</h1>`
  }

  this.render();
}