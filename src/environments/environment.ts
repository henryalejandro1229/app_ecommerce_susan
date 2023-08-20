// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  url: `saborlicor_app_backend/api`,
  urlCOPOMEX: `https://api.copomex.com/query/`,
  urlImg: `http://localhost/saborlicor_app_backend/api/products/imageProducts/`,
  urlEmail: `https://appsaborlicorserveremail-production.up.railway.app/saborlicor_app_backend/`,
  firebaseConfig: {
    projectId: 'licores-de-sabor',
    appId: '1:103220365677:web:52f63c3fa2c6d7385db264',
    storageBucket: 'licores-de-sabor.appspot.com',
    apiKey: 'AIzaSyC-RaNBY6YIZ7mwF3aGwf7nSLPDm7YFJVU',
    authDomain: 'licores-de-sabor.firebaseapp.com',
    messagingSenderId: '1022333183004',
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
