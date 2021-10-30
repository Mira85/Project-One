// Constants
const BASE_URL = 'https://travelbriefing.org/';
// State Variables
let countryData;
let country;
// Cached Element References
const $form = $('form');
const $inputCountry = $('#inputCountry');
const $main = $('main');
// Event Listeners
$form.on('submit', handleSubmit);
// Functions

function handleSubmit(evt) {
    evt.preventDefault();
    country = $inputCountry.val();


    $.ajax(`${BASE_URL}${country}?format=json`).then(function (data) {
        // Getting data which is a list and converting to an JS object
        countryData = JSON.parse(data);
        // success callback function
        console.log(countryData);



        render();
    }, function (error) {
        // failure callback function
        console.log(error);

    })
}

function render() {
    $main.html(`
<h3>${countryData.names.name}</h3>
<div id="advise"> Advise: ${countryData.advise.UA.advise}</div>
<div id="currency"> Currency: ${countryData.currency.name}</div>
<div id="currency">Currency Rate: ${countryData.currency.rate}</div>
<div id="calling-code"> Calling Code: ${countryData.telephone.calling_code}</div>
<div id="vaccination-req"> Vaccination Requirement:${loopingVaccinationData()} </div>
<div id="temperature"> Temperature: ${hanldleTemperature()}</div>
`);
}

let vaccinationData= "";

function loopingVaccinationData() {
    
    if (countryData.vaccinations.length === 0) {
        return 'No data available'
    } else {
        countryData.vaccinations.forEach(function(element) {
        let elementData = `<p>${element.name}: ${element.message}</p>`; 
          vaccinationData = elementData + vaccinationData;
            console.log(elementData);
        }) 
    }
    return vaccinationData;
}



function hanldleTemperature (){
    let desiredTempMonths = "";
    let weatherObj = countryData.weather;
    for (const property in weatherObj) {
        console.log(property);
        let tempCel = (countryData.weather[property]); 
        let tavg = parseFloat(tempCel.tAvg);
        // conversion of temperature values from celcius to farenheit
        tempFahr = Math.round(tavg * 9/5 + 32);
        if (tempFahr >= 60 )  {
            let warmMonths = `<p> ${property}</p>`;
            desiredTempMonths = desiredTempMonths + warmMonths;
        }

        console.log(tempFahr)
    }
    return desiredTempMonths
 
} 
  

