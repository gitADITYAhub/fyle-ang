import { Component } from '@angular/core';
import { GithubService } from './github.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  selectedUsername: string | null = null;
  user: any = null;
  totalRepos: number = 0;
  currentPage: number = 1;
  pageSize: number = 6;
  repositories: any[] = [];
  constructor(private githubService: GithubService) { }

  onSearch(username: string): void {
    this.selectedUsername = username;
    this.currentPage = 1;
    this.fetchUserDetails(username);
    this.fetchRepositories(username, this.currentPage);

    // Since the app-repositories component is already listening for input changes,
    // setting the selectedUsername will trigger the data fetch.
  }
  onPageChange(newPage: number): void {
    if (!this.selectedUsername) return;
    this.currentPage = newPage;
    this.fetchRepositories(this.selectedUsername, newPage); // Pass the current username and new page
  }
  
  private fetchUserDetails(username: string) {
    this.githubService.getUser(username).subscribe(user => {
      this.user = user;
    });
  }

  private fetchRepositories(username: string, page: number) {
    this.githubService.getRepositories(username, page, this.pageSize).subscribe(
      (data: any) => { // Make sure the data structure matches what the API returns
        this.repositories = data.items;
        this.totalRepos = data.total_count; // Set the total number of repositories
      },
      error => {
        console.error('Error fetching repositories', error);
      }
    );
  }
}
