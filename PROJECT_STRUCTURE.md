# Laviou Frontend - Project Structure

## Overview
This is a Next.js 14+ application using the App Router architecture with TypeScript, featuring authentication, protected routes, and modular feature organization.

## Root Level Files

### Configuration
- `next.config.ts` - Next.js configuration
- `tsconfig.json` - TypeScript configuration
- `eslint.config.mjs` - ESLint configuration
- `postcss.config.mjs` - PostCSS configuration
- `next-env.d.ts` - Next.js TypeScript definitions

### Environment
- `.env.example` - Environment variables template
- `.env.local` - Local environment variables (gitignored)

### Dependencies
- `package.json` - Project dependencies and scripts
- `package-lock.json` - Locked dependency versions

### Git
- `.gitignore` - Git ignore rules
- `.git/` - Git repository

### Build Output
- `.next/` - Next.js build output (gitignored)

### Documentation
- `README.md` - Project documentation
- `PROJECT_STRUCTURE.md` - This file

## Source Structure (`src/`)

### App Router (`src/app/`)
The main application routes using Next.js App Router.

#### Root Files
- `layout.tsx` - Root layout component
- `page.tsx` - Home page component
- `globals.css` - Global CSS styles
- `favicon.ico` - Site favicon

#### Route Groups

**`(protected)/`** - Routes requiring authentication
- `layout.tsx` - Protected routes layout
- `concierge/` - Concierge functionality
- `dashboard/` - Main dashboard page
- `items/` - Item management pages
- `settings/` - User settings page
- `sharing/` - Sharing features

**`(public)/`** - Publicly accessible routes
- `layout.tsx` - Public routes layout
- `login/` - Login page
- `register/` - Registration page
- `forgot-password/` - Password recovery page
- `otp-verification/` - OTP verification page
- `reset-password/` - Password reset page

### Components (`src/components/`)
Reusable UI components used across the application.
- `AppLayout.tsx` - Main application layout component
- `Button.tsx` - Custom button component
- `Logo.tsx` - Application logo component
- `ModalComponent.tsx` - Base modal component
- `ProfileDropdown.tsx` - User profile dropdown menu
- `modals/` - Modal-specific components
  - `LogoutModal.tsx` - Logout confirmation modal

### Feature Modules (`src/features/`)
Modular feature-based organization for better maintainability.
- `auth/` - Authentication components and logic
- `concierge/` - Concierge service features
- `items/` - Item management functionality
- `sharing/` - Content sharing features

### Core Infrastructure

**`src/lib/`** - Core utilities and configurations
- API client configuration and utilities
- Query client setup

**`src/providers/`** - React context providers
- Provider components for app-wide state management

**`src/types/`** - TypeScript type definitions
- Global type definitions used across the application

**`src/constants/`** - Application constants
- Centralized constant values

**`src/utils/`** - Utility functions
- Helper functions and utilities

**`src/assets/`** - Static assets
- `images/` - Image assets and icons

**`middleware.ts`** - Next.js middleware
- Handles authentication, redirects, and route protection

## Static Assets (`public/`)
Static files served from the root URL:
- `file.svg` - File icon
- `globe.svg` - Globe icon
- `next.svg` - Next.js logo
- `vercel.svg` - Vercel logo
- `window.svg` - Window icon

## Architecture Notes

### Authentication Flow
- Public routes: Login, Register, Forgot Password, OTP Verification, Reset Password
- Protected routes: Dashboard, Items, Settings, Sharing, Concierge
- Middleware handles route protection and redirects

### Feature Organization
- Each feature has its own directory under `src/features/`
- Shared components live in `src/components/`
- Reusable utilities are organized in `src/lib/`, `src/utils/`, and `src/constants/`
- Assets are centralized in `src/assets/`

### Technology Stack
- **Framework**: Next.js 14+ with App Router
- **Language**: TypeScript
- **Styling**: CSS with PostCSS
- **State Management**: React Query for server state
- **Authentication**: Custom implementation with middleware protection
- **UI Components**: Custom component library

### Development Workflow
- Use App Router conventions for routing
- Follow feature-based organization
- Implement proper TypeScript typing
- Maintain separation between public and protected routes
- Utilize shared components for consistent UI
- Keep utilities and constants well-organized
