const form = document.querySelector('form');
const card = document.querySelector('.card');

const updateCity = async (city) => {

    const city_data = await getCity(city);
    const weather = await getWeather(city_data.Key);
    
    return {city_data , weather};
}

const updateUI = async (data) => {

    card.classList.remove('d-none');

    let imgsrc = null;
    if(data.weather.IsDayTime){
        imgsrc = 'img/day.svg';  
    } 
    else{
        imgsrc = 'img/night.svg';
    }

    let iconsrc=`img/icons/${data.weather.WeatherIcon}.svg`;


    card.innerHTML = 
    `<img src=${imgsrc} alt="" class="card-img-top">
    <div class="card-body">
    <img src=${iconsrc} alt="" class="icon p-1 bg-light rounded-circle">
        <h3 class="card-title mt-2">${data.city_data.EnglishName}</h3>
        <h4 class="card-subtitle">${data.weather.WeatherText}</h4>
        <h1>${data.weather.Temperature.Metric.Value} <span>&deg;C</span></h1>
    </div>    
    ` ;
}

form.addEventListener('submit', (event)=>{
   
    event.preventDefault();
    city = form.cityname.value ;
    form.reset();

    updateCity(city)
        .then(data => {
            updateUI(data);
        })
        .catch(error => console.log(error));    

})