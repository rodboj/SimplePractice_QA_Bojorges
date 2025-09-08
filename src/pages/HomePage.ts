import { Page, Locator, expect } from '@playwright/test';
import { TasksPage } from './TasksPage';  

export class HomePage {
  public page: Page;
  //  Locators
  public CollapseButton: Locator;
  public HomePageLogo: Locator;
  public Calendar: Locator;
  public Clients: Locator;
  public Analytics: Locator;
  public Settings: Locator;
  public Notifications: Locator;
  public Tasks: Locator;
  public Requests: Locator;
  public Inquiries: Locator;

  // Initializing locators on constructor
  constructor(page: Page) {
    this.page = page;
    this.CollapseButton = page.locator('#collapse-button');
    this.HomePageLogo = page.locator('.sp-logo');
    // CS Selector examples
    this.Calendar = page.locator('a[aria-label="Calendar"]');
    this.Clients = page.locator('a[aria-label="Clients"]'); 
    this.Analytics = page.locator('a[aria-label="Analytics"]');
    this.Settings = page.locator('a[aria-label="Settings"]');
    // Role Selector
    this.Notifications = page.getByRole('button', { name: /Notifications/ });
    this.Tasks = page.getByRole('link', { name: 'Tasks', exact: true });
    this.Requests = page.getByRole('link', { name: 'Requests', exact: true });
    this.Inquiries = page.getByRole('link', { name: 'Inquiries', exact: true });
    // Avoided XPath and dynamic attributes like id="ember53" or class="ember-view",
    // since they are auto-generated and brittle. Using role-based locators is more stable and aligned with  best practices. 
    // End locators
  }

  async VerifyHomePage(){
    await expect(this.HomePageLogo).toBeVisible();
    await expect(this.Calendar).toBeVisible();
    await expect(this.Clients).toBeVisible();
    await expect(this.Settings).toBeVisible();
    await expect(this.Notifications).toBeVisible();
    await expect(this.Tasks).toBeVisible();
    await expect(this.Requests).toBeVisible();
    await expect(this.Inquiries).toBeVisible();
  }

  async goToTasks() {
    await this.Tasks.click();
    const home = new TasksPage(this.page);    
    await expect(home.TasksHeader).toBeVisible();
  }
}
