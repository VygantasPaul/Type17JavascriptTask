const BASE_URL = 'https://64ec3372f9b2b70f2bf9f191.mockapi.io/ads_posts';
const url = new URL(window.location.href);
const advertisementId = url.searchParams.get("advertisementId");
const responseWrap = document.querySelector('.response');

const toDisplayData = (advertisement) => {
  if (advertisement) {
    const adPageTitle = document.getElementById('input-name');
    adPageTitle.setAttribute('value', advertisement.name);
    
    const adPagePrice = document.getElementById('input-price');
    adPagePrice.setAttribute('value', advertisement.price);
    
    const adPageLocation = document.getElementById('input-location');
    adPageLocation.setAttribute('value', advertisement.location);
    
    const adPageImage = document.getElementById('input-image');
    adPageImage.setAttribute('value', advertisement.photo);
    
    const adPageDescription = document.getElementById('input-description');
    adPageDescription.innerText = advertisement.description;
    
    return advertisement;
  } else {
    return null;
  }
};

const fetchExistingData = async () => {
  try {
    let response = await fetch(BASE_URL + '/' + advertisementId);
    if (response.ok) {
      const advertisement = await response.json();
      return advertisement;
    }
  } catch (error) {
    console.error(error);
    return null;
  }
};

const updateAdvertisementOnServer = async (updatedAdvertisement) => {
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
      return null;
    }
  } catch (error) {
    console.error('Error sending PUT request:', error);
    return null;
  }
};

const onPutAdObjectClick = async (e) => {
  e.preventDefault();
  
  const advertisement = await fetchExistingData(); // Fetch the advertisement data
  
  if (advertisement) {
    const adPageTitle = document.getElementById('input-name').value;
    const adPagePrice = document.getElementById('input-price').value;
    const adPageLocation = document.getElementById('input-location').value;
    const adPageImage = document.getElementById('input-image').value;
    const adPageDescription = document.getElementById('input-description').value;

    console.log(advertisement)
    
    advertisement.name = adPageTitle; // Modify the name property directly
    advertisement.price = adPagePrice; 
    advertisement.location = adPageLocation; 
    advertisement.image = adPageImage; 
    advertisement.description = adPageDescription; 

    const putAdObject = await updateAdvertisementOnServer(advertisement);
    console.log('Updated Advertisement:', putAdObject);
    toDisplayData(advertisement);
  }
};

document.querySelector('#btn-edit').addEventListener('click', onPutAdObjectClick);

const displayData = async () => {
  const advertisement = await fetchExistingData();
  toDisplayData(advertisement);
};

displayData();
