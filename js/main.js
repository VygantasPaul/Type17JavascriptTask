const BASE_URL = 'https://64ec3372f9b2b70f2bf9f191.mockapi.io/ads_posts';
const responseWrap = document.querySelector('.response');

const toShowData = (adsData) =>{
 
  const adsWrap = document.querySelector('.ads-home-page');
  const filterAdsData =  adsData.sort((a, b) => parseFloat(a.price.replace(/\./g, '')) - parseFloat(b.price.replace(/\./g, ''))); //filteted prices from lowest

  filterAdsData.forEach(item => {  

    const adsInnerWrap = document.createElement('a')
    adsInnerWrap.setAttribute('class','ad-item')
    adsInnerWrap.setAttribute("href","./details-page.html?advertisementId="+item.id)
    
    const adsInfoBox = document.createElement('div')
    adsInfoBox.setAttribute('class','ads-info-box')
    adsInnerWrap.append(adsInfoBox)
    
    const adTitle = document.createElement('h2')
    adTitle.setAttribute('class','ads-title')
    adTitle.innerHTML = item.name
    
    const adPrice = document.createElement('h4')
    adPrice.setAttribute('class','ads-price')
    adPrice.innerHTML = item.price + '$'
    
    const adImg = document.createElement('img')
    adImg.setAttribute('class','ads-img')
    adImg.setAttribute('src',item.photo)
    
    adsWrap.append(adsInnerWrap) 
    
    adsInnerWrap.append(adImg) // Image wrap
    
    adsInnerWrap.append(adsInfoBox) /// Text box wrap
    
    adsInfoBox.append(adTitle,adPrice)   

  });
  
}

const displayData = async() => {
  const response = await fetch(BASE_URL);
  try {
    if(response.ok){
      const adsData = await response.json();
      toShowData(adsData)
    }
  } catch (error){
    console.log(error)
  }
}

displayData();