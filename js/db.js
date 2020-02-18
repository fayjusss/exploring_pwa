// enable offline data
db.enablePersistence()
  .catch(function(err) {
    if (err.code == 'failed-precondition') {
      // probably multible tabs open at once
      console.log('persistance failed');
    } else if (err.code == 'unimplemented') {
      // lack of browser support for the feature
      console.log('persistance not available');
    }
  });

//real-time listener

db.collection('todo-items').onSnapshot((snapshot) => {
  snapshot.docChanges().forEach((change) => {
    console.log(change, change.doc.data(), change.doc.id)
    if(change.type === 'added'){
      // add the document data to the web page
      renderTodo(change.doc.data(), change.doc.id);
    }
    if(change.type === 'removed'){
      // remove the document data to the web page
      removeTodo(change.doc.id);
    }
  });
});

// add new todo
const form = document.querySelector('form');
form.addEventListener('submit', evt => {
  evt.preventDefault();
  
  const todo = {
    name: form.title.value,
    description: form.description.value
  };

  db.collection('todo-items').add(todo)
    .catch(err => console.log(err));

  form.title.value = '';
  form.description.value = '';
});

// remove a todo
const todoContainer = document.querySelector('.todos');
todoContainer.addEventListener('click', evt => {
  if(evt.target.tagName === 'I'){
    const id = evt.target.getAttribute('data-id');
    //console.log(id);
    db.collection('todo-items').doc(id).delete();
  }
})