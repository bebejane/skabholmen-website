const sassOptions = {
	includePaths: ["./components", "./pages"],
	prependData: `
    @use "sass:math";
    @import "./styles/partials/variables";
    @import "./styles/partials/mediaqueries"; 
    @import "./styles/partials/mixins"; 
    @import "./styles/partials/styles";
    @import "./styles/partials/fonts";
  `,
};
const nextOptions = {
	typescript: {
		ignoreBuildErrors: true,
	},
	eslint: {
		ignoreDuringBuilds: true,
	},
	devIndicators: {
		buildActivity: false,
	},
	webpack: (config) => {
		config.module.rules.push({
			test: /\.(graphql|gql)$/,
			exclude: /node_modules/,
			loader: "graphql-tag/loader",
		});
		config.module.rules.push({
			test: /\.svg$/i,
			issuer: /\.[jt]sx?$/,
			use: ["@svgr/webpack"],
		});
		config.resolve.fallback = { fs: false, dns: false, net: false };
		return config;
	},
};

module.exports = { sassOptions, ...nextOptions };
