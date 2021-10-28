// Constants
const BASE_URL = 'https://travelbriefing.org/';
// State Variables
let countryData;
// Cached Element References
const $form = $('form');
// Event Listeners
$form.on('submit', handleSubmit);
// Functions

function handleSubmit (evt) {
    evt.preventDefault(); 
    console.log('clicked');
}