// import { Injectable } from '@angular/core';
// import { NgxIndexedDBModule, DBConfig } from 'ngx-indexed-db';

// @Injectable({
//   providedIn: 'root'
// })
// export class DbConfigService {

//   constructor() { }
//    dbConfig: DBConfig  = {
//     name: 'MyDb',
//     version: 3,
//     objectStoresMeta: [{
//       store: 'people',
//       storeConfig: { keyPath: 'id', autoIncrement: true },
//       storeSchema: [
//         { name: 'name', keypath: 'name', options: { unique: false } },
//         { name: 'email', keypath: 'email', options: { unique: false } }
//       ]
//     }, {
//       // animals added in version 2
//       store: 'animals',
//       storeConfig: { keyPath: 'id', autoIncrement: true },
//       storeSchema: [
//         { name: 'name', keypath: 'name', options: { unique: true } },
//       ]
//     }],
//     // provide the migration factory to the DBConfig
//       };
      
// }
// // @NgModule({
// //   imports: [
// //     NgxIndexedDBModule.forRoot(dbConfig)
// //   ],
// // })