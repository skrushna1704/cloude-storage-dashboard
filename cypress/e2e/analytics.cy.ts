/// <reference types="cypress" />

describe('Analytics Page', () => {
  beforeEach(() => {
    cy.intercept('GET', '/api/analytics*', { fixture: 'analytics.json' }).as('getAnalytics')
    cy.visit('/analytics')  
  })

  describe('Page Structure and Navigation', () => {
    it('should display the analytics page with correct header', () => {
      cy.get('[data-test="analytics_page"]').should('be.visible')
      cy.get('[data-test="analytics_header"]').should('contain', 'Analytics Dashboard')
      cy.get('[data-test="analytics_description"]').should('contain', 'Monitor your storage usage, costs, and performance metrics')
    })
  })

  describe('Period Selector and Controls', () => {
    it('should display period selector with correct options', () => {
      cy.get('[data-test="analytics_period_selector"]').should('be.visible')
      cy.get('[data-test="analytics_period_selector"]').click()
      
      // Check dropdown options
      cy.get('[data-test="period_options"]').should('be.visible')
      cy.get('[data-test="period_7d"]').should('contain', 'Last 7 Days')
      cy.get('[data-test="period_30d"]').should('contain', 'Last 30 Days')
      cy.get('[data-test="period_90d"]').should('contain', 'Last 90 Days')
      cy.get('[data-test="period_1y"]').should('contain', 'Last Year')
    })



    it('should display export report button', () => {
      cy.get('[data-test="export_report_btn"]').should('be.visible')
      cy.get('[data-test="export_report_btn"]').should('contain', 'Export Report')
    })


  })

  describe('Analytics Metrics and Statistics', () => {
    it('should display storage usage metrics', () => {
      cy.fixture('analytics.json').then((data) => {
        const storageGB = (data.analytics.totalStorage / (1024 * 1024 * 1024)).toFixed(1)
        
        cy.get('[data-test="total_storage_metric"]').should('contain', storageGB)
        cy.get('[data-test="storage_progress"]').should('exist')
        cy.get('[data-test="storage_help_text"]').should('contain', '83.4%')
      })
    })
  })

  describe('Alerts and Notifications', () => {
    it('should display alerts section when alerts exist', () => {
      cy.fixture('analytics.json').then((data) => {
        if (data.analytics.alerts.length > 0) {
          cy.get('[data-test="analytics_alerts"]').should('contain', 'Recent Alerts')
          cy.get('[data-test="alerts_header"]').should('contain', 'Recent Alerts')
          
          data.analytics.alerts.forEach((alert: any, index: number) => {
            cy.get(`[data-test="alert_message_${index}"]`).should('contain', alert.message)
            cy.get(`[data-test="alert_severity_${index}"]`).should('contain', alert.severity)
          })
        }
      })
    })
  })
})
