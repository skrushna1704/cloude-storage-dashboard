# Cypress Testing Setup

This project uses Cypress for end-to-end (E2E) and component testing.

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation
Cypress is already installed as a dev dependency. If you need to reinstall:
```bash
npm install --save-dev cypress
```

## Running Tests

### Open Cypress Test Runner (Interactive Mode)
```bash
npm run test:open
```

### Run All E2E Tests (Headless Mode)
```bash
npm run test
```

### Run Specific Test Types
```bash
# Run only E2E tests
npm run test:e2e

# Run only component tests
npm run test:component
```

## Test Structure

### E2E Tests (`cypress/e2e/`)
- `navigation.cy.ts` - Tests for navigation between pages
- `responsive.cy.ts` - Tests for responsive design across devices
- `buckets.cy.ts` - Tests for bucket management functionality

### Component Tests (`cypress/component/`)
- Component-specific tests (to be added as needed)

### Support Files (`cypress/support/`)
- `commands.ts` - Custom Cypress commands
- `e2e.ts` - E2E test configuration
- `component.ts` - Component test configuration

## Custom Commands

The following custom commands are available:

- `cy.login()` - Login functionality (placeholder for future auth)
- `cy.visitBuckets()` - Navigate to buckets page
- `cy.visitAnalytics()` - Navigate to analytics page
- `cy.visitBilling()` - Navigate to billing page
- `cy.createBucket(name)` - Create a new bucket
- `cy.checkResponsive()` - Test responsive design across viewports

## Test Data Attributes

The tests use `data-testid` attributes to locate elements. These are centrally managed in `src/shared/dataTestIds.ts`. Key test IDs include:

### Layout Components
- `data-testid="header"` - Main header component
- `data-testid="sidebar"` - Desktop sidebar component
- `data-testid="mobile-menu-btn"` - Mobile menu button
- `data-testid="mobile-sidebar"` - Mobile sidebar overlay
- `data-testid="main-content"` - Main content area
- `data-testid="app-logo"` - Application logo
- `data-testid="app-title"` - Application title

### Page Containers
- `data-testid="buckets-page"` - Buckets page container
- `data-testid="analytics-page"` - Analytics page container
- `data-testid="billing-page"` - Billing page container
- `data-testid="not-found-page"` - 404 page container

### Header Elements
- `data-testid="search-input"` - Search input field
- `data-testid="search-button"` - Search button
- `data-testid="notification-bell"` - Notification bell
- `data-testid="notification-count"` - Notification count badge
- `data-testid="user-menu"` - User menu button
- `data-testid="user-name"` - User name text

### Bucket Components
- `data-testid="bucket-card"` - Individual bucket card
- `data-testid="create-bucket-btn"` - Create bucket button
- `data-testid="bucket-name-input"` - Bucket name input field
- `data-testid="create-bucket-submit"` - Create bucket submit button

### Analytics Components
- `data-testid="analytics-period-selector"` - Period selector dropdown
- `data-testid="export-report-btn"` - Export report button

### Notifications
- `data-testid="success-toast"` - Success notification toast
- `data-testid="error-toast"` - Error notification toast
- `data-testid="info-toast"` - Info notification toast

## Configuration

The Cypress configuration is in `cypress.config.ts` and includes:

- Base URL: `http://localhost:3000`
- Viewport settings for responsive testing
- Timeout configurations
- Support for both E2E and component testing

## Best Practices

1. **Use data-testid attributes** for reliable element selection
2. **Test responsive design** across different viewport sizes
3. **Keep tests independent** - each test should be able to run in isolation
4. **Use descriptive test names** that explain what is being tested
5. **Add proper assertions** to verify expected behavior
6. **Handle async operations** with proper waiting strategies

## Troubleshooting

### Common Issues

1. **Tests failing due to missing elements**: Ensure all `data-testid` attributes are added to components
2. **Timing issues**: Use `cy.wait()` or proper assertions instead of arbitrary delays
3. **Mobile tests failing**: Verify responsive design implementation is complete

### Debug Mode

To debug tests, run Cypress in open mode:
```bash
npm run test:open
```

This will open the Cypress Test Runner where you can:
- See test execution in real-time
- Debug failing tests
- View screenshots and videos of test runs
- Use the browser's developer tools

## Adding New Tests

1. Create a new `.cy.ts` file in the appropriate directory
2. Follow the existing test structure and naming conventions
3. Add necessary `data-testid` attributes to components
4. Update this README if adding new custom commands or test patterns
