/// <reference types="cypress" />
import { testIds } from '../../src/shared/dataTestIds'

describe('Responsive Design Tests', () => {
  beforeEach(() => {
    cy.visit('/buckets')
  })

  it('should be responsive on mobile devices', () => {
    // Mobile viewport
    cy.viewport(375, 667)
    
    // Check that content is properly stacked
    cy.get('h1').should('be.visible')
    cy.get('body').should('contain', 'Storage Buckets')
    
    // Check that sidebar is hidden by default on mobile
    cy.getByData(testIds.mobile_menu_btn).should('be.visible')
    
    // Check that cards stack vertically
    cy.getByData(testIds.bucket_card).should('have.length.at.least', 1)
  })

  it('should be responsive on tablet devices', () => {
    // Tablet viewport
    cy.viewport(768, 1024)
    
    // Check that content is visible
    cy.get('h1').should('be.visible')
    cy.get('body').should('contain', 'Storage Buckets')
    
    // Check that grid adapts to tablet size
    cy.getByData(testIds.bucket_grid).should('be.visible')
  })

  it('should be responsive on desktop devices', () => {
    // Desktop viewport
    cy.viewport(1280, 720)
    
    // Check that content is visible
    cy.get('h1').should('be.visible')
    cy.get('body').should('contain', 'Storage Buckets')
    
    // Check that sidebar is visible on desktop
    cy.getByData(testIds.sidebar).should('be.visible')
    
    // Check that grid shows multiple columns
    cy.getByData(testIds.bucket_grid).should('be.visible')
  })

  it('should handle mobile menu toggle', () => {
    cy.viewport(375, 667)
    
    // Menu should be hidden initially
    cy.getByData(testIds.mobile_sidebar).should('not.be.visible')
    
    // Click menu button
    cy.getByData(testIds.mobile_menu_btn).click()
    
    // Menu should be visible
    cy.getByData(testIds.mobile_sidebar).should('be.visible')
    
    // Click outside to close
    cy.get('body').click(0, 0)
    
    // Menu should be hidden again
    cy.getByData(testIds.mobile_sidebar).should('not.be.visible')
  })

  it('should have proper text sizing on different screens', () => {
    // Mobile
    cy.viewport(375, 667)
    cy.get('h1').should('have.css', 'font-size')
    
    // Desktop
    cy.viewport(1280, 720)
    cy.get('h1').should('have.css', 'font-size')
  })
})
