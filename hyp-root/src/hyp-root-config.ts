import { registerApplication, start } from "single-spa";
import pageNotFound from './page-not-found.html';
import {
  constructRoutes,
  constructApplications,
  constructLayoutEngine
} from "single-spa-layout";

async function initApp() {
  const response = localStorage.getItem("apps");
  const appicationsInfo = JSON.parse(response);

  appicationsInfo.routes.push({
    type: "route",
    default: true,
    // @ts-ignore
    routes: [{ type: "application", name: "error", error: pageNotFound }],
  });

  const routes = constructRoutes(appicationsInfo);

  const applications = constructApplications({
    routes,
    loadApp({ name }) {
      return System.import(name);
    }
  });

  constructLayoutEngine({ routes, applications });

  applications.forEach(application => 
    registerApplication(
      { 
        ...application, 
        customProps: { flagsEnvironmentKey: "AzTqDA3W7XiaDLPZkfeNtg", flagsApi: "http://localhost:8000/api/v1/" } 
      }));

  start({
    urlRerouteOnly: true,
  });
}

initApp();