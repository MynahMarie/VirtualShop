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
        ['tape',
        'tapefirst',
        'tapelast',
        'tapeemail',
        'tapepassword'],
        (err, res) => {
          if (err) console.log('error creating user', err);
          else {
            t.deepEqual(res, expected, 'should return the new user ID');
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
      const expected_1 = [{ id: 1, username: 'admin', hash: '1234' }];
      const expected_2 = 'No Match Found';
      userExist('admin', (error, result) => {
        if (error) console.log(error);
        else {
          t.deepEqual(result, expected_1, 'Query should return ID, username and hash of user found.');
        }
      })
      userExist('KittyCat', (error, result) => {
        if (error) console.log(error);
        else {
          t.deepEqual(result, expected_2, `Query should return "No Match Found"
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
      const expected1 = 'No Transactions';
      const expected2 = 1;
      const expected3 = 2;
      showHistory(1, (err, res) => {
        if (err) console.log(err);
        else {
          t.deepEqual(res, expected1, 'Should return "No Transactions" for admin');
        }
      })
      showHistory(2, (err, res) => {
        if (err) console.log(err);
        console.log('res.rowCount', res.rowCount);
        t.deepEqual(res.length, expected2, 'Should return 1 for the number of rows for user_id 2');
      })
      showHistory(3, (err, res) => {
        if (err) console.log(err);
        t.deepEqual(res.length, expected3, 'Should return 2 for the number of rows for user_id 3');
        t.end();
      })
    }
  })
})
