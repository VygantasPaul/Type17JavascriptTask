
const BASE_URL = 'https://64ec3372f9b2b70f2bf9f191.mockapi.io/ads_posts';
const url = new URL(window.location.href)
const advertisementId = url.searchParams.get("advertisementId")

const constructHtmlPage = () => {
  
  const adPageWrap = document.querySelector('.ads-page');
  adPageWrap.setAttribute('class','ads-page')
  
  const adPageWrapInner = document.createElement('div');
  adPageWrapInner.setAttribute('class','ads-page-inner')
  adPageWrap.append(adPageWrapInner)
  
  const adPageImageWrap = document.createElement('div');
  adPageImageWrap.setAttribute('class','image-wrapper')
  
  const adImage = document.createElement('img');
  adImage.setAttribute('src','')
  adImage.setAttribute('alt','')
  adImage.setAttribute('id','image')
  adPageWrapInner.append(adPageImageWrap)
  adPageImageWrap.append(adImage)
  
  const adPageInfoWrap = document.createElement('div');
  adPageInfoWrap.setAttribute('class','info-wrapper')
  
  const adPageTitle = document.createElement('h2')
  adPageTitle.setAttribute('class','ad-title')
  
  const adPageLocation = document.createElement('h3')
  adPageLocation.setAttribute('class','ad-location')
  
  const adPagePrice = document.createElement('h4')
  adPagePrice.setAttribute('class','ad-price')
  
  const buttonDelete = document.createElement('a')
  buttonDelete.setAttribute('class','btn-delete')
  buttonDelete.setAttribute('href','#')
  buttonDelete.textContent = "Istrinti"
  
  const adPageDescription = document.createElement('div')
  adPageDescription.setAttribute('class','ad-description')
  
  const pDescription = document.createElement('p')
  
  adPageDescription.append(pDescription)
  
  adPageWrapInner.append(adPageInfoWrap)
  
  adPageInfoWrap.append(adPageTitle,adPageLocation,adPagePrice,adPageDescription,buttonDelete)
  
}
constructHtmlPage();

const addToScreen = (advertisement) => {
  
  const adPageImageWrap = document.querySelector('#image')
  adPageImageWrap.setAttribute('src',advertisement.photo)
  adPageImageWrap.setAttribute('alt',advertisement.name)
  
  const adPageTitle = document.querySelector('.ad-title')
  adPageTitle.innerHTML = `<strong>Pavadinimas:</strong> ${advertisement.name}`
  
  const adPagelocation = document.querySelector('.ad-location')
  adPagelocation.innerHTML = `<strong>Lokacija:</strong>  ${advertisement.location}`
  
  const adPagePrice = document.querySelector('.ad-price')
  adPagePrice.innerHTML = `<strong>Kaina: </strong> ${advertisement.price}`
  
  const adPageDescription = document.querySelector('p')
  adPageDescription.innerHTML = `<strong>Aprasymas: </strong> ${advertisement.description}`
  
}

const getAdvertisement = async() => {
  let response = await fetch(BASE_URL + '/' + advertisementId);
  
  try {
    if(response.ok){
      const advertisement = await response.json();
      console.log(advertisement)
      return(advertisement)
      
    }
  } catch (error) {
    console.log(error)
  }
}

const deleteAdObject = () => {
  
  
}

const onDeleteAdObject = () => {
  
}

const onDeleteAdObjectClick = () => {
  
}

const displayData = async() => {
  const advertisement = await getAdvertisement();
  addToScreen(advertisement)
  
}

displayData();