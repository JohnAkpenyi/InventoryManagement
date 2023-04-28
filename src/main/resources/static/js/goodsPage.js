// Get the current URL
var currentUrl = window.location.href;

// Extract the ID parameter from the URL
var url = new URL(currentUrl);
var id = url.searchParams.get('section_id');
var inv_id = 0;
var inv_sold = 0;

const addGoodsLink = document.getElementById('addGoodsPage');
addGoodsLink.setAttribute('href', 'addGoods.html?id='+id);


fetch("/api/v1/inventorySections/" + id).then(response => response.json())
     .then(data => {

        inv_id = data.inventory.inventory_id;

         var goodIdArray = []

         goodIdArray = data.goods;

         goodIdArray.forEach((x) => {

         fetch("/api/v1/goods/" + x.good_id).then(goodsResponse => goodsResponse.json())
               .then(goodsData => {

               const totalWeight = goodsData.weight_per_unit * goodsData.amount;

                //append each good to to the table
               const body = document.querySelector('tbody');
               const newRowHtml = '<tr><td>'+ goodsData.name +'</td><td>'+ goodsData.amount +'</td><td>'+
                                 goodsData.weight_per_unit +'</td><td>' + totalWeight + '</td>'+ '<td>'+
                                 '<button><i class="fa fa-edit fa-2x" data-units="'+ goodsData.amount + '" data-goodId="' + x.good_id +
                                 '" aria-hidden="true" onclick="editGood(this)"></i></button>'+
                                 '<button><i class="fa fa-trash fa-2x" data-units="'+
                                 goodsData.amount + '" data-goodId="' + x.good_id +
                                 '" aria-hidden="true" onclick="deSleteGood(this)"></i></button>'+
                                 '<button><i class="fa fa-plus fa-2x" data-units="'+
                                 goodsData.amount +'" data-goodId="' + x.good_id + '" aria-hidden="true" onclick="sellGood(this)"></i></button>'+
                               '</td>'+
                               '</tr>';

               body.insertAdjacentHTML('beforeend', newRowHtml);

               });

         });

         // Send a Get request to the server
          fetch('/api/v1/inventories/' + inv_id)
          .then(response => response.json())
          .then(data => {
            inv_sold = data.total_inventory_sales;
          });

     });



 function editGood(button) {
   var goodId = button.getAttribute('data-goodId');

   //go to edit page
   window.location = 'updateGoods.html?id='+goodId;
 }

 function deleteGood(button) {
   var goodId = button.getAttribute('data-goodId');

   // Send a DELETE request to the server
     fetch('/api/v1/goods/' + goodId, {
       method: 'DELETE',
       headers: {
         'Content-Type': 'application/json'
       },
     })
     .then(response => {
       if (!response.ok) {
         throw new Error('Network response was not ok');
       }

       // Reload the current page
       location.reload();
     })
     .catch(error => {
       console.error('There was a problem deleting the good:', error);
     });

 }

 function sellGood(button) {
   var goodId = button.getAttribute('data-goodId');
   var units = button.getAttribute('data-units');

   //load prompt
      var input = prompt('Please enter a number between 1 and '+units+':');
          var number = parseInt(input);

          if (!isNaN(number) && number >= 1 && number <= parseInt(units)) {

                //delete good if all the units are being sold
              if (parseInt(units) == number){
               // Send a DELETE request to the server
                 fetch('/api/v1/goods/' + goodId, {
                   method: 'DELETE',
                   headers: {
                     'Content-Type': 'application/json'
                   },
                 })
                 .then(response => {
                   if (!response.ok) {
                     throw new Error('Network response was not ok');
                   }

                   //update the amount sold in the inventory
                   inv_sold += number;
                           var newUnits = parseInt(units) - number;

                           var inventory_body = {
                               total_inventory_sales: inv_sold,
                           };

                           // Send a PATCH request to the server
                           fetch('/api/v1/inventories/' + inv_id, {
                               method: 'PATCH',
                               headers: {
                                   'Content-Type': 'application/json'
                               },
                               body: JSON.stringify(inventory_body)
                           })
                           .then(response => {
                               if (!response.ok) {
                                   throw new Error('Network response was not ok');
                               }

                               //reload page
                               location.reload();
                           })
                           .catch(error => {
                               console.error('There was a problem updating the inventory section:', error);
                           });
                 })
                 .catch(error => {
                   console.error('There was a problem deleting the good:', error);
                 });

              }else{

              //Update amount sold in inventory
                inv_sold += number;
                var newUnits = parseInt(units) - number;

                var inventory_body = {
                    total_inventory_sales: inv_sold,
                };

                // Send a PATCH request to the server
                fetch('/api/v1/inventories/' + inv_id, {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(inventory_body)
                })
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }

                        //Update good units, taking some units away
                        var goods_body = {
                                amount: newUnits,
                            };

                            // Send a PATCH request to the server
                            fetch('/api/v1/goods/' + goodId, {
                                method: 'PATCH',
                                headers: {
                                    'Content-Type': 'application/json'
                                },
                                body: JSON.stringify(goods_body)
                            })
                            .then(response => {
                                if (!response.ok) {
                                    throw new Error('Network response was not ok');
                                }

                                //reload page
                                 location.reload();

                            })
                            .catch(error => {
                                console.error('There was a problem updating the inventory section:', error);
                            });

                })
                .catch(error => {
                    console.error('There was a problem updating the inventory section:', error);
                });

              }

          } else {
              console.log('User entered invalid number: ' + input);
          }

 }

