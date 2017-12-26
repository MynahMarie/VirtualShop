var nodes = document.querySelectorAll('.cart');

nodes.forEach(function(node) {
  var id = node.id;
  var item = document.getElementById(id);
  item.addEventListener('click', function(e) {
    e.preventDefault();
    var data = [];
    var item_id = id.split('_')[1];
    data.push(item_id);
    fetchPOST('/auth/add', data, function(err, result) {
        if (err) {
          console.log(err);
        }
        else {
          console.log('xhr sent');
        }
    });
  })
})
