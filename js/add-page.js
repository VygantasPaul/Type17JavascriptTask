  const BASE_URL = 'https://64ec3372f9b2b70f2bf9f191.mockapi.io/ads_posts';


  const alertMessages = (message, isSuccess)=>{
    const responseWrap = document.querySelector('.response');
    const alertResponseSuccess = document.createElement('div');
    const alertResponseError = document.createElement('div');
    alertResponseSuccess.setAttribute('class','alert-success')
    alertResponseError.setAttribute('class','alert-error')
    responseWrap.innerHTML = ''
    responseWrap.append(isSuccess ? alertResponseSuccess: alertResponseError)
    
    alertResponseSuccess.innerHTML = message;
    alertResponseError.innerHTML = message;
    alertResponseSuccess.style.borderColor = isSuccess ? 'green' : 'red'
    alertResponseSuccess.style.borderColor = isSuccess ? 'green' : 'red'
    
    alertResponseError.style.borderColor = isSuccess ? 'green' : 'red'
    alertResponseError.style.color = isSuccess ?  'green' : 'red'
  }
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
      const advertisements = await response.json();
      return advertisements;
      
    } catch (error){
      return false
    }
  }
  
  const checkAdPostValid = (advertisements) => {
    if(advertisements) {
      const urlRegex = /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([\/\w .-]*)*\/?$/;
      const { name, price, location, description, photo } = advertisements;
      if (name === ''|| price === '' || location === '' || description === '' ){  // validation
        alertMessages('Privaloma uzpildyti visus laukus', false)
        return false; 
      } else if (isNaN(parseFloat(price))){   // check if is not a number
        alertMessages('Kainos laukely turi buti tik skaiciai', false)
        return false; 
      } else if (photo === '') {
        alertMessages('Paveikslelio laukas tuscias bet galite testi ir ideti paveiksleli veliau', true)
        setTimeout(()=>{
          window.location.replace("./index.html");
        },2000)
        return true; 
      }  else if (!urlRegex.test(photo)) {
        alertMessages('Paveikslelio nuoroda netinkama',false)
        return false;
      } else {
        alertMessages('Skelbimas sekmingai koreguotas',true)
        setTimeout(()=>{
          window.location.replace("./index.html");
        },2000)
        return true; 
      }
    } else {
      return false;
    }
  }
  
  document.querySelector('form').addEventListener('submit', async(e)=>{
    e.preventDefault();
    const advertisement = getAdObject();   // asinging to object
    if (checkAdPostValid(advertisement)) {  // checking object validation if its true inserting ad calling insertAdPos
      const insertedAdvertisement = await insertAdPost(advertisement);  // 
      if (!insertedAdvertisement) {
        return false
      } 
    }
  })
  