function deleteInventorySection(){
  // Send a DELETE request to the server
     fetch('/api/v1/inventorySections/' + id, {
       method: 'DELETE',
       headers: {
         'Content-Type': 'application/json'
       },
     })
     .then(response => {
       if (!response.ok) {
         throw new Error('Network response was not ok');
       }

       window.location = 'inventoryHome.html?id='+inv_id ;
     })
     .catch(error => {
       console.error('There was a problem deleting the good:', error);
     });
}

function searchGoods() {
  const searchText = document.getElementById('searchBar').value.toLowerCase();
  const body = document.querySelector('tbody'); // replace with your actual selector

  // Remove all existing rows from the tbody
  body.innerHTML = '';

  fetch("/api/v1/inventorySections/" + id)
    .then(response => response.json())
    .then(data => {
      inv_id = data.inventory.inventory_id;

      var goodIdArray = []
      goodIdArray = data.goods;

      goodIdArray.forEach((x) => {
        fetch("/api/v1/goods/" + x.good_id)
          .then(goodsResponse => goodsResponse.json())
          .then(goodsData => {
            if (goodsData.name.toLowerCase().includes(searchText)) {

              const totalWeight = goodsData.weight_per_unit * goodsData.amount;

              const newRowHtml = '<tr><td>'+ goodsData.name
              +'</td><td>'+ goodsData.amount +'</td><td>'
              + goodsData.weight_per_unit +'</td><td>'
              + totalWeight + '</td>'+
              '<td>'+
              '<button><i class="fa fa-edit fa-2x" data-units="'+ goodsData.amount +'" data-goodId="' + x.good_id + '" aria-hidden="true" onclick="editGood(this)"></i></button>'+
              '<button><i class="fa fa-trash fa-2x" data-units="'+ goodsData.amount +'" data-goodId="' + x.good_id + '" aria-hidden="true" onclick="deleteGood(this)"></i></button>'+
              '<button><i class="fa fa-plus fa-2x" data-units="'+ goodsData.amount +'" data-goodId="' + x.good_id + '" aria-hidden="true" onclick="sellGood(this)"></i></button>'+
              '</td>'+
              '</tr>';

              body.insertAdjacentHTML('beforeend', newRowHtml);
            }
          });
      });

    });
}

