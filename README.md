# Website Uptime & Certificate Monitoring SPA

This is the frontend SPA to be paired with [Uptime API](https://github.com/J-T-McC/uptime-backend-api)

This site is using [Vue3](https://v3.vuejs.org/guide/introduction.html) & [Tailwind CSS](https://tailwindcss.com/)

You can try it out at [https://uptime.tysonmccarney.com/](https://uptime.tysonmccarney.com/)

## Project setup

#### Requirements

* [Vue CLI](https://cli.vuejs.org/)

#### Env variables

```dotenv

#spa domain
VUE_APP_URL=http://app.my-domain.com
#root api domain
VUE_APP_SANCTUM=http://api.my-domain.com
#api domain with prefix for endpoint routes
VUE_APP_API=http://api.my-domain.com/app

```
### Install and build 

Make note of vue.config.js. When you run ```yarn serve ```, it will use the domain set in that config file. This
is to allow you to serve your front end on the same test domain as your backend, so your session cookie will work.
If you change this domain, make sure you update your API endpoint domain as well. You also need to update your 
host file in windows to point that domain to localhost.

```shell script
yarn install
yarn serve
```

## License

MIT
