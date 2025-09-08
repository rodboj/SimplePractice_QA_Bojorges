import { Locator, Page, expect } from '@playwright/test';
import { setDueTime } from '../helpers/dateTime';

export class TasksPage {

  public TasksHeader: Locator;
  public TaskSearchInput: Locator;
  public TaskStatusFilter: Locator;
  public TaskAsigneeFilter: Locator;
  public TaskDueFilter: Locator;
  public CreateTaskButton: Locator;
  public AddQuickTaskButton: Locator;
  public TaskNameField: Locator;
  public TaskDescriptionField: Locator;
  public DueDateField: Locator;
  public DueHourField: Locator;
  public DueHourContainer: Locator;
  public PriorityField: Locator;
  public ClientField: Locator;
  public AssigneeField: Locator;
  public CancelTaskButton: Locator;
  public SaveTaskButton: Locator;
  public ErrorMessage: Locator;
  // Dynamic locators:
  public TaskRowByTitle: (title: string) => Locator; // Search the row by title
  public TaskCircleByTitle: (title: string) => Locator; // Search the circle associated with the title

  constructor(private page: Page) {
    this.TasksHeader = page.getByRole('heading', { level: 1, name: /^tasks$/i });
    this.TaskSearchInput = page.locator('input.utility-search');
    this.TaskStatusFilter = page.getByRole('button', { name: /incomplete|all|completed/i })
      .or(page.locator('button.utility-button-style', { hasText: /incomplete/i }));
    this.TaskAsigneeFilter = page.getByRole('button', { name: 'Assigned to you' });
    this.TaskDueFilter = page.getByRole('button', { name: 'Custom' });
    this.CreateTaskButton = page.getByRole('link', { name: 'Create task' });
    this.AddQuickTaskButton = page.getByRole('button', { name: 'Add quick task' });
    this.TaskNameField = page.locator('#title');
    this.TaskDescriptionField = page.locator('#description');
    this.DueDateField = page.getByRole('textbox', { name: 'Date picker' });
    this.DueHourField = page.locator('input.spds-time-input-text#timePicker');
    this.DueHourContainer = page.locator('.time-picker-module_component__F-7kD');
    this.PriorityField = page.locator('button.spds-input-dropdown-list-trigger');
    this.ClientField = page.locator('div.select-box__selected-option.typeahead-trigger', { hasText: 'Select client' })
      .or(page.getByRole('button', { name: /select client/i }));
    this.AssigneeField = page.locator('div.select-box__selected-option.typeahead-trigger', { hasText: 'Add team members' })
      .or(page.getByRole('button', { name: /add team members/i }));
    this.CancelTaskButton = page.getByRole('button', { name: /^cancel$/i });
    this.SaveTaskButton = page.getByRole('button', { name: /^save$/i });
    this.ErrorMessage = this.page.locator('div.error');
     // Dynamic
    this.TaskRowByTitle = (title: string) =>
      page.locator('.list-item').filter({ hasText: new RegExp(title, 'i') }).first();

    this.TaskCircleByTitle = (title: string) =>
      this.TaskRowByTitle(title).locator('.checkable-circle').first();
  }

  async VerifyTasksPage() {
    await expect(this.TasksHeader).toBeVisible();
    await expect(this.TaskSearchInput).toBeVisible();
    await expect(this.TaskStatusFilter).toBeVisible();
    await expect(this.TaskAsigneeFilter).toBeVisible();
    await expect(this.TaskDueFilter).toBeVisible();
    await expect(this.CreateTaskButton).toBeVisible();
  }

  async VerifyNewTaskTab() {
    await this.CreateTaskButton.click();
    await expect(this.TaskNameField).toBeVisible();
    await expect(this.TaskDescriptionField).toBeVisible();
    await expect(this.DueDateField).toBeVisible();
    await expect(this.DueHourField).toBeVisible();
    await expect(this.PriorityField).toBeVisible();
    await expect(this.ClientField).toBeVisible();
    await expect(this.AssigneeField).toBeVisible();
    await expect(this.CancelTaskButton).toBeVisible();
    await expect(this.SaveTaskButton).toBeVisible();
    await this.SaveTaskButton.click();
    await expect(this.ErrorMessage).toContainText("can't be blank");
  }

  async createTask(title: string, due?: Date, note?: string) {
    await this.VerifyNewTaskTab();
    await this.TaskNameField.fill(title);
    if (note) {
      await this.TaskDescriptionField.fill(note);
    }
    if (due) {
      const month = due.toLocaleString('en-US', { month: 'short' });
      const day = due.getDate();
      const year = due.getFullYear();
      const dateStr = `${month} ${day}, ${year}`;
      await this.DueDateField.fill(dateStr);
      await setDueTime(this.page, due, this.DueHourField, this.DueHourContainer);
    }
    await this.SaveTaskButton.click();
    console.log(`Task Created:   ${title}`);
  }


async completeTask(title: string) {
  const row = this.TaskRowByTitle(title);
  await expect(row).toBeVisible({ timeout: 15_000 });
  await row.scrollIntoViewIfNeeded().catch(() => {});
  const circle = this.TaskCircleByTitle(title);
  await circle.click({ force: true }); 
  const cb = row.locator('input[type="checkbox"]').first();
  await expect(cb).toBeChecked({ timeout: 3_000 });
}

async ValidateCompletedTask(title: string) {
  await expect(this.TaskStatusFilter).toBeVisible();
  await this.TaskStatusFilter.click();
  await this.page.getByRole('button', { name: 'Completed' }).click();
  await expect(this.TaskSearchInput).toBeVisible();
  await this.TaskSearchInput.fill(title);
  await expect(this.TaskRowByTitle(title)).toBeVisible({ timeout: 10_000 });
  await expect(this.TaskRowByTitle(title)).toHaveText(new RegExp(title, 'i'));
  const cb = this.TaskRowByTitle(title).locator('input[type="checkbox"]');
  await expect(cb).toBeChecked();
  const text = await this.TaskRowByTitle(title).innerText();
  console.log(`Task Completed: ${text}`);

  }
}
