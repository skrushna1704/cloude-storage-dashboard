/// <reference types="cypress" />
import { testIds } from '../../src/shared/dataTestIds'

describe('Buckets Functionality Tests', () => {
  beforeEach(() => {
    cy.visit('/buckets')
    cy.fixture('buckets').as('bucketsData')
  })

  it('should display Dashboard page with buckets', () => {
    cy.getByData(testIds.buckets_page_titles).should('contain.text', 'Storage Buckets')
    cy.getByData(testIds.buckets_page_desccription).should('contain.text', 'Manage your cloud storage buckets and data')
    cy.get('[data-test="create_bucket_btn"]').should('exist')
    cy.get('[data-test="create_bucket_btn"]').should('contain.text','Create Bucket')
    cy.get('[data-test="total_buckets_text"]').should('contain.text', 'Total Buckets')
    cy.get('[data-test="total_storage_text"]').should('contain.text', 'Total Storage')
    cy.get('[data-test="total_objects_text"]').should('contain.text', 'Total Objects')
    cy.get('[data-test="bucket_card"]').eq(1).should('exist')
    cy.get('[data-test="bucket_card_name"]').eq(1).click()
    cy.url().should('include', 'http://localhost:3000/buckets')
  })

})
