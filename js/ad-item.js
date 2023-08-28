
const BASE_URL = 'https://64ec3372f9b2b70f2bf9f191.mockapi.io/ads_posts';

const constructHtmlPage = () => {
  
}

const getAdObject = () => {
  
}

const deleteAdObject = () => {
  
}

const onDeleteAdObject = () => {
  
}

const onDeleteAdObjectCick = () => {
  
}

const displayData = async() => {
  const response = await fetch(BASE_URL);
  if(response.ok){
    const adsData = await response.json();
    toShowData(adsData)
  }
}

displayData();