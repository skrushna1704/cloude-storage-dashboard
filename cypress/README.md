# Cypress Testing Guide

This document covers everything you need to know about testing the Cloud Storage Dashboard with Cypress. Our testing strategy focuses on end-to-end scenarios that mirror real user interactions.

## 🎯 What We Test

Our Cypress tests cover the critical user journeys that ensure the application works as expected:

- **Navigation**: Moving between pages and responsive behavior
- **Bucket Management**: Creating, renaming, and deleting buckets
- **File Operations**: Uploading, downloading, and managing files
- **Responsive Design**: Ensuring the app works on all device sizes
- **User Interface**: Testing UI components and interactions

## 🚀 Getting Started

### Prerequisites
Make sure you have:
- Node.js v16+ installed
- The main application running (`npm start`)
- Cypress installed (included in dev dependencies)

### First Time Setup

1. **Install dependencies** (if not already done):
   ```bash
   npm install
   ```

2. **Start the development server**:
   ```bash
   npm start
   ```

3. **Open Cypress Test Runner**:
   ```bash
   npm run test:open
   ```

## 🧪 Running Tests

### Interactive Mode (Recommended for Development)
```bash
npm run test:open
```
This opens the Cypress Test Runner where you can:
- See tests run in real-time
- Debug failing tests step by step
- View screenshots and videos
- Use browser dev tools

### Headless Mode (CI/CD)
```bash
npm run test:e2e
```
Runs all tests without opening the browser - perfect for automated testing.

### Running Specific Tests
```bash
# Run only navigation tests
npx cypress run --spec "cypress/e2e/navigation.cy.ts"

# Run tests matching a pattern
npx cypress run --spec "cypress/e2e/*buckets*.cy.ts"
```

## 📁 Test Structure

### E2E Tests (`cypress/e2e/`)

| File | Purpose | Coverage |
|------|---------|----------|
| `navigation.cy.ts` | Page navigation and routing | Sidebar, header, mobile menu |
| `buckets.cy.ts` | Bucket management | CRUD operations, search |
| `bucketDetails.cy.ts` | File management within buckets | File operations, breadcrumbs |
| `responsive.cy.ts` | Responsive design | Mobile, tablet, desktop layouts |
| `comprehensive.cy.ts` | Full user workflows | Complete user journeys |

### Support Files (`cypress/support/`)

- `commands.ts` - Custom Cypress commands for common actions
- `e2e.ts` - Global configuration for E2E tests
- `component.ts` - Configuration for component tests

### Test Data (`cypress/fixtures/`)

Mock data files that provide consistent test scenarios:
- `buckets.json` - Sample bucket data
- `analytics.json` - Analytics test data
- `billing.json` - Billing information

## 🛠️ Custom Commands

We've created several custom commands to make tests more readable and maintainable:

### Navigation Commands
```typescript
cy.visitBuckets()      // Navigate to buckets page
cy.visitAnalytics()    // Navigate to analytics page
cy.visitBilling()      // Navigate to billing page
```

### Bucket Operations
```typescript
cy.createBucket('my-bucket')           // Create a new bucket
cy.deleteBucket('bucket-name')         // Delete a bucket
cy.renameBucket('old-name', 'new-name') // Rename a bucket
```

### Utility Commands
```typescript
cy.checkResponsive()   // Test responsive design across viewports
cy.waitForPageLoad()   // Wait for page to fully load
```

## 🎨 Test Data Attributes

We use `data-testid` attributes to reliably locate elements. These are defined in `src/shared/dataTestIds.ts`:

### Layout Elements
```html
<header data-testid="header">
<nav data-testid="sidebar">
<button data-testid="mobile-menu-btn">
```

### Page Containers
```html
<div data-testid="buckets-page">
<div data-testid="analytics-page">
<div data-testid="billing-page">
```

### Interactive Elements
```html
<input data-testid="search-input">
<button data-testid="create-bucket-btn">
<div data-testid="bucket-card">
```

## 📝 Writing Tests

