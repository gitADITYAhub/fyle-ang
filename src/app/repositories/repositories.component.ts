// src/app/repositories/repositories.component.ts

import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { GithubService } from '../github.service';

@Component({
  selector: 'app-repositories',
  template: `
    <div *ngIf="loading" class="loader">Loading...</div>
    <div *ngIf="!loading && repositories">
      <ul>
        <li *ngFor="let repo of repositories">
          {{ repo.name }} - Stars: {{ repo.stargazers_count }}
        </li>
      </ul>

      <div class="pagination">
        <button (click)="loadRepositories(username, currentPage - 1)" [disabled]="currentPage === 1">Previous</button>
        <span>Page {{ currentPage }}</span>
        <button (click)="loadRepositories(username, currentPage + 1)" [disabled]="repositories.length < pageSize">Next</button>
      </div>
    </div>
    <div *ngIf="!loading && repositories?.length === 0">No repositories found.</div>
  `,
  styles: [`
    .loader {
      text-align: center;
    }
    .pagination {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 1rem;
    }
  `]
})
export class RepositoriesComponent implements OnChanges {
  @Input() username!: string;
  repositories: any[] = [];
  loading: boolean = false;
  currentPage: number = 1;
  pageSize: number = 10;

  constructor(private githubService: GithubService) {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes['username'] && changes['username'].currentValue !== changes['username'].previousValue) {
      this.loadRepositories(changes['username'].currentValue, this.currentPage);
    }
  }

  loadRepositories(username: string, page: number) {
    if (!username) return;
    this.loading = true;
    this.currentPage = page;
    this.githubService.getRepositories(username, page, this.pageSize).subscribe(
      data => {
        this.repositories = data;
        this.loading = false;
      },
      error => {
        this.loading = false;
        console.error('Error fetching repositories', error);
      }
    );
  }
}
