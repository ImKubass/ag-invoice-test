# FUNCTIONS

## FN0001 - Authentication
The system provides basic 1F user authentication based on email and password credentials.
During user registration, the system ensures that each email address is unique. It is not possible
to create a new user account using an email address that already exists in the system.
Passwords must meet minimum security requirements and are stored securely. Authentication is
required for all invoice-related actions.

### Related Use cases
- UC0001 - User creates an account
- UC0002 - User logs in
- UC0003 - User logs out
- UC0004 - User recovers the password

---
## FN0002 - Invoice id generation
Each invoice created in the system is assigned a unique identifier generated automatically by
the system. The identifier is composed of the current year followed by an incremental number
(e.g. 2025000001, 2025000002, 2025000003).
The incremental sequence is not recalculated or reset when an invoice is deleted. The next
generated invoice identifier will use the largest found sequence number, incremented by 1.

### Example
In the system are invoices: 2025000001, 2025000002, 2025000003.
- When 02 is deleted, the next invoice will be 04 (the largest seq. number is still 03).
- When 03 is deleted, the next invoice will be 03 (the largest seq. number in this case is 02).

---
## FN0003 - Invoice due date calculation
The system calculates the invoice due date automatically based on the selected payment terms.
Supported payment terms include net 1 day, net 7 days, net 14 days, and net 30 days. The due
date is derived from the invoice issue date by adding the corresponding number of days.
Whenever the invoice issue date or payment terms are changed, the system recalculates the
due date accordingly.

---
## FN0004 - Filtering
The system allows users to filter the invoice list by invoice status. When the user navigates from
the invoice list to an invoice detail and then returns back to the invoice list, the system preserves
all previously applied filters.

---
## FN0005 - Pagination
The system supports pagination for the invoice list to ensure efficient data loading and improved
performance. Invoices are displayed in pages with a defined maximum number of items per
page.
Users can navigate between pages while maintaining the current filter. Pagination state is
preserved when returning to the invoice list.

---
## FN006 - Currency
The system supports working with a defined currency for invoice amounts. In the current
system version, a single currency is supported. All item prices, totals, and invoice totals are
displayed using the selected currency.

---
## FN007 - Dark mode
**Not yet implemented**
The application supports a dark mode that allows users to switch between light and dark visual
themes. The selected theme preference is saved and automatically applied during subsequent
user sessions.

### Related use cases
- UC0011 - User changes app theme
