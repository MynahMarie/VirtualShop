function fetchGET(url, callback) {
  var xhr = new XMLHttpRequest();
  console.log('inside GET');
  xhr.onreadystatechange = function() {
    if (xhr.readyState === 4 && xhr.status === 200) {
      console.log(xhr.responseText);
      callback(null, JSON.parse(xhr.responseText));
    } else if (xhr.readyState === 4 && xhr.status !== 200) {
      console.log(xhr.readyState, xhr.status);
      callback(xhr.status);
    } else {
      console.log(xhr.readyState, xhr.status);
    }
  };
  xhr.open('GET', url, true);
  xhr.send();
}

function fetchPOST(url, data, callback) {
  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function() {
    if (xhr.readyState == 4 && xhr.status !== 200) {
      callback(xhr.responseText);
    } else if (xhr.readyState == 4 && xhr.status === 200) {
      callback(null, xhr.responseText);
    }
  };
  xhr.open('POST', url);
  xhr.send(data);
}
