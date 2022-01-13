import { registerApplication, start } from "single-spa";
import pageNotFound from './page-not-found.html';
import {
  constructRoutes,
  constructApplications,
  constructLayoutEngine
} from "single-spa-layout";

// async function getImportsByLayer() {
//   const layer = localStorage.getItem("hyp-layer") || "production";
//   const response = await fetch("http://localhost:8600/imports", { headers: { 'hyp-layer': layer } });
//   return response.json();
// }

async function initApp() {
  // const importsForLayer = (await getImportsByLayer()).imports;

  // console.log('importsForLayer', importsForLayer);

  const response = await fetch('http://localhost:8600/applications');
  const appicationsInfo = await response.json();

  appicationsInfo.config.routes.push({
    type: "route",
    default: true,
    // @ts-ignore
    routes: [{ type: "application", name: "error", error: pageNotFound }],
  });

  const routes = constructRoutes(appicationsInfo.config);

  const applications = constructApplications({
    routes,
    loadApp({ name }) {
      // const importAddress = importsForLayer[name]
      
      // console.log('name', name)
      // console.log('importAddress', importAddress)

      return System.import(name);
    },
  });

  constructLayoutEngine({ routes, applications });

  applications.forEach(registerApplication);

  start({
    urlRerouteOnly: true,
  });
}

initApp();

// fetch('http://localhost:8600/applications')
//   .then(res => res.json())
//   .then(app => {
//     app.config.routes.push({
//       type: "route",
//       default: true,
//       // @ts-ignore
//       routes: [{ type: "application", name: "error", error: pageNotFound }],
//     })

//     const routes = constructRoutes(app.config);

//     const applications = constructApplications({
//       routes,
//       loadApp({ name }) {
//         return System.import(name);
//       },
//     });

//     constructLayoutEngine({ routes, applications });

//     applications.forEach(registerApplication);
//   })
//   .finally(() => {
//     start({
//       urlRerouteOnly: true,
//     });
//   })

// registerApplication(
//   '@hyp/navbar',
//   () => System.import('@hyp/navbar'),
//   location => true
// );

// registerApplication(
//   '@hyp/navbar',
//   () => System.import('@hyp/navbar'),
//   location => true
// );

// registerApplication(
//   '@hyp/beauty',
//   () => System.import('@hyp/beauty'),
//   location => location.pathname.startsWith('beauty'),
// );

// registerApplication(
//   '@hyp/payments',
//   () => System.import('@hyp/payments'),
//   location => location.pathname.startsWith('payments'),
// );

// start({
//   urlRerouteOnly: true,
// });