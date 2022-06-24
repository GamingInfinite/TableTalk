import adapter from "@sveltejs/adapter-cloudflare";

const dev = "production" === "development";

const config = {
  kit: {
    adapter: adapter(),
    methodOverride: {
      allowed: ["PATCH", "DELETE"],
    },
  },
};

export default config;
