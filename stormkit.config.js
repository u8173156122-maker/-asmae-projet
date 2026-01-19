module.exports = {
  appName: "asmae-elgasmi",
  app: [
    {
      path: "./",
      buildCmd: "npm run build",
      distFolder: "dist",
      redirects: [
        { from: "/*", to: "/index.html", status: 200 }
      ]
    }
  ]
};
