import { Component, OnInit } from '@angular/core';
import { SlimLoadingBarService } from 'ng2-slim-loading-bar';
import {
  NavigationCancel,
  Event,
  NavigationEnd,
  NavigationError,
  NavigationStart,
  Router
} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'MEANSinglePageProject';

  destroyToken() {
    window.localStorage.removeItem('jwtToken');
  }

  logout() {
    if (confirm('Voulez-vous se déconnecter ?')) {
      this.destroyToken();
      this._router.navigate(['/']);
    }
  }

  constructor(
    private _loadingBar: SlimLoadingBarService,
    private _router: Router
  ) {
    this._router.events.subscribe((event: Event) => {
      this.navigationInterceptor(event);
    });
  }

  ngOnInit() {}

  private navigationInterceptor(event: Event): void {
    if (event instanceof NavigationStart) {
      this._loadingBar.start();
    }
    if (event instanceof NavigationEnd) {
      this._loadingBar.complete();
    }
    if (event instanceof NavigationCancel) {
      this._loadingBar.stop();
    }
    if (event instanceof NavigationError) {
      this._loadingBar.stop();
    }
  }

  loggedInChecker() {
    if (this._router.url !== '/') {
      if (
        !window.localStorage['jwtToken'] ||
        window.localStorage['jwtToken'] === ''
      ) {
        this._router.navigate(['/']);
        return false;
      }
      return true;
    }
  }
}
