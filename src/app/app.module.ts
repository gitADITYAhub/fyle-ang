import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { RepositoriesComponent } from './repositories/repositories.component';
import { SearchUserComponent } from './search-user.component';
import { GithubService } from './github.service';
import { FormsModule } from '@angular/forms';
import { UserProfileComponent } from './user/user-profile.component';
import { RepositoryListComponent } from './repository-list/repository-list.component';

@NgModule({
  declarations: [
    AppComponent,
    RepositoriesComponent,
    SearchUserComponent,
    UserProfileComponent,
    RepositoryListComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [GithubService],
  bootstrap: [AppComponent]
})
export class AppModule { }
