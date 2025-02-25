import todoMutations from './todos/Mutations.js';
import userMutations from './users/Mutations.js';
import userQuaries from './users/Queries.js';
import todoQueries from './todos/Queries.js';
const resolvers = {
  Query: {
    ...userQuaries,
    ...todoQueries,
  },
  Mutation: {
    ...userMutations,
    ...todoMutations,
  },
};
export default resolvers;
