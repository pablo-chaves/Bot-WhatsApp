exports.up = async function (knex) {
  await knex.schema.createTable('users', function (table) {
    table.string('name').primary()
    table.string('lastname')
    table.string('email')
    table.string('phone')
    table.string('chat')
    table.dateTime('created_at').notNull().defaultTo(knex.fn.now())
  })
}

exports.down = async function (knex) {
  await knex.schema.dropTable('users')
}
