import Inventory from "./model/inventory.js";
import InventorySection from "./model/inventorySection.js"

// Get the current URL
var currentUrl = window.location.href;

// Extract the ID parameter from the URL
var url = new URL(currentUrl);
var id = url.searchParams.get('id');


fetch("/api/v1/inventories/" + id).then(response => response.json())
                             .then(data => {

                             var inventory = new Inventory(data.inventory_id, data.max_goods, data.amount_of_goods, data.total_inventory_sales, data.sections);
                             createBarChart(inventory.maxGoods, inventory.amountOfGoods);
                             document.getElementById("totalSales").innerHTML = "Total Sales: " + data.total_inventory_sales;
                             });

fetch("/api/v1/inventorySections").then(response => response.json())
                             .then(data => {
                             data.forEach((inventorySectionData) => {

                             var inv_id = inventorySectionData.inventory.inventory_id;
                             var goods_size = inventorySectionData.goods.length;
                             var sectionId = inventorySectionData.section_id;

                             if (inv_id == id) {

                             // Get the parent element by .list-group
                             var listGroup = document.querySelector(".list-group");

                             // Create the <a> element with its contents
                             var link = '<a href="goodsPage.html?section_id='+sectionId+'" class="list-group-item list-group-item-action flex-column align-items-start">' +
                                          '<div class="d-flex w-100 justify-content-between">' +
                                            '<h5 class="mb-1">' + inventorySectionData.name + '</h5>' +
                                          '</div>' +
                                          '<p class="mb-1">' + inventorySectionData.description + '</p>' +
                                          '<small>Goods in section: ' + goods_size+'</small>' +
                                        '</a>';

                             // Add the link to the parent element
                             listGroup.innerHTML += link;

                             }


                             });

                             });



function createBarChart(max_goods, amount_of_goods, total_inventory_sales) {

      var ctx = document.getElementById("myChart").getContext("2d");
      var myChart = new Chart(ctx, {
        type: "bar",
        data: {
          labels: ["Amount Of Goods", "Max Goods"],
          datasets: [{
            label: ("Inventory " + id),
            data: [amount_of_goods, max_goods],
            backgroundColor: "rgba(255, 99, 132, 0.2)",
            borderColor: "rgba(255, 99, 132, 1)",
            borderWidth: 1
          }]
        },
        options: {
          scales: {
            yAxes: [{
              ticks: {
                beginAtZero: true
              }
            }]
          }
        }
      });

};

