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
    }
  })
})