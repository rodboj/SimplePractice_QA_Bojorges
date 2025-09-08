import { test } from '@playwright/test';
import { LoginPage } from '../src/pages/LoginPage';
import { HomePage } from '../src/pages/HomePage';
import { TasksPage } from '../src/pages/TasksPage';

const email = process.env.SP_EMAIL as string;
const password = process.env.SP_PASSWORD as string;

test('Tasks happy path: login → create → complete', async ({ page }) => {
  test.skip(!email || !password, 'SP_EMAIL and SP_PASSWORD must be set in environment');

  const login = new LoginPage(page);
  const home = new HomePage(page);
  const tasks = new TasksPage(page);


  await login.goto();
  // await login.invalidLogin(email, password);
  // await login.assertInvalidLogin();
  await login.login(email, password);
  await login.assertLoggedIn();

  await home.VerifyHomePage();
  await home.goToTasks();

  await tasks.VerifyTasksPage();
  const now = new Date();
  const title = `AutoTask ${now.toISOString().replace(/[-:T.Z]/g,'').slice(0,14)}`;
  const note = `Created by Playwright at ${now.toISOString()}`;
  await tasks.createTask(title, now, note);
  await tasks.completeTask(title);
  await tasks.ValidateCompletedTask(title);
});
