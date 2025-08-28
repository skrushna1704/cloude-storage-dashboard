/// <reference types="cypress" />

// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************

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

// Custom command to login (if needed in future)
Cypress.Commands.add('login', () => {
  // Add login logic here when authentication is implemented
  cy.log('Login functionality will be implemented when auth is added')
})

// Custom command to visit buckets page
Cypress.Commands.add('visitBuckets', () => {
  cy.visit('/buckets')
  cy.get('[data-testid="buckets-page"]', { timeout: 10000 }).should('be.visible')
})

// Custom command to visit analytics page
Cypress.Commands.add('visitAnalytics', () => {
  cy.visit('/analytics')
  cy.get('[data-testid="analytics-page"]', { timeout: 10000 }).should('be.visible')
})

// Custom command to visit billing page
Cypress.Commands.add('visitBilling', () => {
  cy.visit('/billing')
  cy.get('[data-testid="billing-page"]', { timeout: 10000 }).should('be.visible')
})

// Custom command to create a bucket
Cypress.Commands.add('createBucket', (name: string) => {
  cy.get('[data-testid="create-bucket-btn"]').click()
  cy.get('[data-testid="bucket-name-input"]').type(name)
  cy.get('[data-testid="create-bucket-submit"]').click()
  cy.get('[data-testid="success-toast"]').should('be.visible')
})

// Custom command to get element by data-testid
declare global {
  namespace Cypress {
    interface Chainable<Subject> {
      getByData(testId: string): Chainable<JQuery<HTMLElement>>
    }
  }
}

Cypress.Commands.add('getByData', (testId: string) => {
  return cy.get(`[data-testid="${testId}"]`)
})

// Custom command to check responsive design
Cypress.Commands.add('checkResponsive', () => {
  // Test mobile viewport
  cy.viewport(375, 667)
  cy.get('body').should('be.visible')
  
  // Test tablet viewport
  cy.viewport(768, 1024)
  cy.get('body').should('be.visible')
  
  // Test desktop viewport
  cy.viewport(1280, 720)
  cy.get('body').should('be.visible')
})

export {}