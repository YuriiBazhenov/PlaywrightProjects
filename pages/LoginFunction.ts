import { type Page, type Locator, expect } from '@playwright/test'
import { FormElements } from './FormElements'

export class LoginFunction extends FormElements {
  readonly userNameField: Locator
  readonly passwordField: Locator
  readonly heading: Locator
  readonly lgnButton: Locator
  readonly lgnButtonLabel: Locator
  readonly userNameLabel: Locator
  readonly passwordLabel: Locator
  readonly forgotPassword: Locator
  readonly success_lgn: Locator
  readonly logOutBtn: Locator
  readonly modalTitle: Locator
  readonly closeBtn: Locator
  readonly emailInput: Locator
  readonly sbmButton: Locator
  readonly modalHeading: Locator
  readonly errorMsg: Locator
  readonly confirmMsg: Locator

  constructor(page: Page) {
    super(page)
    this.userNameField = page.locator('#username')
    this.passwordField = page.locator('#password')
    this.heading = page.locator('.is-size-3')
    this.lgnButton = page.locator('#login_btn')
    this.userNameLabel = page.getByText('Please enter your username')
    this.passwordLabel = page.getByText('Please enter your password')
    this.forgotPassword = page.getByRole('link', { name: 'Forgot Password?' })
    this.success_lgn = page.locator('#success_lgn')
    this.logOutBtn = page.locator('#logout')
    this.modalTitle = page.locator('#modal_title')
    this.closeBtn = page.getByLabel('close')
    this.emailInput = page.locator('#email')
    this.sbmButton = page.locator('#submit')
    this.modalHeading = page.locator('#sub_heading')
    this.errorMsg = page.locator('#error_message')
    this.confirmMsg = page.locator('#confirmation_message')
  }

  async goto() {
    await this.page.goto(process.env.Login_Function_URL)
  }

  async lgnBtn() {
    await this.lgnButton.click()
  }

  async fieldFill(arg: string, arg1: string) {
    await this.userNameField.fill(arg)
    await this.passwordField.fill(arg1)
    await this.lgnBtn()
  }

  async clickButton(arg: string) {
    switch (arg) {
      case 'loginClick':
        return await this.lgnButton.click()
      case 'forgotPasswordClick':
        return await this.forgotPassword.click()
      case 'closeClick':
        return await this.closeBtn.click()
      case 'submitClick':
        return await this.sbmButton.click()
        case 'logoutClick':
        return await this.logOutBtn.click()
    }
  }

  async resetPswVld(arg1: string, arg2: string){
    await this.forgotPassword.click()
    await this.emailInput.fill(arg1)
    await this.sbmButton.click()
    await expect(this.confirmMsg).toHaveText(arg2)
  }


}


