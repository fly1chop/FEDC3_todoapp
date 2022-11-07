
# Todo App w/ Vanilla js
A simple todo list application featuring `fetch` and `history` API with pure vanilla javaScript 🍦

## Features
- Fetch todo list by user
- Add/delete todos and saved to user

## API Reference
#### URL
```http
 https://kdt-frontend.todo-api.programmers.co.kr/users
```

#### Data structure
```javascript
{
  "_id": 할 일의 고유값. 숫자와 문자가 섞여있는 문자로 되어있음,
  "content": 할 일 text,
  "isCompleted": 할 일의 완료여부
}
```

#### Get User
```javascript
  fetch('https://kdt-frontend.todo-api.programmers.co.kr/users').then()...
```

#### Get Todo List
```javascript
  fetch('https://kdt-frontend.todo-api.programmers.co.kr/username').then()...
```

## Architecture
![App Architecture](/App_Structure.png?raw=true)

## Roadmap (by component)
### TodoList
- [ ]  Fetch selected user's todo list from API
- [ ]  Add/Delete todos
- [ ]  onClick, toggle todo completed status

### TodoForm
- [ ]  Fetch selected user's todo list from API
- [ ]  Add/Delete todos
- [ ]  onClick, strike through for completed todo

### UserList
- [ ]  Fetch selected user's todo list from API
- [ ]  Add/Delete todos
- [ ]  onClick, strike through for completed todo

- Fetch user's todo list from API
- Add/Delete todos with optimistic update
- block input field during loading -> during loading, if user adds new item, it will collide with server information
- saving input value (in case it was not fully saved in server) using localStorage
  - due to disabling input during initialization, addeventlistener does not work -> disabled elements don't fire mouse events
  -> take out disabling action into separate function outside of init() render.
  
  (https://stackoverflow.com/questions/3100319/event-on-a-disabled-input)
  (https://blog.pengoworks.com/index.cfm/2010/4/23/Attaching-mouse-events-to-a-disabled-input-element)