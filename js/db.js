//real-time listener

db.collection('todo-items').onSnapshot((snapshot) => {
  snapshot.docChanges().forEach((change) => {
    console.log(change, change.doc.data(), change.doc.id)
  })
})