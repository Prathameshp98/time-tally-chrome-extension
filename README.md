# Time Tally Chrome Extension

A Chrome extension that tracks the time you spend on different websites, helping you monitor your browsing habits and productivity.

## 🚀 Features

- **Website Time Tracking**: Automatically tracks time spent on each website
- **Visit History**: Shows when you last visited a website
- **Real-time Monitoring**: Background service worker continuously monitors tab switches
- **Clean UI**: Modern React-based popup interface with Tailwind CSS styling
- **Data Persistence**: Uses Chrome's local storage to save your browsing statistics
- **Options Page**: Dedicated settings page for customization

## 🛠️ Tech Stack

- **Frontend**: React 18 with TypeScript
- **Styling**: Tailwind CSS
- **Build Tool**: Webpack 5
- **Extension API**: Chrome Extension Manifest V3
- **Package Manager**: Yarn

## 📁 Project Structure

```
src/
├── assests/           # Static assets and styles
├── background/        # Background service worker
├── components/        # React components
│   ├── Main/         # Main popup component
│   ├── Header/       # Header component
│   ├── Footer/       # Footer component
│   ├── Figures/      # Statistics display
│   ├── Notification/ # Notification component
│   └── QuickSettings/# Quick settings component
├── contentScript/     # Content scripts
├── options/          # Options page
├── popup/            # Popup entry point
├── static/           # Static files (manifest.json, icons)
├── tabs/             # Tab-related functionality
├── types/            # TypeScript type definitions
├── Utils/            # Utility functions
└── Props/            # Component props definitions
```

## 🔧 Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- Yarn package manager
- Chrome browser

### Development Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd time-tally-chrome-extension
   ```

2. **Install dependencies**
   ```bash
   yarn install
   ```

3. **Build the extension**
   ```bash
   # For development
   yarn dev
   
   # For production
   yarn build
   ```

4. **Load the extension in Chrome**
   - Open Chrome and navigate to `chrome://extensions/`
   - Enable "Developer mode" in the top right
   - Click "Load unpacked" and select the `dist` folder

## 📋 Permissions

The extension requires the following permissions:
- `tabs` - To monitor active tabs and track website visits
- `storage` - To save browsing statistics locally
- `activeTab` - To access information about the currently active tab
- `bookmarks` - For potential bookmark-related features

## 🎯 How It Works

1. **Background Monitoring**: The background service worker (`background.ts`) listens for tab activation events
2. **Time Tracking**: When you switch tabs, it calculates time spent on the previous website
3. **Data Storage**: Statistics are stored in Chrome's local storage
4. **Popup Display**: Click the extension icon to view your browsing statistics
5. **Visit Notifications**: Get notified about your last visit to the current website

## 🔨 Development

### Available Scripts

- `yarn dev` - Build for development
- `yarn build` - Build for production
- `yarn test` - Run tests (currently not implemented)

### Key Components

- **Main Component** (`src/components/Main/main.tsx`): Primary popup interface
- **Background Script** (`src/background/background.ts`): Handles tab monitoring and time tracking
- **Storage Handler** (`src/Utils/extension/storageHandler.ts`): Manages data persistence
- **Content Script** (`src/contentScript/`): Injected into web pages for additional functionality

## 🎨 UI Features

- **Responsive Design**: Built with Tailwind CSS for a modern look
- **Notification System**: Shows last visit information
- **Statistics Display**: Visual representation of browsing data
- **Quick Settings**: Easy access to extension settings

## 📊 Data Structure

The extension stores data in the following format:
```typescript
interface StatProps {
  name: string;        // Website hostname
  lastUsed: number;    // Timestamp of last visit
  totalTime: number;   // Total time spent (in milliseconds)
  // Additional properties...
}
```

## 🔮 Future Enhancements

- Daily/weekly/monthly time reports
- Website blocking functionality
- Productivity goals and reminders
- Export data functionality
- Dark mode support

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the ISC License.

## 🐛 Issues & Support

If you encounter any issues or have suggestions for improvements, please create an issue in the repository.

---

**Note**: This extension is built using Chrome Extension Manifest V3 and is compatible with modern Chrome browsers.
