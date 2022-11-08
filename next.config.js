const withBundleAnalyzer = require("@next/bundle-analyzer")({
	enabled: process.env.ANALYZE === "true",
});

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
	experimental: {
		scrollRestoration: true,
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
	async redirects() {
		return [
			{
				source: "/skabholmen-invest-ab/:path*",
				destination: "/team",
				permanent: true,
			},
		];
	},
};

const config = withBundleAnalyzer({ sassOptions, ...nextOptions });
module.exports = config;

skabholmen - invest - ab;
