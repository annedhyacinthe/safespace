exports.up = function (knex) {
<<<<<<< HEAD
  return knex.schema.createTable('comments', (t) => {
    t.increments().primary()
    t.text('content').notNullable()
    t.timestamp('created_at').defaultTo(knex.fn.now())
    t.integer('user_id').notNullable()
    t.foreign('user_id').references('id').inTable('users')
    t.integer('post_id').notNullable()
    t.foreign('post_id').references('id').inTable('posts').onDelete('cascade')
  })
}
=======
  return knex.schema.createTable("comments", (t) => {
    t.increments().primary();
    t.text("content").notNullable();
    t.timestamp("created_at").defaultTo(knex.fn.now());
    t.integer("user_id").notNullable();
    t.foreign("user_id").references("id").inTable("users");
    t.integer("post_id").notNullable();
    t.foreign("post_id").references("id").inTable("posts").onDelete("cascade");
  });
};
>>>>>>> bc05bbd4dcf3b77efe752e4aa6819d5c1cc6b5ba

exports.down = function (knex) {
  return knex.schema.dropTable("comments");
};
