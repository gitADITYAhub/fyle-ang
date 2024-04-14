// src/app/search-user/search-user.component.ts

import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-search-user',
  template: `
  <div class="flex justify-center items-center p-6">
  <div class="flex border-2 border-blue-500 rounded overflow-hidden">
    <input type="text" [(ngModel)]="username"
      class="px-4 py-2 w-80 outline-none" 
      placeholder="GitHub Username" />
    <button (click)="search()" 
      class="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 transition-colors duration-300">
      Search
    </button>
  </div>
</div>
  `,
  styles: [
    `.input { padding: 0.5rem; border: 1px solid #ddd; border-radius: 0.25rem; }`,
    `.btn { padding: 0.5rem 1rem; border: none; border-radius: 0.25rem; background-color: #007bff; color: white; cursor: pointer; }`
  ]
})
export class SearchUserComponent {
  @Output() searchEvent = new EventEmitter<string>();
  username: string = '';

  search() {
    this.searchEvent.emit(this.username);
  }
}
