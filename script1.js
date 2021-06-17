const submit = document.querySelector('.submit')
const usernameInp = document.querySelector('#username')
const issues = document.querySelector('.issues')

const token  = document.querySelector("#token")


submit.addEventListener('click', (e)=>{
  if(usernameInp.value === "") {
    e.preventDefault()
    issues.textContent = "username must be entered"
    setTimeout(()=>{
      issues.textContent = ""
    },3000)
  }
  else if (token.value === "") {
    e.preventDefault()
    issues.textContent = "please enter a valid token"
    setTimeout(()=>{
      issues.textContent = ""
    }, 3000)
  }
  else {
    sessionStorage.setItem('username', usernameInp.value)
    sessionStorage.setItem('token', token.value)
  }
})