exports.up = async function (knex) {
  await knex.schema.createTable('users', function (table) {
    table.increments('id').primary()
    table.string('name')
    table.string('lastname')
    table.string('email')
    table.string('phone')
    table.timestamp('created_at').defaultTo(knex.fn.now())
    table.timestamp('updated_at').defaultTo(knex.fn.now())
  })
}

exports.down = async function (knex) {
  await knex.schema.dropTable('users')
}
