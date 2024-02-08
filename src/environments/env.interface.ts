export interface IEnv {
  geoSearchAPI: string;
  firebase: {
    apiKey: string
    authDomain: string
    projectId: string
    storageBucket: string
    messagingSenderId: string
    appId: string
  };
}
