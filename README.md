# Apollo Blog

[![Netlify Status](https://api.netlify.com/api/v1/badges/6bae8279-10f9-456b-82cd-0b6d56a84042/deploy-status)](https://app.netlify.com/sites/apollographql-blog/deploys)

This website is a static [Gatsby](https://gatsbyjs.org) website, created using data served from a Wordpress instance running on [WP Engine](https://wpengine.com/). It is built and deployed on Netlify, and leverages the [NetlifyPress](https://wordpress.org/plugins/deploy-netlifypress/) Wordpress plugin to trigger new deploys when content is created or updated.

- [Custom components](#custom-components)
  - [Quote share button](#quote-share-button)
  - [Show/hide groups of elements](#showhide-groups-of-elements)
- [Running Wordpress locally](#running-wordpress-locally)
- [Local development](#local-development)
- [Diagnosing site failures](#diagnosing-site-failures)
  - [Netlify](#netlify)
  - [WP Engine](#wp-engine)

## Custom components

In this blog, we use some Wordpress features in creative ways to deliver custom functionality in our posts.

### Quote share button

Wordpress _Quote_ and _Pullquote_ block types both get the same visual treatment, with one key difference: the "Tweet" button. To add a button prompting users to share the blockquote on Twitter, simply use the _Pullquote_ block type in Wordpress, rather than the default _Quote_ type.

### Show/hide groups of elements

We transform Wordpress _Group_ blocks into [HTML `<details>` elements](https://developer.mozilla.org/en/docs/Web/HTML/Element/details), allowing for progressive disclosure of complicated examples using native HTML.

By default, `<details>` elements have a summary message that reads "Details", but authors can override this message by supplying their own `<summary>` element as the first child within a _Group_ block in Wordpress.

```html
<summary>Expand for more details</summary>
```

## Running Wordpress locally

To run Wordpress on your local machine, we use [Local](https://localwp.com/), an application that lets you start and stop local Wordpress instances, and push/pull data between your machine and our hosting provider.

[Follow this guide](https://wpengine.com/support/local/) to install Local on your machine, connect to our WP Engine account, and pull the `apollographql` site.

By default, Local uses it's own routing solution to serve Wordpress instances at the `.local` TLD. To run this site locally, you'll need to disable this feature by going into Preferences > Advanced > Router Mode, and selecting "localhost" from the dropdown.

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

Finally, start your development environment. Take note of the "Site Host" value in your Local app. You'll need to supply this to the following call in the form of a `WORDPRESS_URL_DEV` environment variable. For instance, if your "Site Host" is localhost:10003, you can run the following command in your terminal:

```bash
WORDPRESS_URL_DEV=localhost:10003 netlify dev
```

Now, you should have a development server running at http://localhost:8888! 🚀

## Diagnosing site failures

In the event of an outage, one might want to check on the status of services that this site depends on. This site has two main 3rd-party points of failure:

### Netlify

[Status page](https://www.netlifystatus.com/)

We use Netlify to build and host the static Gatsby site portion of this website. Site settings can be configured [on Netlify](https://app.netlify.com/sites/apollographql-blog/overview).

> **Note:** If a new deploy fails to build on Netlify, it won't have an effect on the site currently in production. Netlify will only deploy successful builds.

We also leverage Netlify redirects to proxy requests from `/blog` to our Netlify deployment. This redirect rule that does this [can be found here](https://github.com/apollographql/website-router/blob/master/_redirects#L50).

### WP Engine

[Status page](https://wpenginestatus.com/)

The Wordpress component of this website is hosted by WP Engine. They are a service that specializes in secure Wordpress hosting.

One can [log in to WP Engine](https://identity.wpengine.com/) using the login credentials found in 1Password. Once you're in there, you can do things like:

- Change our hosting configuration
- Update server software
- View server access/error logs
- Inspect/administrate the database using phpMyAdmin
- Roll back the entire site to a previous daily backup
- Contact WP Engine support

In case of a malware infection, WP Engine offers support for diagnosing and removing malware, excluding some circumstances. More information on this topic and their protocols can be found in [this article from their website](https://wpengine.com/support/malware-scans-cleaning/).
