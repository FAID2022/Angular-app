import {ApplicationConfig, importProvidersFrom, provideZoneChangeDetection} from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';  // Import HttpClient
import { routes } from './app.routes';
import {provideClientHydration} from "@angular/platform-browser";
import {initializeApp, provideFirebaseApp} from "@angular/fire/app";
import {getAuth, provideAuth} from "@angular/fire/auth";
import {getFirestore, provideFirestore} from "@angular/fire/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyAGMLGhJHQ3fc1-0-Qd0hMnQh5_fYZ8lns",
  authDomain: "yoshop-a7ab4.firebaseapp.com",
  projectId: "yoshop-a7ab4",
  storageBucket: "yoshop-a7ab4.appspot.com",
  messagingSenderId: "949457423908",
  appId: "1:949457423908:web:27ffce0c16c31ad141d2b1"
};
export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideClientHydration(),
    provideHttpClient(),// Add HttpClient
    provideFirebaseApp(() => initializeApp(firebaseConfig)),
    provideFirestore(() => getFirestore()),
    provideAuth(()=>getAuth()),
  ]
};
