# USE CASES

## UC0001 - User creates an account
### Participants
- User
- System

### Triggers
- User selects the "Sign up" action

### Preconditions
none

### Postconditions
- A new user account is created
- User is not logged in automatically

### Main flow
1. System: requires inserting the necessary data
2. User:
    - a. enters email and password
    - b. confirms
3. System: checks that the email does not already exist
4. System: creates a new user account
5. System: redirects the user to the login screen

### Alternative flow
#### 3A: Email or password is invalid
- System: displays a corresponding message to the user
- End
#### 4A: Email already exists
- System: displays a corresponding message to the user
- End

---
## UC0002 - User logs in
### Participants
- User
- System

### Triggers
- User selects the "Sign in" action

### Preconditions
- User account exists

### Postconditions
- User is logged in
- User is redirected to the invoice overview screen

### Main flow
1. System: requires inserting the necessary data
2. User: enters email and password
3. System: validates credentials
4. System:
    - a. logs in the user
    - b. redirects the user to the invoice overview screen

### Alternative flow
#### 3A: Invalid credentials
- System: displays an error message to the user
- End

---
## UC0003 - User logs out
### Participants
- User
- System

### Triggers
- User selects the "Sign out" action

### Preconditions
- User is logged in

### Postconditions
- User is logged out
- User is redirected to the login screen

### Main flow
1. System:
    - a. logs out the user
    - b. redirects the user to the login screen

### Alternative flow
none

---
## UC0004 - User recovers the password
**Not implemented yet**

---
## UC0005 - User creates new invoice
### Participants
- User
- System

### Triggers
- User selects the "Create invoice" action

### Preconditions
- User is logged in

### Postconditions
- A new invoice is created in the PENDING state

### Main flow
1. System: requires inserting the necessary data
2. User: 
    - a. fills in invoice details
    - b. adds at least one item (includes UC0008)
3. User: confirms
4. System:
    - a. generates a new invoice ID (based on rules described in FN0002)
5. System:
    - a. creates a new invoice
    - b. creates and associates all related items

### Alternative flow
#### 3A: Missing mandatory fields
- System: displays an error message to the user
- Continues with step 2 of the main flow

#### 3B: No items added
- System: displays an error message to the user
- Continues with step 2 of the main flow

---
## UC0006 - User edits invoice
### Participants
- User
- System

### Triggers
- User selects the "Edit invoice" action

### Preconditions
- User is logged in
- Invoice exists

### Postconditions
- The invoice is updated

### Main flow
1. System: loads invoice detail
2. System: Verifies that the state is PENDING
3. User:
    - a. modifies invoice data
    - b. modifies items (extends UC0008, UC0009, UC0010)
4. User: confirms the changes
5. System: saves the changes

### Alternative flow
#### 2A: Invoice state is PAID
- System: disables editing of invoice fields except the state
- User: Changes the state
- Continues with step 3 of the main flow

#### 3A: New Items are added to the invoice
- System: creates and associates related items with the invoice
- End

#### 3B: Items are removed from the invoice
- System: deletes related items from the invoice
- End

#### 3C: Missing mandatory fields
- System: displays an error message to the user
- Continues with step 2 of the main flow

---
## UC0007 - User deletes invoice
### Participants
- User
- System

### Triggers
- User selects the "Delete invoice" action

### Preconditions
- User is logged in
- At least one invoice exists

### Postconditions
- The invoice is deleted

### Main flow
1. System: asks for confirmation
2. User: confirms deletion
3. System:
    - a. deletes all related Items
    - b. deletes the invoice

### Alternative flow
none

---
## UC0008 - User adds item to invoice
### Participants
- User
- System

### Triggers
- User selects "Add item" action during UC0005/UC0006

### Preconditions
- User is logged in
- The invoice is PENDING

### Postconditions
- The item is added to the invoice

### Main flow
1. System: requires inserting the necessary data
2. User: fills in invoice details
3. System: verifies that the quantity and price are filled
4. System:
    - a. calculates item total
    - b. calculates invoice total
5. Continues in the parent use case before confirmation

### Alternative flow
none

---
## UC0009 - User edits item in invoice
### Participants
- User
- System

### Triggers
- User is editing invoice (UC0006)

### Preconditions
- User is logged in
- The invoice is PENDING

### Postconditions
- The item is edited

### Main flow
1. System: loads item detail
2. User: modifies item details
3. System: verifies that the quantity and price are filled
4. System:
    - a. calculates the new item total
    - b. recalculates invoice total
5. Continue with step 3 in UC0005 or UC0006

### Alternative flow
none

---

## UC0010 - User removes item from invoice
### Participants
- User
- System

### Triggers
- User selects "Remove item" action during UC0005 or UC0006

### Preconditions
- User is logged in
- The invoice is PENDING

### Postconditions
- The item is removed from the invoice

### Main flow
1. System: deletes the item
2. System: recalculates invoice total
3. Continue with step 3 in UC0005 or UC0006

### Alternative flow
none

---
## UC0011 - User changes app theme
**Not implemented yet**
