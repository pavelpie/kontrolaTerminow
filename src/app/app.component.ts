import {Component, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import {MainServiceService} from "./services/main-service.service";
import {HttpClientModule} from "@angular/common/http";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, HttpClientModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'kontrolaTerminow';
  loading = false;

  constructor(private serwis: MainServiceService) {

  }

  ngOnInit(): void {
    this.odpalLogin();
  }

  private odpalLogin() {
    this.serwis.checkLogin()
      .subscribe({
        next: (d: any) => {
          console.log(d);
        },
        error: (d: any) => {
          console.error(d);
          if (this.serwis.checkIfUnauthenticatedAndRedirectIfSo(d)) return;
        }
      });


    this.serwis.refreshCsrfToken()
      .subscribe({
        next: (d: any) => {
          console.log(d);
        },
        error: (d: any) => {
          console.error(d);
        }
      });
  }


  wczytajKontrolaTerminowRejestr() {
    this.loading = true;
    this.serwis.zapytaj_o('kontrola_terminow_rejestr', {})
     .subscribe({
         next: (d: any) => {
             this.loading = false;
         },
         error: (d: any) => {
             this.loading = false;
             alert('Błąd wczytywania danych');
             console.error(d);
         }
         }
     );
  }
}
