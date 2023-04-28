// Get the current URL
var currentUrl = window.location.href;

// Extract the ID parameter from the URL
var url = new URL(currentUrl);
var id = url.searchParams.get('id');

var amountOfGoods = 0;


fetch("/api/v1/inventories/" + id).then(response => response.json())
     .then(data => {

     var arrayOfGoodIds = [];

     data.sections.forEach((section) => {

        section.goods.forEach((good) =>{
            arrayOfGoodIds.push(good.good_id);
        });

     });

     //Get all goods after all the goods id's are gotten
     fetch("/api/v1/goods").then(response => response.json())
        .then(goodsData => {
            goodsData.forEach((x) =>{
                if(arrayOfGoodIds.includes(x.good_id)){
                    amountOfGoods = amountOfGoods + x.amount;
                }
            });

             //After the goods have been retrieved and the calculations are done, initialise the bar chart and update the total sales
             createBarChart(data.max_goods, amountOfGoods);
             document.getElementById("totalSales").innerHTML = "Total Sales: " + data.total_inventory_sales;
        });

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

             // Create the <a> element with sections for the inventory
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

function addNewSection(){
    window.location = "addInventorySection.html?id="+id;
}

function deleteInventory(){
  // Send a DELETE request to the server
     fetch('/api/v1/inventories/' + id, {
       method: 'DELETE',
       headers: {
         'Content-Type': 'application/json'
       },
     })
     .then(response => {
       if (!response.ok) {
         throw new Error('Network response was not ok');
       }

       //go to the home page
       window.location = 'index.html';
     })
     .catch(error => {
       console.error('There was a problem deleting the inventory:', error);
     });
}

function generateReport() {
    fetch('/api/v1/inventories/csv/' + id)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.blob();
        })
        .then(blob => {
            // Create a temporary link to the file
            const url = window.URL.createObjectURL(new Blob([blob]));

            // Create a link element and set its attributes
            const a = document.createElement('a');
            a.href = url;
            a.download = 'Inventory.csv';

            // Click the link to initiate the download
            document.body.appendChild(a);
            a.click();

            // Clean up the temporary link
            document.body.removeChild(a);
            window.URL.revokeObjectURL(url);
        })
        .catch(error => {
            console.error('Error:', error);
        });
}
