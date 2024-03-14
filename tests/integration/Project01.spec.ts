
import { expect, test } from '../../fixtures/page-object-fixtures'

test.describe('Project1', () => {
  test('Test Case 01 - Validate the Contact Us information', async ({ formElements, page }) => {
    await formElements.goto()

    await expect(page).toHaveURL('https://techglobal-training.com/frontend/project-1')

    const arr = [
      'Contact Us',
      '2800 S River Rd Suite 310, Des Plaines, IL 60018',
      'info@techglobalschool.com',
      '(224) 580-2150',
    ]

    await expect(formElements.contactInfo).toHaveText(arr)
  })

  test('Test Case 02 - Validate the Full name input box', async ({ formElements, page }) => {
    await expect(formElements.input.getByPlaceholder('Enter your full name')).toBeVisible()
    await expect(formElements.input.getByPlaceholder('Enter your full name')).toHaveAttribute('required')
    await expect(formElements.input.getByPlaceholder('Enter your full name')).toHaveAttribute(
      'placeholder',
      'Enter your full name',
    )
    await expect(formElements.label.filter({ hasText: 'Full name *' })).toHaveText('Full name *')
  })

  test('Test Case 03 - Validate the Gender radio button', async ({ formElements, page }) => {
    await expect(formElements.label.filter({ hasText: 'Gender *' })).toHaveText('Gender *')
    await expect(formElements.label.filter({ hasText: 'Gender *' })).not.toHaveAttribute('Gender *')
    const buttons = ['Male', 'Female', 'Prefer not to disclose']

    await expect(formElements.radioButton).toHaveText(buttons)

    const countEl = await formElements.radioButtonClick.count()

    for (let i = 0; i < countEl; i++) {
      await expect(formElements.radioButtonClick.nth(i)).not.toBeChecked()
      await expect(formElements.radioButtonClick.nth(i)).toBeEnabled()
    }

    await page.getByLabel('Male', { exact: true }).check()
    await expect(page.getByLabel('Male', { exact: true })).toBeChecked()
    await expect(page.getByLabel('Female', { exact: true })).not.toBeChecked()
    await expect(page.getByLabel('Prefer not to disclose', { exact: true })).not.toBeChecked()

    await page.getByLabel('Female', { exact: true }).check()
    await expect(page.getByLabel('Female', { exact: true })).toBeChecked()
    await expect(page.getByLabel('Male', { exact: true })).not.toBeChecked()
    await expect(page.getByLabel('Prefer not to disclose', { exact: true })).not.toBeChecked()
  })



//   test('Test Case 04 - Validate the Address input box', async ({ formElements }) => {
//     await expect(formElements.input.getByPlaceholder('Enter your address')).toBeVisible()
//     await expect(formElements.input.getByPlaceholder('Enter your address')).not.toHaveAttribute('required')
//     await expect(formElements.label.filter({ hasText: 'Address' })).toHaveText('Address')
//     await expect(formElements.input.getByPlaceholder('Enter your address')).toHaveAttribute(
//       'placeholder',
//       'Enter your address',
//     )
//   })
//   test('Test Case 05 - Validate the Email input box', async ({ formElements }) => {
//     await expect(formElements.input.getByPlaceholder('Enter your email')).toBeVisible()
//     await expect(formElements.input.getByPlaceholder('Enter your email')).toHaveAttribute('required')
//     await expect(formElements.label.filter({ hasText: 'Email *' })).toHaveText('Email *')
//     await expect(formElements.input.getByPlaceholder('Enter your email')).toHaveAttribute(
//       'placeholder',
//       'Enter your email',
//     )
//   })
//   test('Test Case 06 - Validate the Phone input box', async ({ formElements }) => {
//     await expect(formElements.input.getByPlaceholder('Enter your phone number')).toBeVisible()
//     await expect(formElements.input.getByPlaceholder('Enter your phone number')).not.toHaveAttribute('required')
//     await expect(formElements.label.filter({ hasText: 'Phone' })).toHaveText('Phone')
//     await expect(formElements.input.getByPlaceholder('Enter your phone number')).toHaveAttribute(
//       'placeholder',
//       'Enter your phone number',
//     )
//   })
//   test('Test Case 07 - Validate the Message text area', async ({ formElements }) => {
//     await expect(formElements.input.getByPlaceholder('Type your message here...')).toBeVisible()
//     await expect(formElements.input.getByPlaceholder('Type your message here...')).not.toHaveAttribute('required')
//     await expect(formElements.label.filter({ hasText: 'Message' })).toHaveText('Message')
//     await expect(formElements.input.getByPlaceholder('Type your message here...')).toHaveAttribute(
//       'placeholder',
//       'Type your message here...',
//     )
//   })
  test('Test Case 08 - Validate the Consent checkbox', async ({ formElements, page }) => {
    await expect(formElements.input.getByText('I give my consent to be')).toHaveText(
      'I give my consent to be contacted.',
    )
    await expect(formElements.input.getByLabel('I give my consent to be').locator('nth=0')).toHaveAttribute('required')
    await expect(formElements.input.getByLabel('I give my consent to be')).toBeEnabled()

    const ele = page.locator('.control button', {hasText: 'randomName'})

    const ele2 = ele.getByRole('button', { name: 'randomName'})

    const ele3 = ele2.locator('askndksadksa')

    formElements.checkBoxClick()
    await expect(formElements.input.getByText('I give my consent to be')).toBeChecked()

    formElements.checkBoxClick()
    await expect(formElements.input.getByText('I give my consent to be')).not.toBeChecked()
  })
  test('Test Case 09 - Validate the SUBMIT button', async ({ formElements, page }) => {

    await expect(formElements.input.getByText('SUBMIT')).toBeVisible()
    await expect(formElements.input.getByText('SUBMIT')).toBeEnabled()
    await expect(formElements.input.getByText('SUBMIT')).toHaveText('SUBMIT')

  })

  test('Test Case 10 - Validate the form submission', async ({ formElements, page }) => {
    

    const placeHolder: string[] = ['Enter your full name', 'Enter your address', 'Enter your email','Enter your phone number','Type your message here...']

    const data: string[] = ['John Doe', '777 W Sun Rd', 'john@gmail.com', '773 - 777 - 0707', 'Never Give Up']

    await formElements.fillField(placeHolder,data)

    await formElements.input.getByLabel('Male', { exact: true }).check()

    await formElements.clickButton('I give my consent to be contacted.');
    await formElements.clickButton('SUBMIT');

    await expect(formElements.validMessage).toHaveText('Thanks for submitting!')


  })
})
