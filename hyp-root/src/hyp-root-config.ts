import { registerApplication, start } from "single-spa";
import pageNotFound from "./page-not-found.html";
import {
  constructRoutes,
  constructApplications,
  constructLayoutEngine,
} from "single-spa-layout";

const environmentKey = localStorage.getItem("ek");

function injectFlagsInfoProps(routes: []) {
  if (!routes) return;

  routes.forEach((route: any) => {
    if (route.type === "application") {
      route.props = { ...route.props, flagsEnvironmentKey: environmentKey, flagsApi: "http://localhost:8000/api/v1/" }
    } else {
      injectFlagsInfoProps(route.routes)
    }
  });
}

async function initApp() {
  const appicationsInfoAsString = localStorage.getItem("templ");
  const applicationsInfo = JSON.parse(appicationsInfoAsString);

  applicationsInfo.routes.push({
    type: "route",
    default: true,
    routes: [{ type: "application", name: "error", error: pageNotFound }],
  });

  injectFlagsInfoProps(applicationsInfo.routes)

  const routes = constructRoutes(applicationsInfo);
  const applications = constructApplications({
    routes,
    loadApp({ name }) {
      return System.import(name);
    },
  });

  constructLayoutEngine({ routes, applications });

  applications.forEach((application) => registerApplication(application));

  start({
    urlRerouteOnly: true,
  });
}

initApp();
