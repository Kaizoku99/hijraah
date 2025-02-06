import { createSchema } from 'graphql-yoga';
import { readFileSync } from 'fs';
import { join } from 'path';
import { resolvers } from './resolvers';

const typeDefs = readFileSync(
  join(process.cwd(), 'graphql/schema.graphql'),
  'utf-8'
);

export const schema = createSchema({
  typeDefs,
  resolvers,
}); 