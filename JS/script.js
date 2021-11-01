// Constants
const BASE_URL = 'https://travelbriefing.org/';
// State Variables
let countryData;
let country;
// Cached Element References
const $form = $('form');
const $inputCountry = $('#inputCountry');
const $main = $('main');
const $selectedCountry = $('#selectedCountry');
console.log($selectedCountry);
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
    $selectedCountry.html(`<h3>${countryData.names.name}</h3>`);
    $main.html(`
<section id="temperature"> <div class="header">Warm Months</div><div class="content"> ${hanldleTemperature()}</div></section>
<section id="advise"> 
        <div class="header">Advise</div>
        <div class="content"> ${countryData.advise.UA.advise}</div>
    </section>  
<section id="currency" class="subSection">
        <div class="header">Currency</div>
        <div class="content"> ${countryData.currency.name}</div>
        <div id="currencyRateHdr" class="header">Currency Rate</div>
        <div class="content"> ${countryData.currency.rate}</div>
    </section>
<section id="calling-code" class="subSection"> 
    <div class="header">Calling Code</div>
    <div class="content"> ${countryData.telephone.calling_code}</div>
    </section>
<section id="vaccination-req"> <div class="header">Vaccination Requirement</div><div class="content">${loopingVaccinationData()}</div> </section>

`);
}

let vaccinationData = "";

function loopingVaccinationData() {

    if (countryData.vaccinations.length === 0) {
        return 'No data available'
    } else {
        countryData.vaccinations.forEach(function (element) {
            let elementData = `<p>${element.name}: ${element.message}</p>`;
            vaccinationData = elementData + vaccinationData;
            console.log(elementData);
        })
    }
    return vaccinationData;
}



function hanldleTemperature() {
    let desiredTempMonths = "";
    let weatherObj = countryData.weather;
    for (const property in weatherObj) {
        console.log(property);
        let tempCel = (countryData.weather[property]);
        let tavg = parseFloat(tempCel.tAvg);
        // conversion of temperature values from celcius to farenheit
        tempFahr = Math.round(tavg * 9 / 5 + 32);
        if (tempFahr >= 60) {
            let warmMonths = `<p> ${property}</p>`;
            desiredTempMonths = desiredTempMonths + warmMonths;
        }

        console.log(tempFahr)
    }
    return desiredTempMonths

}


