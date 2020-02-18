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
    }
  })
})