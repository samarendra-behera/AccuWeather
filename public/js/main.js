const submitBtn = document.getElementById('submitBtn');
const inputName = document.getElementById('inputName');
const cityName = document.getElementById('city_name');
const temp = document.getElementById('temp');
const tempStatus = document.getElementById('temp_status');
const dataHide = document.querySelector('.middle_layer');
const day = document.getElementById('day');
const date = document.getElementById('today_date');

const weathers = {
    Rain : `<i class="fa-solid fa-cloud-rain" style="color: #a4b0be"></i>`,
    Clear: `<i class="fa-solid fa-sun" style="color: #eccc68"></i>`,
    Clouds: `<i class="fa fa-cloud" style="color: #f1f2f6"></i>`
}
const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

const getInfo = async (e)=>{
    e.preventDefault()
    const city = inputName.value;
    if(city ===''){
        cityName.innerText= 'Plz write the name before search';
        dataHide.classList.add('data_hide');
    }
    else{
        try{
            const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=ad5b47816eeec3a9bc29556286ae6c77&units=metric`
            const response = await fetch(url);
            const data = await response.json()
            const arrData = [data];

            cityName.innerText = `${arrData[0].name}, ${arrData[0].sys.country}`

            temp.innerText = arrData[0].main.temp;

            if(weathers[arrData[0].weather[0].main] == undefined){
                tempStatus.innerHTML=`<i class="fa-solid fa-sun" style="color: #eccc68"></i>`
            }
            else{
                tempStatus.innerHTML = weathers[arrData[0].weather[0].main];
            }
            dataHide.classList.remove('data_hide');

        }catch(err){
            cityName.innerText= 'Plz enter the city name properly';
            dataHide.classList.add('data_hide');
            console.log(err);
        }
    }
}

const now = new Date; 
const dayGet = ()=>{
    const index = now.getDay();
    return days[index];
}
const monthGet = ()=>{
    const index = now.getMonth();
    return months[index]
}
day.innerText = dayGet();
date.innerText = `${now.getDate()}, ${monthGet()}`

submitBtn.addEventListener('click', getInfo);