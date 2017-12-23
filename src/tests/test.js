const runDbBuild = require('./../db/db_build');
const test = require('tape');
const qs = require('querystring');
const dBConnect = require('../db/db_connection.js');

const displayItems = require('./../models/queries/displayItems');
const createUser = require('./../models/queries/createUser');
const userExist = require('./../models/queries/userExist');
const showHistory = require('./../models/queries/showHistory');

// Testing if tape is working
test("Is it working", (t) => {
  t.equals(1, 1, "one equals one");
  t.end();
});

test('Item IDs should be selected', t => {
  runDbBuild((err, res) => {
    if (err) {
      throw err;
    } else {
      const expected = [1, 2, 3, 4, 5];
      displayItems((error, results) => {
        if (error) {
          console.log(error);
        } else {
          // console.log(results);
          var actual = [];
          results.forEach(el => {
            actual.push(el.id);
          });
          t.deepEqual(actual, expected, 'Should return an array of item IDs.');
          t.end();
        }
      });
    }
  });
});

test('New user was created', t => {
  runDbBuild((err, res) => {
    if (err) throw err;
    else {
      const expected = 4;
      createUser(
        'tape',
        'tapefirst',
        'tapelast',
        'tapeemail',
        'tapepassword',
        (err, res) => {
          if (err) console.log('error creating user', err);
          else {
            const actual = res[0].id;
            t.deepEqual(actual, expected, 'should return the new user ID');
            t.end();
          }
        }
      );
    }
  });
});

test('Check if user exists', (t) => {
  runDbBuild((err, res) => {
    if (err) throw err;
    else {
      const expected_1 = [{ id: 1, username: 'admin' }];
      const expected_2 = 'No Match Found';
      userExist(['admin', '1234'], (error, result) => {
        if (error) console.log(error);
        else {
          t.deepEqual(result, expected_1, 'Query should return ID and username of user found.');
        }
      })
      userExist(['KittyCat', '1234'], (error, result) => {
        if (error) console.log(error);
        else {
          t.deepEqual(result, expected_2, `Query should "No Match Found"
          for user with wrong username but valid password.`);
          t.end();
        }
      })
    }
  })
});

test('Get Transaction History', (t) => {
  runDbBuild((err, res) => {
    if (err) throw err;
    else {
      const expected = 'No Transactions';
      showHistory(1, (err, res) => {
        if (err) console.log(err);
        else {
          t.deepEqual(res, expected, 'Should return "No Transactions" for admin');
          t.end();
        }
      })
    }
  })
})
