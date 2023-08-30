
const BASE_URL = 'https://64ec3372f9b2b70f2bf9f191.mockapi.io/ads_posts';
const url = new URL(window.location.href)
const advertisementId = url.searchParams.get("advertisementId")
const responseWrap = document.querySelector('.response');
const setImagesAttributes = (img, alt, photo) => {
  img.setAttribute('alt',alt);
  img.setAttribute('src',photo || 'images/icon-image-not-found-free-vector.jpg' );
}
const constructHtmlPage = () => {
  
  const adPageWrap = document.querySelector('.details-page');
  adPageWrap.setAttribute('class','details-page')
  
  const adPageWrapInner = document.createElement('div');
  adPageWrapInner.setAttribute('class','details-page-inner')
  adPageWrap.append(adPageWrapInner)
  
  const adPageImageWrap = document.createElement('div');
  adPageImageWrap.setAttribute('class','image-wrapper')
  
  const adImage = document.createElement('img');
  adImage.setAttribute('id','image')
  adPageWrapInner.append(adPageImageWrap)
  adPageImageWrap.append(adImage)     /// Image box wrap
  
  ////
  const adPageInfoWrap = document.createElement('div');
  adPageInfoWrap.setAttribute('class','info-wrapper')
  
  const adPageTitle = document.createElement('h2')
  adPageTitle.setAttribute('class','ad-title')
  
  const adPageLocation = document.createElement('h3')
  adPageLocation.setAttribute('class','ad-location')
  
  const adPagePrice = document.createElement('h4')
  adPagePrice.setAttribute('class','ad-price')
  
  const buttonDelete = document.createElement('button')
  buttonDelete.setAttribute('class','btn-delete')
  buttonDelete.setAttribute('type','button')
  buttonDelete.textContent = "Istrinti"

  const buttonEdit = document.createElement('a')
  buttonEdit.setAttribute('class','btn-edit')
  buttonEdit.textContent = "Koreguoti"

  const adPageDescription = document.createElement('div')
  adPageDescription.setAttribute('class','ad-description')
  
  const pDescription = document.createElement('p')
  
  adPageDescription.append(pDescription)
  
  adPageWrapInner.append(adPageInfoWrap)  
  
  adPageInfoWrap.append(adPageTitle, adPageLocation, adPagePrice, adPageDescription,buttonDelete,buttonEdit)   /// Info box wrap
  
}
constructHtmlPage();

const addToScreen = (advertisement) => {
  const adPageImageWrap = document.querySelector('#image')
  setImagesAttributes(adPageImageWrap,advertisement.name,advertisement.photo)

  const buttonEdit = document.querySelector('.btn-edit')
  buttonEdit.setAttribute('href','./edit-page.html?advertisementId='+advertisement.id)

  const adPageTitle = document.querySelector('.ad-title')

  adPageTitle.innerHTML = `<strong>Pavadinimas:</strong> ${advertisement.name}`
  
  const adPagelocation = document.querySelector('.ad-location')
  adPagelocation.innerHTML = `<strong>Lokacija:</strong>  ${advertisement.location}`
  
  const adPagePrice = document.querySelector('.ad-price')
  adPagePrice.innerHTML = `<strong>Kaina: </strong> ${advertisement.price}$`
  
  const adPageDescription = document.querySelector('p')
  adPageDescription.innerHTML = `<strong>Aprasymas: </strong> ${advertisement.description}`
  console.log(advertisement)
}

const getAdvertisement = async() => {
  let response = await fetch(BASE_URL + '/' + advertisementId);
  
  try {
    if(response.ok){
      const advertisement = await response.json();
      return(advertisement)
      
    }
  } catch (error) {
    console.log(error)
  }
}

const deleteAdObject = async() => {
  try {
    let response = await fetch(BASE_URL + '/' + advertisementId,{
      method: "DELETE"
    })
    if(response.ok){
      const data = await response.json();
      return(data)
      
    }
  } catch (error) {
    console.log(error)
  }
}

const checkDeleteAdObject = (data) => {
  if(data){
    responseWrap.innerHTML = 'Skelbimas sekmingai istrintas'
    setTimeout(()=>{
      window.location.replace("./index.html");
    },1000)
  }else {
    responseWrap.innerHTML = 'Veiksmo atlikti nepavyko'
    return false
  }
}
const onDeleteAdObjectClick = async(e) => {
  e.preventDefault();
  const deleteObj = await deleteAdObject();
  checkDeleteAdObject(deleteObj)
  
}
document.querySelector('.btn-delete').addEventListener('click', onDeleteAdObjectClick)

const displayData = async() => {
  const advertisement = await getAdvertisement();
  if(advertisement) {
    addToScreen(advertisement)
  }
}

displayData();