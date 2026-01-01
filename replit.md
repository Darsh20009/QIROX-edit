# QIROX Project Documentation

## Overview
QIROX is a modular, multi-tenant system built with a security-first and audit-first approach.

## Principles
- **Human-Driven**: All major actions require human approval.
- **One System**: Unified design system for Public Site, Platform, and Dashboard.
- **Modular**: Component-based architecture (Pages, Blocks, Orders, etc.).
- **Multi-Tenant**: Logic-based data isolation per tenant.
- **Audit-First**: Comprehensive logging of all events.
- **Security-First**: Rate limiting, encryption, and granular permissions.
- **MongoDB Only**: Primary data persistence in MongoDB.
- **Employee-Provisioned**: Projects spaces are created by employees for clients.
- **Internal Meetings**: ZEGO-based internal meetings.

## Technical Stack
- **Frontend**: React + Vite + Tailwind CSS + Shadcn UI
- **Backend**: Express + Node.js
- **Database**: MongoDB (Mongoose)
- **State Management**: TanStack Query
- **Routing**: Wouter