### Basic Test Structure
```typescript
describe('Bucket Management', () => {
  beforeEach(() => {
    cy.visit('/buckets')
  })

  it('should create a new bucket', () => {
    cy.get('[data-testid="create-bucket-btn"]').click()
    cy.get('[data-testid="bucket-name-input"]').type('test-bucket')
    cy.get('[data-testid="create-bucket-submit"]').click()
    cy.get('[data-testid="success-toast"]').should('be.visible')
  })
})
```

### Best Practices

1. **Use descriptive test names** that explain the expected behavior
2. **Keep tests independent** - each test should be able to run alone
3. **Use data-testid attributes** for reliable element selection
4. **Add proper assertions** to verify expected outcomes
5. **Handle async operations** with proper waiting strategies

### Common Patterns

**Waiting for elements:**
```typescript
cy.get('[data-testid="bucket-card"]').should('be.visible')
cy.get('[data-testid="loading-spinner"]').should('not.exist')
```

**Testing responsive design:**
```typescript
cy.viewport('iphone-6')
cy.get('[data-testid="mobile-menu-btn"]').should('be.visible')
```

**Handling file uploads:**
```typescript
cy.get('[data-testid="file-input"]').attachFile('test-image.jpg')
cy.get('[data-testid="upload-progress"]').should('be.visible')
```

## 🔧 Configuration

The Cypress configuration is in `cypress.config.ts`:

```typescript
export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:3000',
    viewportWidth: 1280,
    viewportHeight: 720,
    video: true,
    screenshot: true,
    defaultCommandTimeout: 10000,
  }
})
```

### Environment Variables
Create a `cypress.env.json` file for environment-specific settings:
```json
{
  "apiUrl": "http://localhost:3000/api",
  "testUser": "test@example.com"
}
```

## 🐛 Troubleshooting

### Common Issues

**Tests failing due to timing:**
```typescript
// Instead of arbitrary delays, wait for specific conditions
cy.get('[data-testid="loading-spinner"]').should('not.exist')
cy.get('[data-testid="content"]').should('be.visible')
```

**Element not found:**
- Check if the `data-testid` attribute exists in the component
- Verify the element is actually rendered (not conditionally hidden)
- Use `cy.debug()` to inspect the current state

**Mobile tests failing:**
- Ensure responsive design is properly implemented
- Test on actual mobile viewports, not just resized desktop
- Check for mobile-specific interactions (touch events)

### Debug Mode

When tests fail, you can debug them:

1. **Run in open mode** to see the browser:
   ```bash
   npm run test:open
   ```

2. **Add debug statements**:
   ```typescript
   cy.get('[data-testid="element"]').then($el => {
     cy.log('Element found:', $el.length)
   })
   ```

3. **Use browser dev tools** in the Cypress runner to inspect elements

### Getting Help

1. Check the [Cypress documentation](https://docs.cypress.io/)
2. Look at existing tests for examples
3. Check the browser console for JavaScript errors
4. Review screenshots and videos in `cypress/screenshots/` and `cypress/videos/`

## 📊 Test Reports

After running tests, you'll find:
- **Screenshots**: `cypress/screenshots/` - Images of failed tests
- **Videos**: `cypress/videos/` - Recordings of test runs
- **Console output**: Detailed logs of test execution

## 🔄 Continuous Integration

Our tests are designed to run in CI/CD pipelines:

```yaml
# Example GitHub Actions workflow
- name: Run E2E Tests
  run: |
    npm start &
    npm run test:e2e
```

## 📈 Adding New Tests

When adding new features, follow this process:

1. **Add data-testid attributes** to new components
2. **Create test file** in appropriate directory
3. **Write tests** following existing patterns
4. **Update this README** if adding new commands or patterns
5. **Run tests locally** before committing

### Test Naming Convention
- Use descriptive names: `should display bucket list when buckets exist`
- Group related tests in describe blocks
- Use consistent terminology across tests

---

**Remember**: Good tests are like good documentation - they help other developers understand how your code should work and catch regressions before they reach users.
