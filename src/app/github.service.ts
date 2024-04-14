// src/app/github.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class GithubService {
  private baseURL: string = 'https://api.github.com/users';

  constructor(private http: HttpClient) {}

  getRepositories(username: string, page: number = 1, pageSize: number = 10): Observable<any> {
    const url = `${this.baseURL}/${username}/repos?page=${page}&per_page=${pageSize}`;
    return this.http.get(url).pipe(
      map(response => response) // You can process the response if needed
    );
  }
  getUser(username: string): Observable<any> {
  const url = `${this.baseURL}/${username}`;
  return this.http.get(url).pipe(
    map(response => response)
  );
}
}
