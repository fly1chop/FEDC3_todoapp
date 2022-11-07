export default function UserList({ $target, initialState, onSelect }) {
  const $userList = document.createElement("div");

  $target.appendChild($userList);

  this.state = initialState;

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  this.render = () => {
    $userList.innerHTML = `
      <h1>Users</h1>
      <ul style="height: 250px; overflow: auto">
        ${this.state.map((username) => `<li data-username="${username}">${username}</li>`).join("")}
        <form>
          <input class="new-user" type="text" placeholder="add user" />
        </form>
      </ul>
    `;
  };

  this.render();

  $userList.addEventListener("click", (e) => {
    const $li = e.target.closest('li[data-username]');
    const { username } = $li.dataset;
    
    if(!$li) return;

    onSelect(username)
  });

  $userList.addEventListener('submit', e => {
    const $newUser = $userList.querySelector('input.new-user');

    const newUserValue = $newUser.value

    if(newUserValue.length > 1){
      onSelect(newUserValue);
      $newUser.value = '';
    } else {
      alert('User name is too short!')
    }

  })
}
