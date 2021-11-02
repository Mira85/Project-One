// Constants
const BASE_URL = 'https://travelbriefing.org/';
// State Variables
let countryData;
let country;
// Cached Element References
const $form = $('form');
const $inputCountry = $('#inputCountry');
/*const $main = $('main');*/
const $mainBox = $('#main-box')
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
    $mainBox.html(`
<section class="items"> 
        <div class="header">Warm Months</div>
        <div class="content"> ${hanldleTemperature()}</div>
        </section>
<section class="items"> 
        <div class="header">Advise</div>
        <div class="content"> ${countryData.advise.UA.advise}</div>
    </section>  
<section class="items">
        <div class="header">Currency</div>
        <div class="content"><p><b>Name:</b> ${countryData.currency.name}</p></div>
        <div class="content"><p><b>Rate:</b> ${countryData.currency.rate}</p></div>
    </section>
<section class="items"> 
    <div class="header">Telephone</div>
    <div class="content"><p><b>Calling-code:</b> ${countryData.telephone.calling_code}</p></div>
    <div class="content"><p><b>Ambulance:</b> ${countryData.telephone.ambulance}</p></div>
    <div class="content"><p><b>Police:</b> ${countryData.telephone.police}</p></div>
    </section>
<section class="items"> 
    <div class="header">Vaccination Requirement</div>
    <div id="vaccinationContent" class="content">${loopingVaccinationData()}</div> 
    </section>
<section class="items"> 
    <div class="header">Electricity</div>
    <div class="content"><p><b>Frequency:</b> ${countryData.electricity.frequency}</p></div>
    <div class="content"><p><b>Voltage:</b> ${countryData.electricity.voltage}</p></div>
    </section>

`);
}



function loopingVaccinationData() {
    let vaccinationData = "";
    if (countryData.vaccinations.length === 0) {
        return 'No data available'
    } else {
        countryData.vaccinations.forEach(function (element) {
            let elementData = `<p><b>${element.name}:</b> ${element.message}</p>`;
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


