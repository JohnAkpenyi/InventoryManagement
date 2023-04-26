import InventorySection from "./model/inventorySection.js"
import Good from "./model/good.js";

// Get the current URL
var currentUrl = window.location.href;

// Extract the ID parameter from the URL
var url = new URL(currentUrl);
var id = url.searchParams.get('section_id');

const addGoodsLink = document.getElementById('addGoodsPage');
addGoodsLink.setAttribute('href', 'addGoods.html?section_id='+id);

fetch("/api/v1/inventorySections/" + id).then(response => response.json())
                             .then(data => {

                             var goodIdArray = []

                             goodIdArray = data.goods;


                             goodIdArray.forEach((x) => {

                             fetch("/api/v1/goods/" + x.good_id).then(goodsResponse => goodsResponse.json())
                                                                                       .then(goodsData => {

                                                                                       console.log(goodsData);

                                                                                       const totalWeight = goodsData.weight_per_unit * goodsData.amount;

                                                                                       const body = document.querySelector('tbody'); // replace with your actual selector
                                                                                       const newRowHtml = '<tr><td>'+ goodsData.name
                                                                                       +'</td><td>'+ goodsData.amount +'</td><td>'
                                                                                       + goodsData.weight_per_unit +'</td><td>'
                                                                                       + totalWeight +'</td> <td><button><i class="fa fa-edit fa-2x" aria-hidden="true"></i></button><button><i class="fa fa-trash fa-2x" aria-hidden="true"></i></button></td></tr>';

                                                                                       body.insertAdjacentHTML('beforeend', newRowHtml);


                                                                                       });




                             });






                             });