
# Todo App w/ Vanilla js
A simple todo list SPA featuring `fetch` and `history` API with pure vanilla javaScript π¦

## Features
- Fetch todo list by selected user
- Add/delete todos and saved to user
- Add new user

#### Data structure
```javascript
{
  "_id": ν  μΌμ κ³ μ κ°. μ«μμ λ¬Έμκ° μμ¬μλ λ¬Έμλ‘ λμ΄μμ,
  "content": ν  μΌ text,
  "isCompleted": ν  μΌμ μλ£μ¬λΆ
}
```

## Architecture
![App Architecture](/App_Structure.png?raw=true)

## Roadmap (by component)
### TodoList
- [ ]  Fetch selected user's todo list from API
- [ ]  Add/Delete todos
- [ ]  onClick, toggle todo completed status

### TodoForm
- [ ]  Render input form
- [ ]  Block during initial user's todo list
- [ ]  Local store input value until submit 

### UserList
- [ ]  Fetch list of users from API
- [ ]  Render user's todo list onSelect
- [ ]  Add new username
  - If new user, render user list after first todo added

## What I learned
#### Optimistic update
- Applied optimistic UI update during asynchronous fetch API calls for improved experience
- If user tries to add new todo item while loading, server information will collide with optimistic UI;
  - Disabled input form during initial user's todo list render;
  - However, I ran into a small challenge where disabled elements aren't listened for event fires; therefore, I extracted this process into a separate function and rendered after initial state change