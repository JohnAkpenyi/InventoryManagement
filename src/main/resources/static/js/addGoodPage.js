const addGoodForm = document.getElementById('addGoodForm');

// Get the current URL
var currentUrl = window.location.href;

// Extract the ID parameter from the URL
var url = new URL(currentUrl);
var id = url.searchParams.get('id');

addGoodForm.addEventListener('submit', function(event) {
  event.preventDefault();

  //Check that all fields are filled
  if (addGoodForm.checkValidity()) {

    //get the values in the fields
    const name = document.getElementById('name').value;
    const amount = document.getElementById('amount').value;
    const weight = document.getElementById('weight').value;

    const data = {
      name: name,
      amount: amount,
      weight_per_unit: weight,
      section: {
        section_id: id
        }
    };

    //turn into json the post to server
    const jsonData = JSON.stringify(data);
    postToGoods(jsonData);

  }
});



function postToGoods(jsonData){
    fetch('/api/v1/goods', {
          method: 'POST',
          body: jsonData,
          headers: {
            'Content-Type': 'application/json'
          }
        })
          .then(response => response.json())
          .then(json => {
            console.log(json);
            window.location.href = './goodsPage.html?section_id='+id;
          })
          .catch(error => {
            console.error(error);
        });
}

