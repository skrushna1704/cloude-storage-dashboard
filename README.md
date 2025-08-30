# Cloud Storage Dashboard

A modern, responsive React application for managing cloud storage buckets, objects, and analytics. Built with React, TypeScript, Redux Toolkit, and Chakra UI components.

## 🚀 Features

### ✅ Completed Features

**Core Functionality:**
- **Bucket Management**: Create, rename, and delete storage buckets
- **File Operations**: Upload, download, preview, and delete files
- **File Explorer**: Navigate through bucket contents with breadcrumb navigation
- **Search & Filter**: Global search functionality across buckets and files
- **Responsive Design**: Mobile-first design that works on all devices

**Analytics & Monitoring:**
- **Storage Analytics**: Visual charts showing storage usage trends
- **Cost Analytics**: Cost breakdown and spending analysis
- **Usage Metrics**: Bandwidth and request statistics

**User Interface:**
- **Modern UI**: Clean, intuitive interface with Chakra UI components
- **Notifications**: Toast notifications for user feedback
- **Loading States**: Proper loading indicators throughout the app
- **Error Handling**: Comprehensive error boundaries and user-friendly error messages

**Navigation & Layout:**
- **Sidebar Navigation**: Collapsible sidebar with page navigation
- **Header**: Search bar, notifications, and user menu
- **Mobile Menu**: Responsive mobile navigation
- **Breadcrumbs**: File path navigation in bucket details

## 🛠️ Tech Stack

- **Frontend**: React 19, TypeScript
- **State Management**: Redux Toolkit
- **API Integration**: MSW (Mock Service Worker)
- **UI Framework**: Chakra UI
- **Styling**: Emotion (CSS-in-JS)
- **Testing**: Cypress (E2E)
- **Build Tool**: Create React App
- **Package Manager**: npm

## 📦 Installation & Setup

### Prerequisites
- Node.js (v16 or higher)
- npm (v8 or higher)

### Quick Start

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd cloud-storage-dashboard
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Available Scripts

- `npm start` - Start development server
- `npm run build` - Build for production
- `npm test` - Run Cypress tests in headless mode
- `npm run test:open` - Open Cypress Test Runner
- `npm run test:e2e` - Run all E2E tests
- `npm run test:component` - Run component tests
- `npm run test:component` - Run component tests

## 🧪 Testing

The project includes comprehensive testing setup:

- **E2E Tests**: Cypress for end-to-end testing
- **Component Tests**: Isolated component testing

See [Cypress README](./cypress/README.md) for detailed testing instructions.

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── analytics/      # Analytics charts and components
│   ├── buckets/        # Bucket management components
│   ├── common/         # Shared components (Layout, Header, etc.)
│   └── objects/        # File management components
├── pages/              # Page components
│   ├── Analytics/      # Analytics dashboard
│   ├── Billing/        # Billing and payments
│   ├── BucketDetail/   # Individual bucket view
│   └── Buckets/        # Buckets overview
├── services/           # API services and utilities
├── store/              # Redux store and slices
├── types/              # TypeScript type definitions
├── utils/              # Utility functions
├── theme/              # Theme configuration
├── hooks/              # Custom React hooks
├── constants/          # Application constants
└── mocks/              # MSW mock handlers
```

## 🎨 Customization

### Adding New Features
1. Create components in appropriate directories
2. Add Redux slices for state management
3. Update routing in `App.tsx`
4. Add tests for new functionality

## 🚀 Deployment

### Build for Production
```bash
npm run build
```

The build artifacts will be stored in the `build/` directory.

### Deployment Options
- **Netlify**: Drag and drop the `build` folder
- **Vercel**: Connect your repository for automatic deployments
- **AWS S3**: Upload build files to S3 bucket

### Environment Variables
- `REACT_APP_API_URL` - API base URL (defaults to `/api` for MSW)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines
- Follow TypeScript best practices
- Write tests for new features
- Use conventional commit messages
- Ensure responsive design works on all devices
- Use Chakra UI components for consistency

## 📝 Notes

**Note**: This application currently uses MSW (Mock Service Worker) for API mocking. Real cloud storage integration requires backend API development and cloud provider credentials.

The app is fully responsive and optimized for mobile, tablet, and desktop devices with a mobile-first approach.
