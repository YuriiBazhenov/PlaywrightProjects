
import {test as base} from '@playwright/test'
import { FormElements } from '../pages/FormElements'
import { LoginFunction } from '../pages/LoginFunction'
import { BookingFunction } from '../pages/BookingFunction'

type MyFixture = {
    formElements: FormElements
    loginFunction: LoginFunction
    bookingFunction: BookingFunction
}

// Extend the base test to include your custom fixtures.
export const test = base.extend<MyFixture>({
    // Define the fixture name and provide the fixture function
    formElements: async ({ page }, use) => {
      // Create the todoPage fixture instance
      const formElements = new FormElements(page)
  
      // This is the Setup Phase (beforeEach)
      await formElements.goto()
      // Test runner pauses the execution to allow your test to perform actions
      await use(formElements)
  
      // Teardown logic is here to remove all items.
    
    },
    loginFunction: async ({ page }, use) => {
      // Create the todoPage fixture instance
      const loginFunction = new LoginFunction(page)
  
      // This is the Setup Phase (beforeEach)
      await loginFunction.goto()
      // Test runner pauses the execution to allow your test to perform actions
      await use(loginFunction)
  
      // Teardown logic is here to remove all items.
    
    },
    bookingFunction: async ({ page }, use) => {
      // Create the todoPage fixture instance
      const bookingFunction = new BookingFunction(page)
  
      // This is the Setup Phase (beforeEach)
      await bookingFunction.goto()
      // Test runner pauses the execution to allow your test to perform actions
      await use(bookingFunction)
  
      // Teardown logic is here to remove all items.
    
    },
  })
  
  export { expect } from '@playwright/test'