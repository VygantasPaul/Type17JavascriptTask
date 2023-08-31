const BASE_URL = 'https://64ec3372f9b2b70f2bf9f191.mockapi.io/ads_posts';
const url = new URL(window.location.href);
const advertisementId = url.searchParams.get("advertisementId");
const responseWrap = document.querySelector('.response');

const getInputsHtmlvalues = () => {
  const adPageTitle = document.getElementById('input-name');
  const adPagePrice = document.getElementById('input-price');
  const adPageLocation = document.getElementById('input-location');
  const adPageImage = document.getElementById('input-image');
  const adPageDescription = document.getElementById('input-description');
  
  return {
    adPageTitle,
    adPagePrice,
    adPageLocation,
    adPageImage,
    adPageDescription
  }
}
const { adPageTitle, adPagePrice, adPageLocation, adPageImage, adPageDescription } = getInputsHtmlvalues(); // desctruction

const fetchExistingAdsData = async () => {
  try {
    let response = await fetch(BASE_URL + '/' + advertisementId);
    if (response.ok) {
      const advertisement = await response.json();
      
      return advertisement;

    }
  } catch (error) {
    console.error(error);
    return false;
  }
};

const updateNewAdsOnServer = async (updatedAdvertisement) => {
  try {
    let response = await fetch(BASE_URL + '/' + advertisementId, {
      method: 'PUT',
      body: JSON.stringify(updatedAdvertisement),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    
    if (response.ok) {
      const putAdvertisement = await response.json();
      return putAdvertisement;
    } else {
      console.error('PUT request failed:', response.status, response.statusText);
      return false;
    }
  } catch (error) {
    console.error('Error sending PUT request:', error);
    return false;
  }
};
const toDisplayUpdatedData = (advertisement) => {   //  display old values to data input
  if (advertisement) {
    adPageTitle.value = advertisement.name;
    adPagePrice.value = advertisement.price;
    adPageLocation.value = advertisement.location;
    adPageImage.value = advertisement.photo;
    adPageDescription.innerText = advertisement.description;
    
    return advertisement;
  } else {
    return false;
  }
}; 

const toPutNewValuesOnObject = (advertisement) => {
  advertisement.name = adPageTitle.value; // display updated value to fields
  advertisement.price = adPagePrice.value; 
  advertisement.location = adPageLocation.value; 
  advertisement.photo = adPageImage.value; 
  advertisement.description = adPageDescription.value; 
}
 

const onCheckAdObject = (advertisement) => {
  if(advertisement) {
    const urlRegex = /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([\/\w .-]*)*\/?$/;
    const { name, price, location, description, photo } = advertisement;
    if (name === ''|| price === '' || location === '' || description === '' ){  // validation
      responseWrap.innerHTML = 'Privaloma uzpildyti visus laukus';
      return false; 
    } else if (isNaN(parseFloat(price))){   // check if is not a number
      responseWrap.innerHTML = 'Turi buti skaiciai';
      return false; 
    } else if (photo === '') {
      responseWrap.innerHTML = 'Paveikslelio laukas tuscias bet galite testi';
      setTimeout(()=>{
        window.location.replace("./details-page.html?advertisementId="+advertisement.id);
      },2000)
      return true; 
    }  else if (!urlRegex.test(photo)) {
      responseWrap.innerHTML = 'Paveikslelio nuoroda netinkama';
      return false;
    } else {
      responseWrap.innerHTML = 'Skelbimas sekmingai koreguotas'
      setTimeout(()=>{
        window.location.replace("./details-page.html?advertisementId="+advertisement.id);
      },2000)
      return true; 
    }
  } else {
    return false;
  }
}

const onPutAdObjectClick = async (e) => {
  e.preventDefault();

  const advertisement = await fetchExistingAdsData(); // Fetch the advertisement data
  if (advertisement) {
    toPutNewValuesOnObject(advertisement); // Update the object with new values
    
    const isValid = onCheckAdObject(advertisement);
    if (!isValid) {
      return; // Prevent further actions if validation fails
    }
    
    const putToAdObject = await updateNewAdsOnServer(advertisement);
    
    if (putToAdObject) {
      console.log('Updated Advertisement:', putToAdObject);
      toDisplayUpdatedData(advertisement);
    } else {
      console.error('Failed to update advertisement.');
    }
  }
};

document.querySelector('#btn-edit').addEventListener('click', onPutAdObjectClick);

const displayData = async () => {
  const advertisement = await fetchExistingAdsData();
  if((advertisement)){
    toDisplayUpdatedData(advertisement);
  }
};

displayData();