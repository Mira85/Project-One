// Constants
const BASE_URL = 'https://travelbriefing.org/';

// State Variables
let countryData;
let country;

// Cached Element References
const $form = $('form');
const $inputCountry = $('#inputCountry');
const $mainBox = $('#main-box');
const $selectedCountry = $('#selectedCountry');

// Event Listener
$form.on('submit', handleSubmit);

// Functions
// handles the submit button
function handleSubmit(evt) {
    evt.preventDefault();
    country = $inputCountry.val();
    if (country === '') {
        alert('Enter Country Name')
    } else {
        $.ajax(`${BASE_URL}${country}?format=json`).then(function (data) {
            // Getting data which is a list and converting to an JS object
            countryData = JSON.parse(data);
            console.log(countryData)
            // success callback function
            render();
        }, function (error) {
            // failure callback function
            console.log(error);
        })
    }
}

//handles data from the JS object
function render() {
    $inputCountry.val('');
    $selectedCountry.html(`<h3>${countryData.names.name}</h3>`);
    $mainBox.html(`
        <section class='items'> 
            <div class='header'>Warm Months</div>
            <div>${hanldleTemperature()}</div>
        </section>
        <section class='items'> 
            <div class='header'>Advise</div>
            <div> ${countryData.advise.UA.advise}</div> </section>  
        <section class='items'>
            <div class='header'>Currency</div>
            <div><p><b>Name:</b> ${countryData.currency.name}</p></div>
            <div><p><b>Rate:</b> ${countryData.currency.rate}</p></div>
        </section>
        <section class='items'> 
            <div class='header'>Telephone</div>
            <div><p><b>Calling-code:</b> ${countryData.telephone.calling_code}</p></div>
            <div><p><b>Ambulance:</b> ${countryData.telephone.ambulance}</p></div>
            <div><p><b>Police:</b> ${countryData.telephone.police}</p></div>
        </section>
        <section class='items'> 
            <div class='header'>Vaccination Requirement</div>
            <div id="vaccinationContent">${loopingVaccinationData()}</div> 
        </section>
        <section class='items'> 
            <div class='header'>Electricity</div>
            <div><p><b>Frequency:</b> ${countryData.electricity.frequency}</p></div>
            <div><p><b>Voltage:</b> ${countryData.electricity.voltage}</p></div>
        </section>

`);
}

// Vaccination data is an Array, so a loop is required to get information
function loopingVaccinationData() {
    let vaccinationData = ('');
    if (countryData.vaccinations.length === 0) {
        return 'No data available';
    } else {
        countryData.vaccinations.forEach(function (element) {
            let elementData = `<p><b>${element.name}:</b> ${element.message}</p>`;
            vaccinationData = elementData + vaccinationData;
        })
    }
    return vaccinationData;
}

// This function gets the months which have warm temperature
function hanldleTemperature() {
    let desiredTempMonths = '';
    let weatherObj = countryData.weather;
    for (const property in weatherObj) {
        let tempCel = (countryData.weather[property]);
        // conversion from string to number
        let tavg = parseFloat(tempCel.tAvg);
        // conversion of temperature values from celcius to farenheit and rounding to integer
        tempFahr = Math.round(tavg * 9 / 5 + 32);
        if (tempFahr >= 65) {
            let warmMonths = `<p> ${property}</p>`;
            desiredTempMonths = desiredTempMonths + warmMonths;
        }
    }
    return desiredTempMonths;
}