<div align="center">

# 💰 Tax Loss Harvesting Tool

[![React](https://img.shields.io/badge/React-18.2.0-blue?logo=react)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.2.2-blue?logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4.0-38B2AC?logo=tailwind-css)](https://tailwindcss.com/)
[![Vite](https://img.shields.io/badge/Vite-5.0.8-646CFF?logo=vite)](https://vitejs.dev/)

<p>
A sophisticated, production-ready <strong>Tax Loss Harvesting</strong> web application that helps cryptocurrency investors optimize their tax liabilities through strategic loss harvesting.
</p>

<p>
Built with modern React, TypeScript, and TailwindCSS with a focus on performance, accessibility, and user experience.
</p>

</div>

---

## 📸 Screenshots

### Desktop View - Dark Mode
<div align="center">
  <img width="1801" height="908" alt="Screenshot 2026-04-16 215856" src="https://github.com/user-attachments/assets/5cac0830-1d8b-4a98-9cca-76f1ca194bdd" />
<div align="center">

  <p><em>Dark mode interface with comprehensive tax optimization dashboard</em></p>
</div>

### Desktop View - Light Mode
<div align="center">
 <img width="1817" height="904" alt="Screenshot 2026-04-16 215916" src="https://github.com/user-attachments/assets/82adcc97-fa08-48c0-94a5-e8a043026309" />
  <p><em>Clean light mode interface for comfortable viewing</em></p>
</div>

### Holdings Table with Selection
<div align="center">
  <img width="1847" height="731" alt="Screenshot 2026-04-16 215935" src="https://github.com/user-attachments/assets/6bf4c97f-4910-4102-b335-96d2a59337e3" />

  <p><em>Interactive holdings table with real-time tax calculations</em></p>
</div>

### Tax Optimization Results
<div align="center">
  <img width="1862" height="821" alt="Screenshot 2026-04-16 215955" src="https://github.com/user-attachments/assets/f7853f32-4021-432f-b8f0-554c912676fd" />

  <p><em>Real-time tax savings calculation with visual feedback</em></p>
</div>

### Mobile Responsive View
<div align="center">
  <img width="458" height="805" alt="Screenshot 2026-04-16 220032" src="https://github.com/user-attachments/assets/27b81417-3250-4383-b5ef-9f1db32dbcc6" />

  <p><em>Fully responsive design optimized for mobile devices</em></p>
</div>

---

## ✨ Features

### 🎯 Core Functionality
- **Real-time Tax Calculations**: Instantly see the impact of selling assets on your tax liability
- **Pre & Post Harvesting Comparison**: Side-by-side comparison of capital gains before and after tax harvesting
- **Smart Asset Selection**: Select/deselect assets to optimize tax savings
- **STCG & LTCG Tracking**: Separate tracking of Short-Term and Long-Term Capital Gains
- **Tax Savings Estimation**: Automatic calculation of potential tax savings (30% tax rate)

### 🎨 User Experience
- **Dark/Light Mode**: Toggle between themes with persistent storage
- **Responsive Design**: Seamless experience across desktop, tablet, and mobile devices
- **Interactive Tooltips**: "How it Works" guide for new users
- **Collapsible Disclaimers**: Important tax information at a glance
- **Smooth Animations**: Polished transitions and micro-interactions

### 📊 Data Management
- **Pagination**: View holdings in chunks of 5 (View More/View Less)
- **Select All/None**: Bulk selection functionality
- **Real-time Updates**: Instant reflection of selections in calculations
- **Mock API Integration**: Realistic data fetching with loading states

### 🔧 Technical Excellence
- **TypeScript**: Type-safe code with comprehensive interfaces
- **Custom Hooks**: Reusable logic with `useHoldings` and `useCapitalGains`
- **Component Architecture**: Modular, reusable components
- **Error Handling**: Graceful error states and fallbacks
- **Performance Optimized**: Efficient state management and rendering

---

## 🚀 Live Demo

**[🔗 Click here to view the live application](https://your-deployment-url.vercel.app)**

---

## 🛠️ Tech Stack

| Category | Technology |
|----------|-----------|
| **Frontend Framework** | React 18.2.0 |
| **Language** | TypeScript 5.2.2 |
| **Styling** | Tailwind CSS 3.4.0 |
| **Build Tool** | Vite 5.0.8 |
| **State Management** | React Hooks (useState, useEffect, useContext) |
| **Code Quality** | ESLint, TypeScript Strict Mode |

---

## 📦 Installation & Setup

### Prerequisites

Ensure you have the following installed:
- **Node.js** (v18 or higher)
- **npm** or **yarn**

### Step-by-Step Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/tax-loss-harvesting.git
   cd tax-loss-harvesting
   ```

2. **Install dependencies**
   ```bash
   npm install
    # or
   yarn install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```
## Project Structure
```bash
src/
├── components/
│   ├── cards/
│   │   ├── PreHarvestCard.tsx       # Pre-harvesting capital gains display
│   │   └── PostHarvestCard.tsx      # Post-harvesting calculations with savings
│   ├── table/
│   │   ├── HoldingsTable.tsx        # Main holdings table with pagination
│   │   └── TableRow.tsx             # Individual table row component
│   └── common/
│       ├── Checkbox.tsx             # Custom checkbox with indeterminate state
│       ├── Loader.tsx               # Loading spinner and skeleton screens
│       ├── Tooltip.tsx              # Interactive tooltip component
│       ├── ThemeToggle.tsx          # Dark/Light mode toggle
│       └── Disclaimer.tsx           # Collapsible disclaimer section
├── hooks/
│   ├── useHoldings.ts               # Custom hook for holdings data
│   └── useCapitalGains.ts           # Custom hook for capital gains logic
├── utils/
│   └── calculations.ts              # Tax calculation utilities
├── services/
│   └── mockApi.ts                   # Mock API services with delays
├── types/
│   └── index.ts                     # TypeScript interfaces and types
├── pages/
│   └── Home.tsx                     # Main application page
├── App.tsx                          # Root component
├── main.tsx                         # Application entry point
└── index.css                        # Global styles and Tailwind config
```

## 💡 Usage Guide

### How to Use the Application

#### 1. View Your Capital Gains
- The left card (**Pre Harvesting**) shows your current capital gains
- Short-term and Long-term gains are displayed separately

#### 2. Select Assets to Sell
- Check the boxes next to assets you plan to sell
- Use **"Select All"** to quickly select all holdings
- Click **"View More"** to see additional holdings

#### 3. See Tax Optimization
- The right card (**After Harvesting**) updates in real-time
- Watch your effective capital gains decrease
- See potential tax savings displayed at the bottom

#### 4. Experiment
- Try different combinations of assets
- Toggle between dark and light modes
- Click **"How it works?"** for guidance

---

## 🔑 Key Features Explained

### 1. Tax Loss Harvesting Algorithm
- Tracks both **STCG (Short-Term Capital Gains)** and **LTCG (Long-Term Capital Gains)**
- Automatically categorizes gains as profits or losses
- Calculates net capital gains for tax optimization
- Estimates tax savings at a **30% tax rate**

### 2. Real-time State Management
- Selections are tracked across components
- Calculations update instantly on user interaction
- State persists across theme changes

### 3. Responsive Design
- Mobile-first approach with Tailwind CSS
- Breakpoints:
  - Tablet: 768px
  - Desktop: 1024px
- Touch-friendly interface
- Optimized table scrolling

### 4. Accessibility Features
- ARIA labels for screen readers
- Keyboard navigation support
- Focus management for modals/tooltips
- Sufficient color contrast ratios

---

## 📝 Assumptions

### Tax Calculations
- Tax Rate: Flat **30%**
- Fiscal Year: **FY 2024-25**
- Based on **Indian tax regulations**
- Only **realized gains/losses** considered

### Data & API
- Uses **mock API data**
- Price source assumed: CoinGecko
- Currency: USD (configurable to INR)
- Simulated delay: **600–800ms**

### User Experience
- Supports modern browsers (Chrome, Firefox, Safari, Edge)
- Optimized for **1366x768+**
- Requires JavaScript enabled
- Theme stored in **localStorage**

---

## ⚠️ Limitations
- No backend (frontend-only demo)
- No authentication
- Static/mock data
- No real trading (educational purpose)

---

## 🎨 Design Decisions

### Color Scheme
- Dark Mode: `bg-gray-900`
- Light Mode: `bg-gray-50`
- Primary: **Blue (#3B82F6)**
- Success: Green
- Error: Red

### Typography
- System fonts for performance
- Clear hierarchy using font weights
- Good readability with spacing

### Component Design
- Rounded corners (`rounded-xl`)
- Subtle shadows
- Consistent spacing (Tailwind scale)
- Smooth transitions (200–300ms)

---

## 🔮 Future Enhancements

### Planned Features
- Export reports (PDF/CSV)
- Historical tracking
- Portfolio analytics (charts)
- Multi-currency support
- AI-based tax suggestions
- Exchange API integrations
- User accounts
- Advanced filters

### Technical Improvements
- Unit Testing (Jest, RTL)
- E2E Testing (Cypress/Playwright)
- CI/CD (GitHub Actions)
- Performance monitoring (Web Vitals)
- Error tracking (Sentry)
- Analytics (privacy-focused)

---

## 👨‍💻 Author
**Your Name**  
- GitHub:[ [@Bhawana0218]((https://github.com/Bhawana0218)) ] 
- LinkedIn: Bhawana Bisht
- Email: bhawana1205bisht1802@gmail.com 
- Portfolio: [(https://my-portfolio-ten-beta-53.vercel.app/)]

---

## 🙏 Acknowledgments
- Design inspiration: Modern fintech apps
- Icons: Heroicons, Lucide React
- Mock data: CoinGecko API structure
- Community: React & TypeScript ecosystem

---

## 📞 Support
For support:
- Email: bhawana1205bisht1802@gmail.com  
- Or open an issue in the repository


<div align="center">

If you found this project helpful, please give it a ⭐ on GitHub!
Made with ❤️ using React, TypeScript, and Tailwind CSS
</div>
