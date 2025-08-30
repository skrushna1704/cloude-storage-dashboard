/// <reference types="cypress" />

describe('Billing Page', () => {
  beforeEach(() => {
    cy.intercept('GET', '/api/billing*', { fixture: 'billing.json' }).as('getBilling')
    cy.visit('/billing')
  })

  describe('Page Structure and Navigation', () => {
    it('should display the billing page with correct header', () => {
      cy.get('[data-test="billing_page"]').should('be.visible')
      cy.get('[data-test="billing_header"]').should('contain', 'Billing & Payments')
      cy.get('[data-test="billing_description"]').should('contain', 'Manage your billing information, view invoices, and track payments')
    })
  })

  describe('Billing Overview Cards', () => {
    it('should display current month billing card', () => {
      cy.fixture('billing.json').then((data) => {
        cy.get('[data-test="current_month_card"]').should('be.visible')
        cy.get('[data-test="current_month_value"]').should('contain', `$${data.billing.currentMonth}`)
        cy.get('[data-test="current_month_label"]').should('contain', 'Current Month')
      })
    })

    it('should display storage usage card', () => {
      cy.fixture('billing.json').then((data) => {
        cy.get('[data-test="storage_usage_card"]').should('be.visible')
        cy.get('[data-test="storage_usage_value"]').should('contain', `${data.billing.totalStorage} GB`)
        cy.get('[data-test="storage_usage_label"]').should('contain', 'Storage Usage')
      })
    })

    it('should display upcoming payment card', () => {
      cy.fixture('billing.json').then((data) => {
        cy.get('[data-test="upcoming_payment_card"]').should('be.visible')
        cy.get('[data-test="upcoming_payment_value"]').should('contain', `$${data.billing.upcomingPayment}`)
        cy.get('[data-test="upcoming_payment_label"]').should('contain', 'Upcoming Payment')
      })
    })

    it('should display billing trend information', () => {
      cy.fixture('billing.json').then((data) => {
        cy.get('[data-test="current_month_trend"]').should('contain', `${data.billing.trend}%`)
        cy.get('[data-test="current_month_trend"]').should('contain', 'from last month')
      })
    })
  })

  describe('Payment Methods Section', () => {
    it('should display payment methods section', () => {
      cy.get('[data-test="payment_methods_tab"]').click()
      cy.get('[data-test="payment_methods_panel"]').should('be.visible')
      cy.get('[data-test="payment_methods_header"]').should('contain', 'Payment Methods')
    })

    it('should display existing payment methods', () => {
      cy.get('[data-test="payment_methods_tab"]').click()
      cy.fixture('billing.json').then((data) => {
        data.billing.paymentMethods.forEach((method: any) => {
          cy.get(`[data-test="payment_method_card_${method.id}"]`).should('contain', method.brand)
          cy.get(`[data-test="payment_method_last4_${method.id}"]`).should('contain', method.last4)
          cy.get(`[data-test="payment_method_expiry_${method.id}"]`).should('contain', method.expiryDate)
        })
      })
    })

    it('should display default payment method indicator', () => {
      cy.get('[data-test="payment_methods_tab"]').click()
      cy.fixture('billing.json').then((data) => {
        const defaultMethod = data.billing.paymentMethods.find((m: any) => m.isDefault)
        if (defaultMethod) {
          cy.get(`[data-test="payment_method_default_${defaultMethod.id}"]`).should('contain', 'Default')
        }
      })
    })

    it('should display add payment method button', () => {
      cy.get('[data-test="payment_methods_tab"]').click()
      cy.get('[data-test="add_payment_method_btn"]').should('be.visible')
      cy.get('[data-test="add_payment_method_btn"]').should('contain', 'Add Payment Method')
    })
  })

  describe('Invoices Section', () => {
    it('should display invoices section', () => {
      cy.get('[data-test="invoices_tab"]').click()
      cy.get('[data-test="invoices_panel"]').should('be.visible')
      cy.get('[data-test="invoices_header"]').should('contain', 'Invoices')
    })

    it('should display invoice list', () => {
      cy.get('[data-test="invoices_tab"]').click()
      cy.get('[data-test="invoices_table"]').should('be.visible')
    })

    it('should display all invoices from fixture', () => {
      cy.get('[data-test="invoices_tab"]').click()
      cy.fixture('billing.json').then((data) => {
        data.billing.invoices.forEach((invoice: any) => {
          cy.get(`[data-test="invoice_number_${invoice.id}"]`).should('contain', invoice.invoiceNumber)
          cy.get(`[data-test="invoice_amount_${invoice.id}"]`).should('contain', `$${invoice.amount}`)
          cy.get(`[data-test="invoice_description_${invoice.id}"]`).should('contain', invoice.description)
        })
      })
    })

    it('should display invoice dates', () => {
      cy.get('[data-test="invoices_tab"]').click()
      cy.fixture('billing.json').then((data) => {
        data.billing.invoices.forEach((invoice: any) => {
          cy.get(`[data-test="invoice_date_${invoice.id}"]`).should('contain', new Date(invoice.date).toLocaleDateString())
        })
      })
    })
    it('should handle invoice view', () => {
      cy.get('[data-test="invoices_tab"]').click()
      cy.get('[data-test="view_invoice_btn_1"]').click()
      // Note: This would need a modal implementation to work properly
    })
  })

  describe('Billing Tabs and Navigation', () => {
    it('should display billing tabs', () => {
      cy.get('[role="tablist"]').should('be.visible')
      cy.get('[role="tab"]').should('have.length.at.least', 2)
    })

    it('should switch between billing tabs', () => {
      cy.get('[role="tab"]').eq(1).click()
      cy.get('[role="tab"]').eq(1).should('have.attr', 'aria-selected', 'true')
      cy.get('[role="tabpanel"]').should('be.visible')
    })
    it('should display invoices tab content', () => {
      cy.get('[role="tab"]').eq(1).click()
      cy.get('[role="tabpanel"]').should('contain', 'Invoices')
    })
  })
})
