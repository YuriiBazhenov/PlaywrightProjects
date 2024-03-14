import { type Locator, type Page } from '@playwright/test'

export class FormElements {
  readonly page: Page
  readonly contactInfo: Locator
  readonly label: Locator
  readonly input: Locator 
  readonly radioButton: Locator
  readonly radioButtonClick: Locator
  readonly validMessage: Locator


  constructor(page: Page) {
    this.page = page
    this.contactInfo = page.locator('.mb-5 *')
    this.label = page.locator('.label')
    this.radioButton = page.locator('.radio')
    this.radioButtonClick = page.locator('.mr-1')
    this.input = page.locator('.control')
    this.validMessage = page.locator('.mt-5')

  }
  async goto() {
    await this.page.goto(process.env.Form_Elements_URL)
  }

  async checkBoxClick(){
    await this.input.getByText('I give my consent to be').click()
  }

  async fillField(placeHolder: string[], data: string[]){
    for(let i = 0; i < placeHolder.length; i++){
        await this.input.getByPlaceholder(placeHolder[i]).fill(data[i])
    }
    
  }
  async clickButton(arg: string){
    await this.input.getByText(arg).click()
}
}

