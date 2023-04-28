// Select the element with the list-group class
var listGroupElement = document.querySelector('.list-group');

var newInventoryButton = document.getElementById("addNewInventory");

newInventoryButton.onclick = function() {

    //open the addInventory page
  window.location.href = "addInventory.html";

};


//Get request for all the inventories
fetch("/api/v1/inventories").then(response => response.json())
     .then(data => {

         data.forEach((inventoryData) => {

                //Append a button which allows the user to see a full view of the inventory
                listGroupElement.innerHTML += '<a href="inventoryHome.html?id='+
                                                inventoryData.inventory_id +
                                                '" class="list-group-item list-group-item-action">Inventory ' +
                                                inventoryData.inventory_id +'</a>';

         })

     })

