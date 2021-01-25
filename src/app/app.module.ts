import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NavbarComponent } from './components/navbar/navbar.component';
import { LoginComponent } from './components/login/login.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { LoginService } from './services/login.service';
import { SocialLoginModule, SocialAuthServiceConfig } from 'angularx-social-login';
import {
  GoogleLoginProvider,
} from 'angularx-social-login';
import { ProfileComponent } from './components/profile/profile.component';
import { InscriptionComponent } from './components/inscription/inscription.component';
import { SectionComponent } from './components/section/section.component';
import { AccueilComponent } from './components/accueil/accueil.component';
import { HopitauxComponent } from './components/hopitaux/hopitaux.component';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { MapComponent } from './components/map/map.component';
// import { AgmCoreModule } from '@agm/core';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    NavbarComponent,
    LoginComponent,
    ProfileComponent,
    InscriptionComponent,
    SectionComponent,
    AccueilComponent,
    HopitauxComponent,
    MapComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    FormsModule,
    HttpClientModule,
    SocialLoginModule,
    NgxSkeletonLoaderModule
    // AgmCoreModule.forRoot({
    //   apiKey:'AIzaSyCGmu5hSFjaefysoryoFafdYcBSbNMb0j0'
    // })
  ],
  providers: [LoginService,
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(
              '977026045075-oghd1jcm58on147inol77ofotvoqvrpc.apps.googleusercontent.com'
            )
          }
        ]
      } as SocialAuthServiceConfig,
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
