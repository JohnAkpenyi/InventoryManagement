const addInventoryForm = document.getElementById('addInventoryForm');

addInventoryForm.addEventListener('submit', function(event) {
  event.preventDefault();

  //Check that all fields are filled
  if (addInventoryForm.checkValidity()) {

    //get the values in the fields
    const maxGoods = document.getElementById('maxGoods').value;

    const data = {
      max_goods: maxGoods,
      total_inventory_sales: 0
    };

    //turn into json the post to server
    const jsonData = JSON.stringify(data);
    postToInventory(jsonData);

  }
});


function postToInventory(jsonData){
    fetch('/api/v1/inventories', {
          method: 'POST',
          body: jsonData,
          headers: {
            'Content-Type': 'application/json'
          }
        })
          .then(response => response.json())
          .then(json => {
            console.log(json);
            window.location.href = './index.html';
          })
          .catch(error => {
            console.error(error);
          });
}