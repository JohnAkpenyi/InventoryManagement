import Inventory from "./model/inventory.js";

// Select the element with the list-group class
var listGroupElement = document.querySelector('.list-group');

function displayInventoryData(inventoryArray) {
  // Do something with the inventory data
  console.log(inventoryArray);
}


fetch("/api/v1/inventories").then(response => response.json())
                             .then(data => {

                             data.forEach((inventoryData) => {

                             var inventory = new Inventory(
                                  inventoryData.inventory_id,
                                  inventoryData.max_goods,
                                  inventoryData.amount_of_goods,
                                  inventoryData.total_inventory_sales,
                                  inventoryData.total_goods_ready_for_sale,
                                  inventoryData.total_goods_in_progress,
                                  inventoryData.total_goods_raw,
                                  inventoryData.sections
                                );

                                listGroupElement.innerHTML += '<a href="inventoryHome.html?id='+ inventory.inventoryId +'" class="list-group-item list-group-item-action" data-inventory-id="' + inventory.inventoryId + '">Inventory ' + inventory.inventoryId+'</a>';

                             })

                             })

