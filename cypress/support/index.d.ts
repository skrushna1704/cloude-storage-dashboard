/// <reference types="cypress" />

declare global {
  namespace Cypress {
    interface Chainable {
      /**
       * Custom command to get element by data-testid
       * @example cy.getByData('button-submit')
       */
      getByData(testId: string): Chainable<JQuery<HTMLElement>>
      
      /**
       * Custom command to login to the app
       * @example cy.login()
       */
      login(): Chainable<void>
      
      /**
       * Custom command to navigate to buckets page
       * @example cy.visitBuckets()
       */
      visitBuckets(): Chainable<void>
      
      /**
       * Custom command to navigate to analytics page
       * @example cy.visitAnalytics()
       */
      visitAnalytics(): Chainable<void>
      
      /**
       * Custom command to navigate to billing page
       * @example cy.visitBilling()
       */
      visitBilling(): Chainable<void>
      
      /**
       * Custom command to create a bucket
       * @example cy.createBucket('test-bucket')
       */
      createBucket(name: string): Chainable<void>
      
      /**
       * Custom command to check responsive design
       * @example cy.checkResponsive()
       */
      checkResponsive(): Chainable<void>
    }
  }
}

export {}
