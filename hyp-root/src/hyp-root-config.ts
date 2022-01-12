import { registerApplication, start } from "single-spa";
import {
  constructRoutes,
  constructApplications,
  constructLayoutEngine
} from "single-spa-layout";

import pageNotFound from './page-not-found.html';

fetch('http://localhost:8600/applications')
  .then(res => res.json())
  .then(app => {
    app.config.routes.push({
      type: "route",
      default: true,
      // @ts-ignore
      routes: [{ type: "application", name: "error", error: pageNotFound }],
    })

    console.log('app.config', app.config)
    const routes = constructRoutes(app.config);

    const applications = constructApplications({
      routes,
      loadApp({ name }) {
        return System.import(name);
      },
    });

    constructLayoutEngine({ routes, applications });

    applications.forEach(registerApplication);
  })
  .finally(() => {
    start({
      urlRerouteOnly: true,
    });
  })