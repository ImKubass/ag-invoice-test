# ROADMAP

This document outlines planned features and enhancements for future versions of the system.

## TODO0001 - Password recovery
The system will support password recovery for users who have forgotten their credentials. The
user will be able to request a password reset by providing their registered email address. The
system will generate a secure, time-limited reset link and send it to the user via email, allowing
the user to set a new password.

---
## TODO0002 - Multiple themes
The system will support multiple visual themes in addition to the default theme. Users will be
able to select their preferred theme from the available options. The selected theme will be saved
and automatically applied during subsequent user sessions.

---
## TODO0003 - Form of Invoice payment
The system will support specifying the form of invoice payment. This functionality will allow the
user to define how an invoice is expected to be paid, such as bank transfer, cash, or other
supported payment methods. The selected form of payment will be stored as part of the invoice
data and displayed on the invoice detail and invoice outputs.

---
## TODO0004 - Client Catalog
The system will introduce a client catalog that allows users to create, store, and manage
reusable client records. Each client will contain identification and contact information such as
name, address, and email.
When creating or editing an invoice, the user will be able to select a client from the catalog
instead of entering client data manually. Changes in the client catalog will not automatically
affect already issued invoices, ensuring historical data consistency.

---
## TODO0005 - Multicurrency
The system will support working with multiple currencies across invoices. Each invoice will have
an explicitly defined currency, which will be applied to all associated items and totals.

---
## TODO0006 - Invoice soft delete
The system will support soft deletion of invoices. Instead of permanently removing an invoice
from the database, the system will mark the invoice as deleted while keeping all associated data
stored.
Soft-deleted invoices will not be visible in the default invoice list but will participate in invoice id
generation.

---
## TODO0007 - Additional Invoice State business logic
The system will extend the invoice lifecycle by introducing an additional DRAFT state. In this
state, an invoice is considered incomplete and can be freely edited by the user without any
business restrictions. Invoices in the DRAFT state are not yet treated as issued invoices and are
not included in standard invoice processing. Invoice state can change only from DRAFT to
PENDING state and then to PAID state.
Invoices in the PAID state become final and immutable. After reaching the PAID state, it will no
longer be possible to modify the invoice data or revert the invoice back to another state.

---
## TODO008 - Overdue Invoice Detection
The system will automatically detect overdue invoices based on the due date and current date
and mark them accordingly.

---
## TODO0009 - Tax / VAT Support
The system will support applying tax or VAT rates to invoice items or the entire invoice. Tax
calculation rules will be configurable and reflected in invoice totals and outputs.
