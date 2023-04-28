const addSectionForm = document.getElementById('addSectionForm');

// Get the current URL
var currentUrl = window.location.href;

// Extract the ID parameter from the URL
var url = new URL(currentUrl);
var id = url.searchParams.get('id');

addSectionForm.addEventListener('submit', function(event) {
  event.preventDefault();

  //Check that all fields are filled
  if (addSectionForm.checkValidity()) {

    //get the values in the fields
    const name = document.getElementById('name').value;
    const description = document.getElementById('description').value;

    const data = {
      name: name,
      description: description,
      inventory: {
        inventory_id: id
        }
    };

    //turn into json the post to server
    const jsonData = JSON.stringify(data);
    postToSection(jsonData);

  }
});


function postToSection(jsonData){
    fetch('/api/v1/inventorySections', {
          method: 'POST',
          body: jsonData,
          headers: {
            'Content-Type': 'application/json'
          }
        })
          .then(response => response.json())
          .then(json => {
            console.log(json);
            window.location.href = './inventoryHome.html?id='+id;
          })
          .catch(error => {
            console.error(error);
        });
}