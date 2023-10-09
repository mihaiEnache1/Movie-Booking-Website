import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { AdminComponent } from './admin/admin.component';
import { UserComponent } from './user/user.component';
import { LoginComponent } from './login/login.component';
import { HeaderComponent } from './header/header.component';
import { ForbiddenComponent } from './forbidden/forbidden.component';
import { RouterModule } from '@angular/router';
import { AuthGuard } from './_auth/auth.guard';
import { AuthInterceptor } from './_auth/auth.interceptor';
import { UserService } from './service/user.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { AddMovieComponent } from './add-movie/add-movie.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { DragDirective } from './drag.directive';
import { ShowMovieDetailsComponent } from './show-movie-details/show-movie-details.component';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { ShowMovieImageComponent } from './show-movie-image/show-movie-image.component';
import { MatDialogModule } from '@angular/material/dialog';
import { RegisterComponent } from './register/register.component';
import { MovieViewDetailsComponent } from './movie-view-details/movie-view-details.component';
import { AddTheatreComponent } from './add-theatre/add-theatre.component';
import { AddScreenComponent } from './add-screen/add-screen.component';
import { MatSelectModule } from '@angular/material/select';
import { AddShowComponent } from './add-show/add-show.component';
import { CreateBookingComponent } from './create-booking/create-booking.component';
import { AddSeatComponent } from './add-seat/add-seat.component';
import { ToastrModule } from 'ngx-toastr';
import { YouTubePlayerModule } from '@angular/youtube-player';
import { TrailerComponent } from './trailer/trailer.component';
import { ShowBookingsComponent } from './show-bookings/show-bookings.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AdminComponent,
    UserComponent,
    LoginComponent,
    HeaderComponent,
    ForbiddenComponent,
    AddMovieComponent,
    DragDirective,
    ShowMovieDetailsComponent,
    ShowMovieImageComponent,
    RegisterComponent,
    MovieViewDetailsComponent,
    AddTheatreComponent,
    AddScreenComponent,
    AddShowComponent,
    CreateBookingComponent,
    AddSeatComponent,
    TrailerComponent,
    ShowBookingsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    RouterModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatGridListModule,
    MatTableModule,
    MatIconModule,
    MatDialogModule,
    MatSelectModule,
    ToastrModule.forRoot(),
    YouTubePlayerModule
  ],
  providers: [
    AuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    UserService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
