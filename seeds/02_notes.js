
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('notes').del()
    .then(function () {
      // Inserts seed entries
      return knex('notes').insert([
        {content:'Hello World',user_id:1},
        {content:'What?',user_id:1},
      ]);
    });
};
