console.log('well this works')
var x = document.querySelectorAll('.bluebutton')
console.log(x)
x.forEach(function(y) {
  y.style.backgroundColor = 'green'
})
