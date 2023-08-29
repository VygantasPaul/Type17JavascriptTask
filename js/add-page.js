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
      const advertisements = await response.json();
      return advertisements;
      
    } catch (error){
      return false
    }
  }

  const checkAdPostValid = (advertisements) => {
    if(advertisements){
      const { name, price, location, description, photo } = advertisements; //destruction

      if (name === ''|| price === '' || location === '' || description === '' || photo === ''){  // validation
        responseWrap.innerHTML = 'Privaloma uzpildyti visus laukus';
        return false; 
      } else if (isNaN(parseFloat(price))){   // check if is not a number
        responseWrap.innerHTML = 'Turi buti skaiciai';
        return false; 
      } else {
        responseWrap.innerHTML = 'Skelbimas sekmingai idetas'
        setTimeout(()=>{
          window.location.replace("./index.html");
        },2000)
        return true; 
      }
      
    } else {
      return false
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
