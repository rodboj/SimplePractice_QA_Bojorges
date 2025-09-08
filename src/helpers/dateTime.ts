import { Locator, Page, expect } from '@playwright/test';

export async function setDueTime(
  page: Page,
  due: Date,
  timePickerInput: Locator,
  timePickerContainer?: Locator
) {
  // Formatting (due) hour "h:mm AM/PM"
  const h = due.getHours();
  const m = due.getMinutes();
  const ampm = h >= 12 ? 'PM' : 'AM';
  const h12 = h % 12 === 0 ? 12 : h % 12;
  const timeStr = `${h12}:${m.toString().padStart(2, '0')} ${ampm}`;

  await expect(timePickerInput).toBeVisible();
  
  // If input is disabled, try to enabled it
  const isDisabled = await timePickerInput.evaluate((el: HTMLInputElement) => el.hasAttribute('disabled'));
  if (isDisabled) {
    try {
      const inputId = await timePickerInput.getAttribute('id');
      if (inputId) {
        const label = page.locator(`label[for="${inputId}"]`).first();
        if (await label.isVisible()) {
          await label.click();
        }
      }
    } catch {}

    // Check if is enabled
    const stillDisabled = await timePickerInput.evaluate((el: HTMLInputElement) => el.hasAttribute('disabled'));
    if (stillDisabled) {
      return; // Continue if the hour is optional
    }
  }

  // Input Enabled, fill the time
  await timePickerInput.fill('');
  await timePickerInput.fill(timeStr);
  await timePickerInput.press('Tab').catch(() => {});
}
