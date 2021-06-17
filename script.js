
const token = sessionStorage.getItem("token");
const usernameInp = sessionStorage.getItem("username")
  const query = `
    query { 
      user(login:"${usernameInp}"){
        name
        avatarUrl
        url
        repositories(first:20, orderBy:{field:NAME, direction:ASC}){
          totalCount
          nodes{
            name
            url
            updatedAt
            description
            forkCount
            stargazerCount
            primaryLanguage {
              name
            }
          }
        }
      }
    }
  `

const baseUrl = "https://api.github.com/graphql"

const headers = {
  "Content-type": "application/json",
  "Authorization":`Bearer ${token}`
}

async function fetchData(url) {
  try {
    const response = await fetch(url, {
      method:"POST",
      headers:headers,
      body:JSON.stringify({query})
    })
    const newData = await response.json() 
    console.log(newData)
    renderUI(newData.data.user)    
  }
  catch(err) {
    console.log(error)
  }
}
fetchData(baseUrl);

const renderUI=(data)=>{
  let avatar = document.querySelector('.avatar')
  avatar.src = data.avatarUrl

  let profileName = document.querySelector('.profile-name')
  profileName.textContent = data.name

  let phoneUserName = document.querySelector(".phone-username")
  phoneUserName.textContent = `${usernameInp}`;

  let profileLink = document.querySelector('.profileLink')
  profileLink.href = data.url

  let smallPics = document.querySelectorAll('.small-pics')
  smallPics.forEach(smallPic=>{
    smallPic.src = data.avatarUrl
  })

  const repoCount = document.querySelector('.repo-count')
  repoCount.textContent = `${data.repositories.totalCount} results for public repositories`

  const repositories = document.querySelector('.repositories')
  const repoContainer = document.createElement('DIV')
    
  data.repositories.nodes.map(repository=>{
    let checker = {
      name:""
    }
    if(repository.primaryLanguage === null) {
      repository.primaryLanguage ={...checker}
    }    

    const bigRepoCont = document.createElement("DIV")
    bigRepoCont.classList.add("bigRepoCont")
    

    const repositoryCont = document.createElement('DIV')
    repositoryCont.classList.add("repositoryCont")

    const repositoryName = document.createElement('P')
    repositoryName.classList.add("repo-name")
    repositoryName.textContent = repository.name
    const repDescription = document.createElement('P')
    repDescription.classList.add("repo-description")
    repDescription.textContent = repository.description

    const starButtonCont = document.createElement("DIV")
    const starButton = document.createElement("BUTTON")
    starButton.innerHTML = `<span><i class="far fa-star transparent"></i><span> Star`
    starButtonCont.classList.add('star-button-cont')
    starButton.style.padding = "2px 3px"
    starButtonCont.appendChild(starButton)

    const detailsCont = document.createElement('DIV')
    detailsCont.classList.add("details")
    
    let primaryLanguageCont = document.createElement('DIV')
    primaryLanguageCont.classList.add("details-cont")
    let primarySpan = document.createElement("SPAN")
    let primaryClasses = ["fa", "fa-circle", "small-details"]
    let primaryI = document.createElement("I")
    primaryI.classList.add(...primaryClasses)
    if (repository.primaryLanguage.name === "JavaScript") {
      primaryI.classList.add("red")
    }
    else if(repository.primaryLanguage.name === "HTML") {
      primaryI.classList.add("yellow")
    }
    else {
      primaryI.classList.add("blue")
    }
    primarySpan.appendChild(primaryI)
    let primaryLanguage = document.createElement("P")
    primaryLanguage.textContent = repository.primaryLanguage.name
    if(repository.primaryLanguage.name == "") {
      primarySpan.style.display = "none"
    }
    else {
      primaryLanguageCont.appendChild(primarySpan)
    }
    primaryLanguageCont.appendChild(primaryLanguage)


    let forkCountCont = document.createElement("DIV")
    forkCountCont.classList.add("details-cont")
    let forkSpan = document.createElement("SPAN")
    let forkSpanClasses = ["fa", "fa-code-branch"]
    let forki = document.createElement("I")
    forki.classList.add(...forkSpanClasses)
    forkSpan.appendChild(forki)
    let forkCount = document.createElement('P')
    forkCount.textContent = repository.forkCount
    forkCountCont.appendChild(forkSpan)
    forkCountCont.appendChild(forkCount)

    let stargazerCont = document.createElement("DIV")
    stargazerCont.classList.add("details-cont")
    let stargazerSpan = document.createElement("SPAN")
    let starClasses = ["far", "fa-star", "transparent"]
    let starI = document.createElement("I")
    starI.classList.add(...starClasses)
    stargazerSpan.appendChild(starI)
    let stargazer= document.createElement("P")
    stargazer.textContent = repository.stargazerCount
    stargazerCont.appendChild(stargazerSpan)
    stargazerCont.appendChild(stargazer)


    let updatedAtCont = document.createElement("DIV")
    updatedAtCont.classList.add("details-cont", "special-details-cont")
    let updatedAt = document.createElement('P')
    let currentDate = new Date(repository.updatedAt)
    let changedDate = currentDate.toDateString();
    const finalEdit = changedDate.slice(4, 15)
    updatedAt.textContent = `Updated on ${finalEdit}`;
    updatedAtCont.appendChild(updatedAt)

    
    
    detailsCont.appendChild(primaryLanguageCont)
    detailsCont.appendChild(stargazerCont)
    detailsCont.appendChild(forkCountCont)
    detailsCont.appendChild(updatedAtCont)
    


    repositoryCont.appendChild(repositoryName)
    repositoryCont.appendChild(repDescription)
    repositoryCont.appendChild(detailsCont)

    bigRepoCont.appendChild(repositoryCont)
    bigRepoCont.appendChild(starButtonCont)

    repoContainer.appendChild(bigRepoCont)
    repositories.appendChild(repoContainer)
  })
}

fetchData()

const navbar = document.querySelector(".nav-bar")
const burger = document.querySelector(".burger")
burger.addEventListener("click", ()=>{
  navbar.classList.toggle("nav-active")
  burger.classList.toggle("toggle")
})

const search = document.querySelector(".search")
const searchCont = document.querySelector(".search-cont")

search.addEventListener("click", ()=>{
  if(search === document.activeElement) {
    searchCont.classList.add("width")
  }
  else {
    searchCont.classList.remove("width")
  }
})