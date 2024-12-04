import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  Beers: any[] = [];
  constructor(private http: HttpClient) {}
  ngOnInit(): void {
    this.http.get<any>('https://localhost:7136/api/Beers').subscribe({
      next: (data) => {
        this.Beers = data;
      },
      error: (error) => {
        console.log(error);
      },
    });
  }
}
