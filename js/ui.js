const todoitems = document.querySelector('.todos');

document.addEventListener('DOMContentLoaded', function() {
  // nav menu
  const menus = document.querySelectorAll('.side-menu');
  M.Sidenav.init(menus, {edge: 'right'});
  // add recipe form
  const forms = document.querySelectorAll('.side-form');
  M.Sidenav.init(forms, {edge: 'left'});
});

//render todo data
const renderTodo = (data, id) => {
  const html = `
  <div class="card-panel todo white row" data-id="${id}">
    <label class="valign-wrapper">
      <input type="checkbox" class="filled-in" checked="checked" />
      <span></span>
    </label>
    <div class="todo-details">
      <div class="todo-title">${data.title}</div>
      <div class="todo-description">${data.description}</div>
    </div>
    <div class="todo-delete">
      <i class="material-icons" data-id="${id}">delete_outline</i>
    </div>
  </div>
  `;

  todoitems.innerHTML += html;
}