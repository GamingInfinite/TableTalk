export default {
  mount: {
    /* ... */
    public: "/",
    src: "/dist",
  },
  plugins: [
    /* ... */
    "@snowpack/plugin-svelte",
    "@snowpack/plugin-postcss",
  ],
  routes: [
    /* Enable an SPA Fallback in development: */
    // {"match": "routes", "src": ".*", "dest": "/index.html"},
  ],
  optimize: {
    /* Example: Bundle your final build: */
    // "bundle": true,
  },
  packageOptions: {
    /* ... */
    knownEntrypoints: ["svelte", "svelte/transition", "svelte/store"],
  },
  devOptions: {
    tailwindConfig: "./tailwind.config.js",
  },
  buildOptions: {
    // put the build files in /docs
    out: "docs",
    // put the meta snowpack build files under snowpack instead of _snowpack since Github special-cases underscore prefixed folders
    metaUrlPath: "snowpack",
  },
};
