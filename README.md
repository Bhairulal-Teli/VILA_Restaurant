# Hotel Management System (Staff Portal)

A professional **Hotel Management Website for Staff**, built using **React (JavaScript)** and **Supabase**, designed for efficient day-to-day hotel operations. The platform provides secure staff-only access, complete cabin and booking management, and a modern dashboard for real-time insights.

This application is intended strictly for **internal staff use**.

---

## Tech Stack

* **Frontend:** React (JavaScript)
* **Backend / Database / Auth:** Supabase
* **State & Data Handling:** React Hooks, Context API
* **Authentication & Authorization:** Supabase Auth + Row Level Security (RLS)
* **UI & UX:** Modern responsive UI with Dark & Light modes
* **Error Handling:** `react-error-boundary`
* **Additional Packages:** Various utility and UI helper libraries

---

## Core Features

### 1. Secure Staff Authentication & Authorization

* Staff must **log in** to access any internal content.
* **Unauthenticated users are blocked** from viewing dashboards, bookings, or cabins.
* **New staff members cannot self-register**.
* A new staff account can only be created **by an already logged-in staff member**, ensuring controlled access.
* Authorization rules ensure staff only access permitted features.

---

### 2. Cabin Management

Staff can fully manage hotel cabins:

* **Create new cabins** with detailed information
* **Edit existing cabins** (price, capacity, details, etc.)
* **Delete cabins** when no longer needed
* Centralized cabin list for easy management

All cabin operations are securely stored and managed through Supabase.

---

### 3. Booking Management

Staff can view and manage all guest bookings:

* View a complete list of bookings
* **Check-in guests** when they arrive
* **Check-out guests** when they leave
* Track booking status:

  * Unconfirmed
  * Checked-in
  * Checked-out

#### Sorting Options

* Sort bookings **A–Z / Z–A**
* Sort by **price: low → high**
* Sort by **price: high → low**

#### Filtering Options

* Filter bookings by status:

  * Unconfirmed
  * Checked-in
  * Checked-out

These tools allow staff to manage large volumes of bookings efficiently.

---

### 4. Dashboard & Analytics

A centralized dashboard provides an overview of hotel activity:

* **Today’s activity**:

  * Guests checking in today
  * Guests checking out today
* **Booking and revenue insights**
* Data visualization for different time ranges:

  * Last **7 days**
  * Last **30 days**

This helps staff quickly understand hotel performance and daily workload.

---

### 5. Hotel Settings Management

Staff can configure important hotel-wide settings:

* **Breakfast price**
* **Maximum guests per cabin**
* Other operational settings used across the system

Changes apply instantly and are reflected throughout the application.

---

### 6. Dark Mode & Light Mode

* Fully implemented **Dark Mode** and **Light Mode**
* User preference is persisted for future sessions
* Improves accessibility and user comfort

---

### 7. Error Handling & Stability

* Implemented global error handling using **Error Boundary**
* Prevents application crashes
* Displays user-friendly fallback UI in case of unexpected errors
* Improves overall reliability and user experience

---

### 8. Security & Best Practices

* Supabase **Row Level Security (RLS)** for data protection
* Environment variables used for sensitive configuration
* No public exposure of protected routes or internal data

---

## Intended Users

* Hotel managers
* Front-desk staff
* Administrative staff

This system is **not intended for guests or public use**.

---

## Responsiveness Note

This application is **not designed to be responsive** and is intended to be used **only on desktop or laptop screens**.

The system is optimized for staff operations that involve:
- Data-dense tables
- Dashboards with charts and analytics
- Complex filtering and sorting controls

Designing for larger screens ensures better readability, efficiency, and accuracy during daily hotel management tasks. Mobile usage is intentionally not supported to avoid compromised user experience and operational errors.

## Summary

This Hotel Management System provides a complete internal solution for hotel staff, combining:

* Secure authentication
* Cabin and booking management
* Real-time dashboard insights
* Flexible filtering and sorting
* Modern UI with dark/light themes
* Strong error handling and security

It is designed to be **scalable, secure, and easy to use** for real-world hotel operations.