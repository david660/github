
const token = "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";
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

  let profileLink = document.querySelector('.profileLink')
  profileLink.href = data.url

  let smallPics = document.querySelector('.small-pics')
  smallPics.src = data.avatarUrl

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

    const repositoryCont = document.createElement('DIV')
    repositoryCont.classList.add("repositoryCont")

    const repositoryName = document.createElement('P')
    repositoryName.textContent = repository.name
    const repDescription = document.createElement('P')
    repDescription.textContent = repository.description

    const detailsCont = document.createElement('DIV')

    let primaryLanguage = document.createElement("P")
    primaryLanguage.textContent = repository.primaryLanguage.name

    let forkCount = document.createElement('P')
    forkCount.textContent = repository.forkCount

    let updatedAt = document.createElement('P')
    updatedAt.textContent = repository.updatedAt

  
    
    detailsCont.appendChild(primaryLanguage)
    detailsCont.appendChild(updatedAt)
    detailsCont.appendChild(forkCount)
    repositoryCont.appendChild(repositoryName)
    repositoryCont.appendChild(repDescription)
    repositoryCont.appendChild(detailsCont)
    repoContainer.appendChild(repositoryCont)
    repositories.appendChild(repositoryCont)
  })
}

fetchData()





