// console.log('well this works')
// var x = document.querySelectorAll('.bluebutton')
// console.log(x)
// x.forEach(function(y) {
//   y.style.backgroundColor = 'green'
// })

var createForm = document.querySelector('#createForm')
var createButton = document.querySelector('#createButton')
// var completeTodo = document.querySelector('.completeTodo')
// var completeCheckBox = document.querySelector('.completeCheckBox')

createButton.addEventListener('click', function () {
  createForm.submit()
  // window.alert('yes')
})

// completeCheckBox.addEventListener('click', function () {
//   completeTodo.submit()
// })
