import { Component } from '@angular/core';
import {Router} from "@angular/router";
import {AuthenticationService} from "../../services/authentication.service";
import {MatButton} from "@angular/material/button";

/**
 * Authentication section component
 */
@Component({
  selector: 'app-authentication-section',
  standalone: true,
  imports: [
    MatButton
  ],
  templateUrl: './authentication-section.component.html',
  styleUrl: './authentication-section.component.css'
})
export class AuthenticationSectionComponent {
  currentUsername: string = '';
  isSignedIn: boolean = false;

  /**
   * Constructor
   * @param router the router
   * @param authenticationService the authentication service
   */
  constructor(private router: Router, private authenticationService: AuthenticationService) {
    this.authenticationService.currentUsername.subscribe(username => this.currentUsername = username);
    this.authenticationService.isSignedIn.subscribe(isSignedIn => this.isSignedIn = isSignedIn);
  }

  /**
   * Sign In Event Handler
   */
  onSignIn() {
    this.router.navigate(['/sign-in']).then();
  }

  /**
   * Sign Up Event Handler
   */
  onSignUp() {
    this.router.navigate(['/sign-up']).then();
  }

  /**
   * Sign Out Event Handler
   */
  onSignOut() {
    this.authenticationService.signOut();
  }
}
