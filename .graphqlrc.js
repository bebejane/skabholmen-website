require("@next/env").loadEnvConfig(".");

const config =  {
	dedupeOperationSuffix:true,
	dedupeFragments: true,
	pureMagicComment: false,
	exportFragmentSpreadSubTypes: true,
	namingConvention: "keep",
	skipDocumentsValidation: true,
}

module.exports = {
	schema: {
		"https://api-eu-central-1-shared-euc1-02.hygraph.com/v2/cl8lmt79r2w5e01t9hph585ax/master": {
			headers: {
				Authorization: process.env.GRAPHQL_API_TOKEN,
				"X-Exclude-Invalid": true,
			},
		},
	},
  documents: "graphql/**/*.gql",
	extensions: {
		codegen: {
			overwrite: true,
			generates: {
				"@types/datocms.d.ts": {
					plugins: [
						"typescript",
						"typescript-operations",
					],
					config:{...config, noExport: true}
				},
				
        "graphql/index.ts": {
          plugins: ["typed-document-node"],
					config
        },
        "@types/document-modules.d.ts": {
          plugins: ["typescript-graphql-files-modules"],
					config
        },
				/*
				"graphql/hooks.ts": {
          plugins: ["typescript-react-apollo"],
					config:{...config, withHooks:true}
        },
				*/
			},
		}
	},
};
