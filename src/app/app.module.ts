import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule} from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { ScrollingModule } from '@angular/cdk/scrolling';

import { AppComponent } from './app.component';
import { UserService } from './shared/user.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { UserComponent } from './user/user.component';
import { SignInComponent } from './user/sign-in/sign-in.component';
import { HomeComponent } from './home/home.component';
import { SignUpComponent } from './user/sign-up/sign-up.component';
import { appRoutes } from './routes';
import { AuthGuard } from './auth/auth.guard';
import {AuthInterceptor, authProvider} from './auth/auth.interceptor';
import {fakeBackendProvider} from './shared/FakeBackendInterceptor';
import {MatExpansionModule} from '@angular/material/expansion';
import {AngularFireDatabase} from '@angular/fire/database';
import {MapService} from './shared/map.service';
import { OsmComponent } from './osm/osm.component';

@NgModule({
  declarations: [
    AppComponent,
    SignUpComponent,
    UserComponent,
    SignInComponent,
    HomeComponent,
    OsmComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    ToastrModule.forRoot(),
    BrowserAnimationsModule,
    MatExpansionModule,
    RouterModule.forRoot(appRoutes),
    ScrollingModule
  ],
  providers: [UserService, MapService, AuthGuard,
    authProvider,
    fakeBackendProvider,
    AngularFireDatabase
    ],
  bootstrap: [AppComponent]
})
export class AppModule { }
