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
<p id="advise"> Advise: ${countryData.advise.UA.advise}</p>
<p id="currency"> Currency: ${countryData.currency.name}</p>
<p id="currency">Currency Rate: ${countryData.currency.rate}</p>
<p id="calling-code"> Calling Code: ${countryData.telephone.calling_code}</p>


`);

}

/*<p id="vaccination-req">${countryData.vaccination}</p>
<p id="weather">${countryData.Rated}</p>*/