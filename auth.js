const myAuthroizer = function (knex) {
    return function (user, password, cb) {
      console.log(user, password);
      try {
        let query = knex
          .select("username")
          .from("users")
          .where("username", user)
          .where("password", password);
  
        query.then((rows) => {
          if (rows.length == 1) {
            cb(null, true);
          } else {
            cb(null, false);
          }
        });
      } catch (err) {
        console.log(err);
      }
    };
  };

    
module.exports=myAuthroizer    