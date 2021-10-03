exports.up = async function (knex) {
  await knex.schema.createTable('chats', function (table) {
    table.increments('id').primary()
    table.integer('user_id').unsigned().references('id').inTable('users')
    table.string('questions').notNullable()
    table.enu('status', ['pending', 'finished']).defaultTo('pending')
    table.timestamp('created_at').defaultTo(knex.fn.now())
    table.timestamp('updated_at').defaultTo(knex.fn.now())
  })
}

exports.down = async function (knex) {
  await knex.schema.dropTable('chats')
}
