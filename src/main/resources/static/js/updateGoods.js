// Get the current URL
var currentUrl = window.location.href;

// Extract the ID parameter from the URL
var url = new URL(currentUrl);
var id = url.searchParams.get('id');

var section_id = 0;

// Get all form elements
var nameInput = document.getElementById('name');
var amountInput = document.getElementById('amount');
var weightInput = document.getElementById('weight');

const updateGoodForm = document.getElementById('updateGoodForm');

// Send a GET request to the server
fetch('/api/v1/goods/' + id)
.then(response => response.json())
.then(data => {
    // Update the values of the HTML elements with the data from the server
    nameInput.value = data.name;
    amountInput.value = data.amount;
    weightInput.value = data.weight_per_unit;

    //Update the section_id variable
    section_id = data.section.section_id;
})
.catch(error => {
    console.error('There was a problem retrieving the data:', error);
});


updateGoodForm.addEventListener('submit', function(event) {
  event.preventDefault();

  //Check all elements are filled
  if (updateGoodForm.checkValidity()) {

  //Get all the values in the form
    const name = document.getElementById('name').value;
    const amount = document.getElementById('amount').value;
    const weight = document.getElementById('weight').value;

    const data = {
      name: name,
      amount: amount,
      weight_per_unit: weight
    };

    //Turn it into jsonData then send a patch request to server
    const jsonData = JSON.stringify(data);
    updateGood(jsonData);

  }
});


function updateGood(jsonData){
     // Send a PATCH request to the server
   fetch('/api/v1/goods/' + id, {
       method: 'PATCH',
       headers: {
           'Content-Type': 'application/json'
       },
       body: jsonData
   })
   .then(response => {
       if (!response.ok) {
           throw new Error('Network response was not ok');
       }

        //Go back to the goods page when done
       window.location = 'goodsPage.html?section_id='+section_id;
   })
   .catch(error => {
       console.error('There was a problem updating the inventory section:', error);
   });
}