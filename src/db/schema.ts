import { serial, text, pgTable } from "drizzle-orm/pg-core";


export const bids = pgTable('chereta_bids', {
  id: serial('id').primaryKey(),
  name: text('name'),
});
