import { test, expect } from '../../fixtures/page-object-fixtures'

test.describe('Project 2', () => {
  test('Test Case 01 - Validate the default Book your trip form', async ({ bookingFunction, page }) => {
    await bookingFunction.goto()
    await expect(bookingFunction.radioButton.getByText('One way')).toBeVisible()
    await expect(bookingFunction.radioButton.getByText('One way')).toBeEnabled()
    await expect(bookingFunction.radioButton.getByText('One way')).toBeChecked()

    await expect(bookingFunction.radioButton.getByText('Round trip')).toBeVisible()
    await expect(bookingFunction.radioButton.getByText('Round trip')).toBeEnabled()
    await expect(bookingFunction.radioButton.getByText('Round trip')).not.toBeChecked()

    const countEle = await bookingFunction.labelDropDown.count()

    for (let i = 0; i < countEle; i++) {
      await expect(bookingFunction.labelDropDown.nth(i)).toBeVisible()
    }

    await expect(bookingFunction.returnInput).toBeDisabled()

    await expect(bookingFunction.psgNumberDropDwn.nth(0)).toHaveText('1')
    await expect(bookingFunction.psgAgeDropDwn.nth(0)).toHaveText('Adult (16-64)')

    await expect(bookingFunction.bookBtn).toBeVisible()
    // await expect(bookingFunction.bookBtn).toBeEnabled()
  })

  test('Test Case 02 - Validate the Book your trip form when Round trip is selected', async ({
    bookingFunction,
    page,
  }) => {
    await bookingFunction.radioBtnClick('Round trip')
    await expect(bookingFunction.radioButton.getByText('One way')).not.toBeChecked()

    const countEle = await bookingFunction.labelDropDown.count()

    for (let i = 0; i < countEle; i++) {
      await expect(bookingFunction.labelDropDown.nth(i)).toBeVisible()
    }
    await expect(bookingFunction.departInput).toBeVisible()
    await expect(bookingFunction.returnInput).toBeVisible()

    await expect(bookingFunction.psgNumberDropDwn.nth(0)).toHaveText('1')
    await expect(bookingFunction.psgAgeDropDwn.nth(0)).toHaveText('Adult (16-64)')
    await expect(bookingFunction.bookBtn).toBeVisible()
  })

  test('Test Case 03 - Validate the booking for 1 passenger and one way', async ({ bookingFunction, page }) => {
    const data: string[] = ['Business', 'Illinois', 'Florida', '1', 'Senior (65+)']

    await bookingFunction.radioBtnClick('One Way')

    await bookingFunction.inputSelect(data)

    await bookingFunction.departInput.fill(bookingFunction.getDate(0, 1))

    await bookingFunction.BookButton()

    // const confirmData = [
    //   'DEPART',
    //   'IL to FL',
    //   bookingFunction.getformattedDate(0),
    //   'Number of Passengers: 1',
    //   'Passenger 1: Senior (65+)',
    //   'Cabin class: Business',
    // ]

    // await expect(page.locator('.ml-3 *')).toContainText(confirmData)
  })

  test('Test Case 04 - Validate the booking for 1 passenger and round trip', async ({ bookingFunction, page }) => {
    await bookingFunction.radioBtnClick('Round trip')

    const data: string[] = ['First', 'California', 'Illinois', '1', 'Adult (16-64)']

    await bookingFunction.inputSelect(data)

    await bookingFunction.departInput.fill(bookingFunction.getDate(0, 1))

    await bookingFunction.returnInput.fill(bookingFunction.getDate(0, 2))

    
  })

  test.only('Test Case 05 - Validate the booking for 2 passengers and one way', async ({ bookingFunction, page }) => {
    await bookingFunction.radioBtnClick('Round trip')

    const data: string[] = ['First', 'California', 'Illinois', '1', 'Adult (16-64)']

    await bookingFunction.inputSelect(data)

    await bookingFunction.departInput.fill(bookingFunction.getDate(0, 1))

    await bookingFunction.returnInput.fill(bookingFunction.getDate(0, 2))

    
  })
})
