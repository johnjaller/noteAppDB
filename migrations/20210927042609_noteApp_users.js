
exports.up = function(knex) {
    return knex.schema.createTable('users',(table)=>{
        table.increments()
        table.string('username').unique().notNullable()
        table.string('password')
    })
};

exports.down = function(knex) {
  return knex.schema.dropTable('users')
};
