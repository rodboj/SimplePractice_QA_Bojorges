import { Page, Locator, expect } from '@playwright/test';
import { HomePage } from './HomePage';  

export class LoginPage {
  private page: Page;
  //  Locators
  private emailField: Locator;
  private passwordField: Locator;
  private submitButton: Locator;
  private errorBanner: Locator;  
  
  // Initializing locators on constructor
  constructor(page: Page) {
    this.page = page;
    // Locators by ID's and Classes
    this.emailField = page.locator('#user_email');
    this.passwordField = page.locator('#user_password');
    this.submitButton = page.locator('#submitBtn');
    this.errorBanner = page.locator('.alert.alert-error');

  }

  // Go to URL Login Page
  async goto() {
    await this.page.goto('/');
  }
  
  // Invalid login attempt with wrong password
  async invalidLogin(email: string, password: string) {
    await expect(this.emailField).toBeVisible();
    await this.emailField.fill(email);
    await expect(this.passwordField).toBeVisible();
    await this.passwordField.fill("IncorrectPassword");
    await expect(this.submitButton).toBeVisible();
    await this.submitButton.click();
  }
  // Assert error message is shown for invalid login
  async assertInvalidLogin() {
    await expect(this.errorBanner).toBeVisible();
    await expect(this.errorBanner).toContainText("Couldn't sign in");
  }

  // There are more cases assosiated with the login, as: empty fileds, invalid email, specials characters, blocked account or even forgot password
  // but for now we will focus on the happy path


  async login(email: string, password: string) {
    // Check and fill email and password fields and submit
    await expect(this.emailField).toBeVisible();
    await this.emailField.fill(email);
    await expect(this.passwordField).toBeVisible();
    await this.passwordField.fill(password);
    await expect(this.submitButton).toBeVisible();
    await this.submitButton.click();
  }

  async assertLoggedIn() {
    // Wait for navigation away from auth routes and into the app
    await this.page.waitForLoadState('domcontentloaded');
    await expect(this.page).not.toHaveURL(/\/(login|signin|session)\b/i);
    // Prefer asserting the expected destination:
    await this.page.waitForURL('**/calendar/appointments*');
    const home = new HomePage(this.page);    
    await expect(home.HomePageLogo).toBeVisible();
    }
 }

