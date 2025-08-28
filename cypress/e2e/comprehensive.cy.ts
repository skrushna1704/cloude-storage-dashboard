/// <reference types="cypress" />
/// <reference types="../support/index" />
import { testIds } from '../../src/shared/dataTestIds'

describe('Comprehensive App Tests', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('should have all main layout elements with test IDs', () => {
    // Check main layout elements
    cy.getByData(testIds.header).should('be.visible')
    cy.getByData(testIds.sidebar).should('be.visible')
    cy.getByData(testIds.main_content).should('be.visible')
    
    // Check header elements
    cy.getByData(testIds.app_logo).should('be.visible')
    cy.getByData(testIds.app_title).should('contain', 'CloudSync Pro')
    cy.getByData(testIds.search_input).should('be.visible')
    cy.getByData(testIds.search_button).should('be.visible')
    cy.getByData(testIds.notification_bell).should('be.visible')
    cy.getByData(testIds.user_menu).should('be.visible')
    cy.getByData(testIds.user_name).should('contain', 'John Doe')
  })

  it('should navigate to all pages and verify test IDs', () => {
    // Test Buckets page
    cy.visit('/buckets')
    cy.getByData(testIds.buckets_page).should('be.visible')
    cy.get('h1').should('contain', 'Storage Buckets')
    
    // Test Analytics page
    cy.visit('/analytics')
    cy.getByData(testIds.analytics_page).should('be.visible')
    cy.get('h1').should('contain', 'Analytics Dashboard')
    cy.getByData(testIds.analytics_period_selector).should('be.visible')
    cy.getByData(testIds.export_report_btn).should('be.visible')
    
    // Test Billing page
    cy.visit('/billing')
    cy.getByData(testIds.billing_page).should('be.visible')
    cy.get('h1').should('contain', 'Billing & Payments')
  })

  it('should test responsive design with test IDs', () => {
    // Mobile viewport
    cy.viewport(375, 667)
    cy.getByData(testIds.mobile_menu_btn).should('be.visible')
    cy.getByData(testIds.sidebar).should('be.visible')
    
    // Desktop viewport
    cy.viewport(1280, 720)
    cy.getByData(testIds.sidebar).should('be.visible')
  })

  it('should test mobile sidebar functionality', () => {
    cy.viewport(375, 667)
    
    // Mobile sidebar should be hidden initially
    cy.getByData(testIds.mobile_sidebar).should('not.be.visible')
    
    // Click mobile menu button
    cy.getByData(testIds.mobile_menu_btn).click()
    
    // Mobile sidebar should be visible
    cy.getByData(testIds.mobile_sidebar).should('be.visible')
  })

  it('should test 404 page', () => {
    cy.visit('/non-existent-page')
    cy.getByData(testIds.not_found_page).should('be.visible')
    cy.get('h1').should('contain', '404')
  })

  it('should test search functionality', () => {
    cy.getByData(testIds.search_input).should('be.visible')
    cy.getByData(testIds.search_input).type('test search')
    cy.getByData(testIds.search_input).should('have.value', 'test search')
  })

  it('should test user menu', () => {
    cy.getByData(testIds.user_menu).should('be.visible')
    cy.getByData(testIds.user_name).should('contain', 'John Doe')
  })

  it('should test notification bell', () => {
    cy.getByData(testIds.notification_bell).should('be.visible')
    // Check if notification count badge exists
    cy.get('body').then(($body) => {
      if ($body.find(`[data-testid="${testIds.notification_count}"]`).length > 0) {
        cy.getByData(testIds.notification_count).should('be.visible')
      }
    })
  })

  it('should test upgrade modal functionality', () => {
    // Click on upgrade prompt in sidebar
    cy.getByData(testIds.upgrade_prompt).should('be.visible')
    cy.getByData(testIds.upgrade_prompt).click()
    
    // Modal should open
    cy.get('h2').should('contain', 'Upgrade to CloudSync Pro')
    
    // Check for plan options
    cy.get('body').should('contain', 'Pro')
    cy.get('body').should('contain', 'Enterprise')
    
    // Close modal
    cy.get('button[aria-label="Close"]').click()
    
    // Modal should be closed
    cy.get('h2').should('not.contain', 'Upgrade to CloudSync Pro')
  })
})
