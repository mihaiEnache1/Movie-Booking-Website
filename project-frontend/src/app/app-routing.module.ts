import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AdminComponent } from './admin/admin.component';
import { UserComponent } from './user/user.component';
import { LoginComponent } from './login/login.component';
import { ForbiddenComponent } from './forbidden/forbidden.component';
import { AuthGuard } from './_auth/auth.guard';
import { AddMovieComponent } from './add-movie/add-movie.component';
import { ShowMovieDetailsComponent } from './show-movie-details/show-movie-details.component';
import { MovieResolveService } from './resolver/movie-resolve.service'; 
import { RegisterComponent } from './register/register.component';
import { MovieViewDetailsComponent } from './movie-view-details/movie-view-details.component';
import { AddTheatreComponent } from './add-theatre/add-theatre.component';
import { TheatreResolveService } from './resolver/theatre-resolve.service';
import { AddScreenComponent } from './add-screen/add-screen.component';
import { ScreenResolveService } from './resolver/screen-resolve.service';
import { AddShowComponent } from './add-show/add-show.component';
import { ShowResolveService } from './resolver/show-resolve.service';
import { CreateBookingComponent } from './create-booking/create-booking.component';
import { AddSeatComponent } from './add-seat/add-seat.component';
import { SeatResolverService } from './resolver/seat-resolver.service';
import { HeaderComponent } from './header/header.component';
import { TrailerComponent } from './trailer/trailer.component';
import { ShowBookingsComponent } from './show-bookings/show-bookings.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'admin', component: AdminComponent, canActivate: [AuthGuard], data:{roles:['Admin']} },
  { path: 'user', component: UserComponent, canActivate: [AuthGuard], data:{roles:['User']} },
  { path: 'login', component: LoginComponent },
  { path: 'forbidden', component: ForbiddenComponent },
  { path: 'add', component: AddMovieComponent, canActivate: [AuthGuard], data:{roles:['Admin']}, 
    resolve: {
      movie: MovieResolveService
    }
  },
  { path: 'show', component: ShowMovieDetailsComponent, canActivate: [AuthGuard], data:{roles:['Admin']} },
  { path: 'register', component: RegisterComponent },
  { path: 'movieView', component: MovieViewDetailsComponent, resolve: { movie: MovieResolveService} },
  { path: 'addTheatre', component: AddTheatreComponent, canActivate: [AuthGuard], data:{roles:['Admin']},
    resolve: {
      theatre: TheatreResolveService
    }
  },
  { path: 'addScreen', component: AddScreenComponent, canActivate: [AuthGuard], data:{roles:['Admin']},
    resolve: {
      screen: ScreenResolveService
    }
  },
  { path: 'addShow', component: AddShowComponent, canActivate: [AuthGuard], data:{roles:['Admin']},
    resolve: {
      show: ShowResolveService
    }
  },
  { path: 'bookMovie', component: CreateBookingComponent, resolve: { movie: MovieResolveService} },
  { path: 'addSeat', component: AddSeatComponent, canActivate: [AuthGuard], data:{roles:['Admin']}, 
    resolve: {
      seat: SeatResolverService
    }
  },
  { path: 'trailer', component: TrailerComponent, resolve: { movie: MovieResolveService}},
  { path: 'showBookings', component: ShowBookingsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
