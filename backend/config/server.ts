export default ({ env }) => ({
	host: env("HOST", "0.0.0.0"),
	port: env.int("PORT", 1337),
	app: {
		keys: env.array("APP_KEYS"),
	},
	url: env("SERVER_URL", "http://0.0.0.0:1337"),
	proxy: true,
});
