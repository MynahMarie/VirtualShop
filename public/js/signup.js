// SignIN Form Request
document.querySelector('.signIn').addEventListener('submit', function(e) {
  e.preventDefault();
  var data = [];
  var  username = document.getElementById('usernameSignIn').value;
  var pass = document.getElementById('passwordSignIn').value;
  data.push(username, pass);

  fetchPOST('/login', data, function(err, res) {
    if (err) {
      // console.log('error is: ', err);
      document.querySelector('#signInRules').textContent = "Invalid Username or Password";
    } else {
      // console.log('result is: ', res);
      window.location.href = '/auth/products';
    }
  })
});

// New User SignUP Form Request
document.querySelector('.signUp').addEventListener('submit', function(e) {
  e.preventDefault();
  if (
    document.querySelector('#passwordSignUp').value !==
    document.querySelector('#confirm').value
  ) {
    document.querySelector('#rules').textContent = 'passwords do not match';
  } else {
      document.querySelector('#rules').textContent = '';
      var user = document.querySelector('#usernameSignUp').value;
      var pass = document.querySelector('#passwordSignUp').value;
      var first = document.querySelector('#firstName').value;
      var last = document.querySelector('#lastName').value;
      var email = document.querySelector('#email').value;

      //Return a message to the user if password is too short.
      if (pass.length < 8) {
        document.querySelector('#rules').textContent = "Password should be at least 8 characters.";
      } else if (user.length < 6) {
        document.querySelector('#rules').textContent = "Username should be at least 6 characters.";
      }
      else {
      var query = [];
      query.push(user, pass, first, last, email);

      fetchPOST('/newuser', query, function(err, res) {
        if (err) {
          document.querySelector('#rules').textContent =
            'username already exists';
        } else {
          alert('Thank you for signing up! You receive a 500$ certificate :)');
          window.location.href = '/auth/products';
        }
      });
    }
  }
});
