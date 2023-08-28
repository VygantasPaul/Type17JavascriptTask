
const BASE_URL = 'https://64ec3372f9b2b70f2bf9f191.mockapi.io/ads_posts';

const constructHtmlPage = () => {
  
  const adPageWrap = document.querySelector('.advertisement-page');
  adPageWrap.setAttribute('class','advertisement-page')
  
  const adPageWrapInner = document.createElement('div');
  adPageWrapInner.setAttribute('class','advertisement-page-inner')
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
  
  const adPageTitle = document.createElement('div')
  adPageTitle.setAttribute('class','ad-title')
  
  const adPageLocation = document.createElement('div')
  adPageLocation.setAttribute('class','ad-location')
  
  const adPagePrice = document.createElement('div')
  adPagePrice.setAttribute('class','ad-price')
  
  adPageWrapInner.append(adPageInfoWrap)
  
  adPageInfoWrap.append(adPageTitle,adPageLocation,adPagePrice)
  
}
constructHtmlPage();

const addAdObject = (adsData) => {
  console.log(adsData)


}

const deleteAdObject = () => {
  
  
}

const onDeleteAdObject = () => {
  
}

const onDeleteAdObjectCick = () => {
  
}

const displayData = async() => {
  let response = await fetch(BASE_URL);
  try {
    if(response.ok){
      const adsData = await response.json();
      addAdObject(adsData)
    }
  } catch (error) {
    console.log(error)
  }
}

displayData();