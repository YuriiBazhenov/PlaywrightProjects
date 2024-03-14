import { expect, test } from '../../fixtures/page-object-fixtures'

test.describe('Project2', () => {
  test('Test Case 01 - Validate the login form', async ({ loginFunction, page }) => {
    /*
Navigate to https://techglobal-training.com/frontend/project-2
Validate that the username input box is displayed
Validate that the username input box is not required
Validate that the label of the username input box is “Please enter your username”
Validate that the password input box is displayed
Validate that the password input box is not required
Validate that the label of the password input box is “Please enter your password”
Validate the “LOGIN” button is displayed
Validate the “LOGIN” button is clickable
Validate that the button text is “LOGIN”
Validate the “Forgot Password?” link is displayed
Validate that the “Forgot Password?” link is clickable
Validate that the link text is “Forgot Password?”
    */
    await loginFunction.goto()
    await expect(loginFunction.userNameField).toBeVisible()
    await expect(loginFunction.userNameField).not.toHaveAttribute('required')
    await expect(loginFunction.userNameLabel).toHaveText('Please enter your username')

    await expect(loginFunction.passwordField).toBeVisible()
    await expect(loginFunction.passwordField).not.toHaveAttribute('required')
    await expect(loginFunction.passwordLabel).toHaveText('Please enter your password')

    await expect(loginFunction.lgnButton).toBeVisible()
    await expect(loginFunction.lgnButton).toBeEnabled()
    await expect(loginFunction.lgnButton).toHaveText('LOGIN')

    await expect(loginFunction.forgotPassword).toBeVisible()
    await expect(loginFunction.forgotPassword).toBeEnabled()
    await expect(loginFunction.forgotPassword).toHaveText('Forgot Password?')
  })
  test('Test Case 02 - Validate the valid login', async ({ loginFunction, page }) => {
    /*
Navigate to https://techglobal-training.com/frontend/project-2
Enter the username as “TechGlobal”
Enter the password as “Test1234”
Click on the “LOGIN” button
Validate the success message is displayed as “You are logged in”
Validate the logout button displayed with the text “LOGOUT”
    */
    await loginFunction.fieldFill(process.env.USERNAME, process.env.PASSWORD)

    await expect(loginFunction.success_lgn).toHaveText('You are logged in')
    await expect(loginFunction.logOutBtn).toHaveText('LOGOUT')
  })
  test('Test Case 03 - Validate the logout', async ({ loginFunction, page }) => {
    /*
Navigate to https://techglobal-training.com/frontend/project-2
Enter the username as “TechGlobal”
Enter the password as “Test1234”
Click on the “LOGIN” button
Click on the “LOGOUT” button
Validate that the login form is displayed
    */
    await loginFunction.fieldFill(process.env.USERNAME, process.env.PASSWORD)

    await loginFunction.clickButton('logoutClick')

    await expect(loginFunction.success_lgn).not.toBeVisible()
  })

  test('Test Case 04 - Validate the Forgot Password? Link and Reset Password modal', async ({
    /*
Navigate to https://techglobal-training.com/frontend/project-2
Click on the “Forgot Password?” link
Validate that the modal heading “Reset Password” is displayed
Validate that the close button is displayed
Validate that the email input box is displayed
Validate that the label of the email input box is “Enter your email address and we'll send you a link to reset your password.”
Validate the “SUBMIT” button is displayed
Validate the “SUBMIT” button is clickable
Validate that the button text is “SUBMIT”
    */
    loginFunction,
    page,
  }) => {
    await loginFunction.clickButton('forgotPasswordClick')
    await expect(loginFunction.modalTitle).toHaveText('Reset Password')
    await expect(loginFunction.closeBtn).toBeVisible()
    await expect(loginFunction.emailInput).toBeVisible()
    //     await expect(loginFunction.emailInput.getByText("Enter your email address and we'll send you a link to reset your password.")).toHaveText("Enter your email address and we'll send you a link to reset your password.")
    await expect(loginFunction.sbmButton).toBeVisible()
    await expect(loginFunction.sbmButton).toBeEnabled()
    await expect(loginFunction.sbmButton).toHaveText('SUBMIT')
  })

  test('Test Case 05 - Validate the Reset Password modal close button', async ({ loginFunction, page }) => {
    /*
Navigate to https://techglobal-training.com/frontend/project-2
Click on the “Forgot Password?” link
Validate that the “Reset Password” modal is displayed
Click on the close button
Validate that the “Reset Password” modal is closed
    */
    await loginFunction.clickButton('forgotPasswordClick')
    await expect(loginFunction.modalHeading).toHaveText('Reset Password')
    await loginFunction.clickButton('closeClick')
    await expect(loginFunction.modalTitle).not.toBeVisible()
  })

  test('Test Case 06 - Validate the Reset Password form submission', async ({ loginFunction, page }) => {
    /*
Navigate to https://techglobal-training.com/frontend/project-2
Click on the “Forgot Password?” link
Enter an email
Click on the “SUBMIT” button
Validate the form message “A link to reset your password has been sent to your email address.” is displayed under the “SUBMIT” button
    */
    await loginFunction.resetPswVld(
      'johndoe@gmail.com',
      'A link to reset your password has been sent to your email address.',
    )
  })
  test('Test Case 07 - Validate the invalid login with the empty credentials', async ({ loginFunction, page }) => {
    /*
Navigate to https://techglobal-training.com/frontend/project-2
Leave username empty
Leave password empty
Click on the “LOGIN” button
Validate the failure message is displayed as “Invalid Username entered!” above the form
    */

    /*
Navigate to https://techglobal-training.com/frontend/project-2
Enter the username as “John”
Enter the password as “Test1234”
Click on the “LOGIN” button
Validate the failure message is displayed as “Invalid Username entered!” above the form
*/

    /*
Navigate to https://techglobal-training.com/frontend/project-2
Enter the username as “TechGlobal”
Enter the password as “1234”
Click on the “LOGIN” button
Validate the failure message is displayed as “Invalid Password entered!” above the form
*/

    /*
Navigate to https://techglobal-training.com/frontend/project-2
Enter the username as “John”
Enter the password as “1234”
Click on the “LOGIN” button
Validate the failure message is displayed as “Invalid Username entered!” above the form
*/
    await loginFunction.clickButton('loginClick')
    await expect(loginFunction.errorMsg).toHaveText('Invalid Username entered!')
  })

  const invalidLoginData = [
    {
      username: 'John',
      password: 'Test1234',
      message: 'Invalid Username entered!',
    },
    {
      username: 'TechGlobal',
      password: '1234',
      message: 'Invalid Password entered!',
    },
    {
      username: 'John',
      password: '1234',
      message: 'Invalid Username entered!',
    },
  ]

  invalidLoginData.forEach((data, index) => {
    test(`Test Case 0${index + 7} - Validate login for username: ${
      data.username
    } and password: ${data.password}`, async ({ loginFunction }) => {
      await loginFunction.fieldFill(data.username, data.password)
      await expect(loginFunction.errorMsg).toHaveText(data.message)
    })
  })
})
 