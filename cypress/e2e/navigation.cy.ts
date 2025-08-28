/// <reference types="cypress" />
import { testIds } from '../../src/shared/dataTestIds'

describe('Navigation Tests', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('should navigate to buckets page', () => {
    cy.visit(testIds.url_buckets)
    cy.getByData(testIds.buckets_page).should('be.visible')
    cy.get('h1').should('contain', 'Storage Buckets')
    cy.get('body').should('contain', 'Manage your cloud storage buckets')
  })

  it('should navigate to analytics page', () => {
    cy.visit(testIds.url_analytics)
    cy.getByData(testIds.analytics_page).should('be.visible')
    cy.get('h1').should('contain', 'Analytics Dashboard')
    cy.get('body').should('contain', 'Monitor your storage usage')
  })

  it('should navigate to billing page', () => {
    cy.visit(testIds.url_billing)
    cy.getByData(testIds.billing_page).should('be.visible')
    cy.get('h1').should('contain', 'Billing & Payments')
    cy.get('body').should('contain', 'Manage your billing information')
  })

  it('should handle 404 page', () => {
    cy.visit('/non-existent-page')
    cy.getByData(testIds.not_found_page).should('be.visible')
    cy.get('h1').should('contain', '404')
    cy.get('body').should('contain', 'Page Not Found')
  })

  it('should have working sidebar navigation', () => {
    // Test sidebar navigation on desktop
    cy.viewport(1280, 720)
    cy.getByData(testIds.sidebar).should('be.visible')
    
    // Test mobile sidebar
    cy.viewport(375, 667)
    cy.getByData(testIds.mobile_menu_btn).click()
    cy.getByData(testIds.mobile_sidebar).should('be.visible')
  })
})
