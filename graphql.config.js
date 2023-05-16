require('dotenv').config({
  path: '.env.local',
})

module.exports = {
  projects: {
    default: {
      schema: [process.env.NEXT_PUBLIC_BACKEND_ENDPOINT],
      documents: ['./src/constants/graphqlQueries/**/*.{ts,tsx,graphql}'],
      extensions: {
        codegen: {
          generates: {
            './src/payloads/graphql.ts': {
              plugins: ['typescript', 'typescript-operations'],
              config: {
                typesPrefix: 'Gql',
                enumPrefix: false,
                // turn of for better typing
                arrayInputCoercion: false,
              },
            },
          },
          hooks: {
            afterAllFileWrite: ['npx prettier --write'],
          },
        },
      },
    },
  },
}
