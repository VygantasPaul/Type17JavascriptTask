const BASE_URL = 'https://64ec3372f9b2b70f2bf9f191.mockapi.io/ads_posts';
const responseWrap = document.querySelector('.response');
const getAdObject = () => {
  const inputName = document.getElementById('input-name').value;
  const inputPrice = document.getElementById('input-price').value
  const inputLocation = document.getElementById('input-location').value
  const inputImage = document.getElementById('input-image').value
  const inputDescription = document.getElementById('input-description').value
  
  const advertisement = {
    name:inputName,
    price:inputPrice,
    location:inputLocation,
    photo:inputImage,
    description:inputDescription
  }
  return advertisement;
}

const insertAdPost = async(advertisement) => {
  try {
    let response = await fetch(BASE_URL,{
      method:"POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json", 
      },
      body:JSON.stringify(advertisement)
    })
    const data = await response.json();
    return data;
    
  } catch (error){
    console.log(error)
   
    return false
  }
  
}

const checkAdPostValid = (data) => {
  if(data){
    const { name,price,location, description } = data;
    if (name === ''|| price === '' || location === '' || description === ''){
      responseWrap.innerHTML = 'Privaloma uzpildyti visus laukus'
     
      return false;
    } else {
      responseWrap.innerHTML = 'Skelbimas sekmingai idetas'
      setTimeout(()=>{
        window.location.replace("./index.html");
      },2000)
    }
    
  } else {
   
    return false
  }
}

document.querySelector('form').addEventListener('submit', async(e)=>{
  e.preventDefault();
  const data = getAdObject();
  if (data){
    const checkValidation = await insertAdPost(data)
    checkAdPostValid(checkValidation)
  } else {
    return false
  }
})
