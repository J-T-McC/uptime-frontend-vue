# Website Uptime & Certificate Monitoring SPA

This is the frontend SPA to be paired with [Uptime API](https://github.com/J-T-McC/uptime-backend-api)

This site was using [Vue3](https://v3.vuejs.org/guide/introduction.html) & [Tailwind CSS](https://tailwindcss.com/)

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

```shell script
yarn install
yarn serve
```

## License

MIT
