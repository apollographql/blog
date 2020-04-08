# Apollo Blog

[![Netlify Status](https://api.netlify.com/api/v1/badges/6bae8279-10f9-456b-82cd-0b6d56a84042/deploy-status)](https://app.netlify.com/sites/distracted-snyder-7d1f01/deploys)

## Developing locally

This project requires the [Netlify CLI](https://docs.netlify.com/cli/get-started/) to run locally. We use Netlify to store the site's environment variables and run its serverless functions locally. If you don't already have it installed, install the Netlify CLI globally.

Run `netlify init` and select the default answers to each of the following prompts to connect your local site to our project on Netlify.

```bash
npm install -g netlify-cli
netlify init
```

Next, install the project's dependencies.

```bash
npm install
```

Finally, start your development environment.

```bash
netlify dev
```

Now, you should have a development server running at http://localhost:8888! 🚀

