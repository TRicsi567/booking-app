import { Route } from '@angular/router';
import { LogonComponent } from './logon/logon.component';
import { DetailsComponent } from './details/details.component';
import { NotFoundComponent } from './not-found/not-found.component';

export const appRoutes: Route[] = [
  { path: '', component: LogonComponent },
  { path: 'flight-details', component: DetailsComponent },
  { path: '*', component: NotFoundComponent },
];
