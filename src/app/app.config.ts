import { ApplicationConfig, importProvidersFrom, InjectionToken } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { routes } from './app.routes';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideHttpClient } from "@angular/common/http";
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from "@angular/material/form-field";
import { provideMomentDateAdapter } from '@angular/material-moment-adapter';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { environment } from "../environments/environment";

export interface MapConfig {
  id: string,
  zoom: {
    min: number,
    max: number,
  }
  center: {
    lat: number,
    lng: number
  }
}

export const MAP_CONFIG = new InjectionToken<MapConfig>('MAP_CONFIG');

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes, withComponentInputBinding()),
    provideAnimations(),
    provideHttpClient(),
    {
      provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: { appearance: 'outline' },
    },
    {
      provide: MAP_CONFIG, useValue: {
        id: 'map',
        zoom: {
          min: 3,
          max: 18
        },
        center: {
          lat: 45.5031824,
          lng: -73.5698065
        }
      }
    },
    provideMomentDateAdapter(undefined, { useUtc: true }),
    importProvidersFrom(provideFirebaseApp(() => initializeApp(environment.firebase))),
    // importProvidersFrom(provideAuth(() => getAuth())),
    // importProvidersFrom(provideFirestore(() => getFirestore()))
  ]
};
