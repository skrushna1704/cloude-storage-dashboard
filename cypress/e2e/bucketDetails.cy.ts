/// <reference types="cypress" />

describe("Buckets Functionality Tests", () => {
  context("Should render Bucket Details Page", () => {
    beforeEach(() => {
      cy.visit("/buckets");
      cy.fixture("buckets").as("bucketsData");
    });

    it("should display Bucket Details Page", () => {
      cy.get('[data-test="bucket_card_name"]').eq(1).click();
      cy.url().should("include", "http://localhost:3000/buckets/1");
      cy.get('[data-test="bucket_breadcrumb"]').should(
        "contain.text",
        "Bucket"
      );
      cy.get('[data-test="bucket_details_monitor_btn"]').should(
        "contain.text",
        "Monitor"
      );
      cy.get('[data-test="bucket_details_configure_btn"]').should(
        "contain.text",
        "Configure"
      );
      cy.get('[data-test="bucket_details_security_heading"]').should(
        "contain.text",
        "Security & Configuration"
      );
    });
  });

  context("Should render upload modal after click on upload button", () => {
    beforeEach(() => {
      cy.visit("/buckets");
      cy.get('[data-test="bucket_card_name"]').eq(1).click();
      cy.url().should("include", "http://localhost:3000/buckets/1");
    });
    it("should have upload and create folder button in bucket details page", () => {
      cy.get('[data-test="bucket_details_upload_files_btn"]').should(
        "contain.text",
        "Upload Files"
      );
      cy.get('[data-test="bucket_details_create_folder_btn"]').should(
        "contain.text",
        "Create Folder"
      );
    });
    it("on Click of upload folder button modal should be open and close", () => {
      cy.get('[data-test="bucket_details_upload_files_btn"]').click();
    });

    it("should able to upload files", () => {
        cy.get('[data-test="bucket_details_upload_files_btn"]').should('contain.text','Upload Files');
      });
  });
});
