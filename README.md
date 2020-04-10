# Apollo Blog

[![Netlify Status](https://api.netlify.com/api/v1/badges/6bae8279-10f9-456b-82cd-0b6d56a84042/deploy-status)](https://app.netlify.com/sites/distracted-snyder-7d1f01/deploys)

- [Running Wordpress locally](#running-wordpress-locally)
- [Local development](#local-development)
- [Diagnosing site failures](#diagnosing-site-failures)
  - [Netlify](#netlify)
  - [WP Engine](#wp-engine)

This website is a static [Gatsby](https://gatsbyjs.org) website, created using data served from a Wordpress instance running on [WP Engine](https://wpengine.com/). It is built and deployed on Netlify, and leverages the [NetlifyPress](https://wordpress.org/plugins/deploy-netlifypress/) Wordpress plugin to trigger new deploys when content is created or updated.

## Running Wordpress locally

To run Wordpress on your local machine, we use [Local](https://localwp.com/), an application that lets you start and stop local Wordpress instances, and push/pull data between your machine and our hosting provider.

[Follow this guide](https://wpengine.com/support/local/) to install Local on your machine, connect to our WP Engine account, and pull the `apollographql` site.

Once you have a local copy of our Wordpress instance up and running, you're ready to start the Gatsby local development environment...

## Local development

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

## Diagnosing site failures

In the event of an outage, one might want to check on the status of services that this site depends on. This site has two main 3rd-party points of failure:

### Netlify

[Status page](https://www.netlifystatus.com/)

We use Netlify to build and host the static Gatsby site portion of this website. Site settings can be configured [on Netlify](https://app.netlify.com/sites/distracted-snyder-7d1f01/overview).

> **Note:** If a new deploy fails to build on Netlify, it won't have an effect on the site currently in production. Netlify will only deploy successful builds.

We also leverage Netlify redirects to proxy requests from `/blog` to our Netlify deployment. This redirect rule that does this [can be found here](https://github.com/apollographql/website-router/blob/master/_redirects#L50).

### WP Engine

[Status page](https://wpenginestatus.com/)

The Wordpress component of this website is hosted by WP Engine. They are a service that specializes in secure Wordpress hosting.

One can log in to WP Engine to update our hosting configuration, view server error logs, inspect the database using phpMyAdmin, and more. Login credentials for WP Engine can be found in 1Password.
