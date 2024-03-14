import { type Locator, type Page } from '@playwright/test'
import { LoginFunction } from './LoginFunction'

export class BookingFunction extends LoginFunction {
  readonly radioButton: Locator
  readonly labelDropDown: Locator
  readonly psgNumberDropDwn: Locator
  readonly psgAgeDropDwn: Locator
  readonly departInput: Locator
  readonly returnInput: Locator
  readonly bookBtn: Locator
  readonly inputFill: Locator
  readonly bookingInfo: Locator

  constructor(page: Page) {
    super(page)
    this.radioButton = page.locator('.radio')
    this.labelDropDown = page.locator('.field > label, select')
    this.psgNumberDropDwn = page.locator('.field:nth-child(7) option')
    this.psgAgeDropDwn = page.locator('.field:nth-child(8) option')
    this.departInput = page.locator('.field:nth-child(5) input')
    this.returnInput = page.locator('.field:nth-child(6) input')
    this.bookBtn = page.getByRole('button', { name: 'BOOK' })
    this.inputFill = page.locator('.field select')
    this.bookingInfo = page.locator('.ml-3 *')

  }

  async goto() {
    await this.page.goto(process.env.Booking_Function_URL)
  }

  async BookButton() {
    await this.bookBtn.click()
  }
  async radioBtnClick(arg: string) {
    await this.radioButton.getByLabel(arg).click()
  }

  async inputSelect(data: string[]) {
    for (let i = 0; i < await this.inputFill.count(); i++) {
      await this.inputFill.nth(i).selectOption(data[i]) 
    }
  }

  getDate(DateNum: number, MonthNum: number){
    const date = new Date()
    let currentDay = String(date.getDate() + DateNum)
    let currentMonth = String(date.getMonth() + MonthNum)
    let currentYear = date.getFullYear()
    return (`${currentMonth}/${currentDay}/${currentYear}`)
}

getformattedDate(num: number){
  const today = new Date();
  const formattedDate1 = new Date(today.getFullYear(), today.getMonth(), today.getDate() + num).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' })
  const formattedDate2 = formattedDate1.toString().replaceAll(",", "")
  return formattedDate2
  }


}


