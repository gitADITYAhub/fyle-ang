// src/app/repository-list/repository-list.component.ts

import { Component, Input, OnChanges, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { GithubService } from '../github.service';
@Component({
  selector: 'app-repository-list',
  templateUrl: './repository-list.component.html',
})


export class RepositoryListComponent implements OnChanges {
    @Input() username!: string;
    @Input() repositories: any[] = [];
    @Input() totalRepos: number = 0; // The total number of repositories from the API
    totalPages: number = 0;
    loading: boolean = false;
    @Input() currentPage: number = 1;
    @Input() pageSize: number = 6;
   // The total number of pages calculated from totalRepos
   @Output() pageChanged = new EventEmitter<number>();
    constructor(private githubService: GithubService) {}
  
    ngOnChanges(changes: SimpleChanges):void{
        if (changes['totalRepos'] && this.totalRepos >= 0) {
            this.totalPages = Math.max(1, Math.ceil(this.totalRepos / this.pageSize));
          }
      
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
    canGoToNextPage(): boolean {
        return this.currentPage < this.totalPages;
      }
    
      canGoToPreviousPage(): boolean {
        return this.currentPage > 1;
      }
  }