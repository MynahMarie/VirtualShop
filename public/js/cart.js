var trashIcons = document.querySelectorAll('.fa-trash');

trashIcons.forEach(function(icon) {
  icon.addEventListener('click', function(e) {
    e.preventDefault();
    var row_id = icon.parentNode.parentNode.id;
    var data = [row_id.split('u')[1]];
    fetchPOST('/auth/delete', data, function(err, result) {
        if (err) {
          console.log(err);
        }
        else {
          console.log('xhr sent to delete');
          //Adjust total total amount
          var t_element = document.getElementById('cart_total');
          var p_element = document.getElementById('itemPrice_u' + row_id.split('u')[1]);
          adjustTotal(t_element, p_element);
          //Delete the relevant row in the table
          deleteRow(icon);
        }
    });
  })
})

document.getElementById('buyButton').addEventListener('click', function(e) {
  e.preventDefault();
  fetchGET('/auth/buy', function(err, success) {
    if (err === 403) {
      alert('Not enough funds!');
    } else if (err) {
    console.log('err is: ', err);
    } else {
    window.location.href = '/auth/products';
    console.log('results from buy: ', success);
    }
  });
  alert('Thank you for shopping with us!');
})

function deleteRow(element) {
	var index = element.parentNode.parentNode.rowIndex;
	document.querySelector('#items').deleteRow(index);
}

function adjustTotal(totalNode, priceNode) {
  var amount = parseFloat(totalNode.textContent.split('$')[0], 10).toFixed(2);
  var price = parseFloat(priceNode.textContent.split('$')[0], 10).toFixed(2);
  document.getElementById('cart_total').textContent = parseFloat(amount - price, 10).toFixed(2) + "$";
}
