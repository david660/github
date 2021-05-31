const submit = document.querySelector('.submit')
const usernameInp = document.querySelector('#username')
const issues = document.querySelector('.issues')


submit.addEventListener('click', (e)=>{
  if(usernameInp.value === "") {
    e.preventDefault()
    issues.textContent = "username must be entered"
  }
  else {
    sessionStorage.setItem('username', usernameInp.value)
  }
})