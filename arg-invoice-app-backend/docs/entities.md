# ENTITIES

## EN0001 - User
### Description
A user represents an authenticated application user, identified by an email address. The user
can perform all invoice-related operations within the system, such as creating, editing, and
deleting invoices and invoice items, see EN0002 - Invoice.
Authentication is required to access most functionalities. User authentication lifecycle is
managed through UC0002 - User logs in and UC0003 - User logs out. For more authentication
information, see FN0001 - Authentication.
The current system version does not support user roles. All users have the same level of access.

### Lifecycle
#### Create
The user entity is created through UC0001 (User creates an account).

#### Edit, Delete
In the current version of the system, a user account cannot be modified or deleted.

### Data structure
| Atribute 	| Type   	| Required 	| Source 	| Description                                        	|
|----------	|--------	|----------	|--------	|----------------------------------------------------	|
| Email    	| String 	| True     	| User   	| User email unique valid email address              	|
| Password 	| String 	| True     	| User   	| Encrypted user password at least 8 characters long 	|

---
## EN0002 - Invoice
### Description
An invoice represents a billing document created and managed by a user (EN0001 - User). It is
the main entity of the system and contains all information required to issue and track a financial
claim towards a client. An invoice includes identification data, client information, addresses,
dates, state, and one or more associated items (EN0003 - Item).
Each invoice is owned by the user who created it. A user can only view and manage their own
invoices and does not have access to invoices created by other users. This rule is enforced
across all invoice-related use cases.
Invoices are created in the PENDING state and can be changed to the PAID state. When an
invoice is marked as PAID, it is not possible to modify the invoice data except for the invoice
state. The current system version allows changing the invoice state from PAID back to
PENDING.
Each invoice is uniquely identified by a system-generated invoice ID created according to the
rules defined in FN0002 - Invoice ID generation. An invoice also includes the invoice issue
date and the due date. The due date is calculated by the system based on selected payment
terms, as defined in FN0003 - Invoice due date calculation, and is recalculated whenever
relevant invoice inputs change.

#### Invoice list
Invoices are presented to the user in an invoice list screen that supports filters (FN0004 -
Filtering) and pagination (FN0005 - Pagination).

#### Invoice detail
The invoice detail displays complete information about a single invoice selected from the invoice
list. It includes invoice identification data

### Lifecycle
#### Create
The invoice entity is created in UC0005 - User creates new invoice. Upon creation, the system
assigns a unique invoice ID, calculates the due date, and sets the initial invoice state to
PENDING.

#### Edit
Invoices can be modified through UC0006 - User edits invoice. Associated items may be
added, edited, or removed during this process via UC0008, UC0009, and UC0010.

#### Delete
An invoice can be deleted regardless of its current state through UC0007 - User deletes
invoice, which results in the removal of the invoice and all its associated items.

### Data structure
| Atribute            	| Type        	| Required 	| Source 	| Description                                                                                                                                                	|
|---------------------	|-------------	|----------	|--------	|------------------------------------------------------------------------------------------------------------------------------------------------------------	|
| ID                  	| Int         	| True     	| System 	| Unique invoice identifier generated according to FN0002. Format: {year}{incremental number} unique                                                        	|
| State               	| Enum        	| True     	| System 	| Current invoice state. Possible values: PENDING (default); PAID                                                                                             	|
| Issuer address      	| Association 	| True     	| User   	| The issuer address, consists of multiple fields. See Data structure - Address                                                                              	|
| Receiver address    	| Association 	| True     	| User   	| The receiver address, consists of multiple fields. See Data structure - Address                                                                            	|
| Receiver name       	| String      	| True     	| User   	| Name of the receiver                                                                                                                                       	|
| Receiver email      	| String      	| True     	| User   	| Email of the receiver valid email address                                                                                                                  	|
| Invoice description 	| String      	| True     	| User   	| Description of the invoiced work                                                                                                                           	|
| Invoice date        	| Date        	| True     	| User   	| Date when the invoice was issued                                                                                                                           	|
| Due date            	| Date        	| True     	| System 	| Calculated due date,  according to FN0003 - Invoice due date calculation                                                                                   	|
| Due period          	| Enum        	| True     	| User   	| The number of days from the invoice date until the due date. Used in FN0003 - Invoice due date calculation.  Possible values: 1 day; 7 days; 14 days; 30 days 	|
| Items               	| Association 	| True     	| User   	| One or more associated invoice items, see EN0003 - Item must exist at least one association                                                                	|
| Invoice total       	| Float       	| True     	| System 	| Total amount of all related items, see EN0003 - Item                                                                                                     	|
### Data structure - Address
| Atribute       	| Type   	| Required 	| Source 	| Description                                      	|
|----------------	|--------	|----------	|--------	|--------------------------------------------------	|
| Street address 	| String 	| True     	| User   	| Full street name and house number of the address 	|
| City           	| String 	| True     	| User   	| Name of the city                                 	|
| Post code      	| String 	| True     	| User   	| Postal or ZIP code                               	|
| Country        	| String 	| True     	| User   	| Country name                                     	|

---
## EN0003 - Item
### Description
An item represents a single invoice line item that describes a billed unit of work or product.
Items are always associated with exactly one invoice (EN0002 - Invoice) and cannot exist
independently. Item operations are only permitted while the parent invoice is in the PENDING
state, see EN0002 - Invoice.
Each item contains user-provided input data such as name, quantity, and price. The item total is
calculated automatically by the system as a multiplication of quantity and price. Any change to
item data triggers the recalculation of both the item total and the invoice total.

### Lifecycle
#### Create
An item is created during invoice creation (UC0005 - User creates new invoice) or while
editing an existing invoice (UC0006 - User edits invoice) via UC0008 - User adds item to
invoice.

#### Edit
An item can be edited through UC0009 - User edits item in invoice, provided that the parent
invoice is in the PENDING state. Editing an item results in the recalculation of the item total and
the overall invoice total.

#### Delete
An item can be removed through UC0010 - User removes item from invoice. Removing an item
also triggers the recalculation of the invoice total.
An invoice must contain at least one item; therefore, removing the last remaining item may block
invoice confirmation.

### Data structure
| Atribute 	| Type        	| Required 	| Source 	| Description                                                    	|
|----------	|-------------	|----------	|--------	|----------------------------------------------------------------	|
| Invoice  	| Association 	| True     	| User   	| Parent invoice to which the item belongs, see EN0002 - Invoice 	|
| Name     	| String      	| True     	| User   	| Item name or description                                       	|
| Quantity 	| Float         	| True     	| User   	| Quantity of the item, must be greater than 0                    	|
| Price    	| Float       	| True     	| User   	| Unit price of the item                                         	|
