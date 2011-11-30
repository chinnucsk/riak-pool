var Http = require('riak-js/lib/http-client'),
  Pool = require('./pool');

var db1 = new Http({ port: 6098 });
var db2 = new Http({ port: 8098 });
var db3 = new Http({ port: 7098 });

var pool = new Pool({ nodes: [db1, db2, db3] });

__defineGetter__('db', function() { return pool.db });

// application code

db.get('users', 'test@gmail.com', function(err, data) {
  console.log(err, data);

  db.get('users', 'test@gmail.com', function(err2, data2) {
    console.log(err2, data2)
    
    db.get('users', 'test@gmail.com', function(err3, data3) {
      console.log(err3, data3)
    });
    
  });

});