import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  try {
    await knex.schema.alterTable("users", (table) => {
      table.enu("role", ["provider", "client"]).notNullable().defaultTo("client");
    });
  } catch (error) {
    console.error("Error adding role column to users table:", error);
    throw error;
  }
}

export async function down(knex: Knex): Promise<void> {
    try {
        await knex.schema.alterTable("users", (table) => {
            table.dropColumn("role");
        });
    } catch (error) {
        console.error("Error removing role column from users table:", error);
        throw error;
    }
}
