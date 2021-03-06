#ERC20 SUPPORT
https://kyc-chain.atlassian.net/wiki/spaces/IDWAL/pages/37027901/Test+Plan+-+Expand+ERC20+Support

##TC01: Navigating to My Tokens

* Open ID Wallet Application
* Click "Restore Wallet" button
* Select "Keystore / Select"
* Enter password
* Click Unlock button
* In My Crypto section, click Settings (Gear) icon.
* ID Wallet application is opened
* "Import an Existing Wallet" screen is displayed
* "Keystore / Select" is selected
* Password is entered.
* User is redirected to Selfkey Dashboard.
* My Tokens screen is displayed with the following columns:
* Token Symbol
* Last Price
* Balance
* Total Value
* Token Address
* Actions (no heading label)

##TC02: Adding Tokens manually
###Prerequisite: TC01

* Click (plus) icon
* Click Add Manually tab
* Click each field without populating
* Populate Address field
* Hover (info) icon beside Address field
* Populate Token Symbol
* Populate Decimal Places
* Click Add Custom Token
* Note: You can repeat step 1 to 8 to add more custom tokens
* "Choose From List" and "Add Manually" tabs are shown where "Choose From List" screen is displayed by default
* "Add Custom Token" screen is displayed
* All fields have:
* a red asterisk \* shown beside field label when clicking the field
* error message "This field is required. Please enter <Field Label>" displayed when user moves to the other field
* Address field is populated without any error. Field accepts special character and limit to 1000 characters
* "You can find the address of your token by visiting ethlorer" tooltip is shown.
* Token Symbol field is populated without any error. Field accepts special character and limit to 1000 characters
* Decimal Places field accepts numeric only
* My Tokens screen is displayed. Newly added custom token is displayed

##TC03: Adding Tokens from Coinmarketcap
###Prerequisite: TC01

* In My Tokens screen, click (plus) icon.
* In the "Choose From List" screen, select a `<token>` by ticking token's checkbox. (Select as many as you like)
* Click Save button
* "Choose From List" and "Add Manually" tabs are shown where "Choose From List" screen is displayed by default. The "Choose From List" screen displays tokens from Coinmarketcap.
* Tokens are selected.
* Tokens selected are displayed in the My Tokens screen.

##TC04: Navigating to My Crypto
###Prerequisite: TC02, TC03

* Click hamburger icon
* Click Dashboard
* Check My Crypto section
* Navigation menu is shown
* Selfkey Dashboard is displayed
* My Crypto shows the following:
* table list of tokens with columns Token Name, Token Symbols and Token Value (in USD)
* Top 5 tokens are represented by different colors, percentage and token value in the pie chart
* Top 6 and below tokens are represented by one color and combined token value

##TC05: Deleting tokens
###Prerequisite: TC02, TC03

* In My Crypto section, click Settings (Gear) icon.
* Delete a custom token by clicking the delete icon.
* Delete a token from coinmarketcap by clicking the delete icon.
* My Tokens screen is displayed with:
* all tokens added are displayed
* All tokens are ranked by default based on the Total Value (from highest to lowest).
* If tokens reaches 20, (plus) is disabled.
* Each token has delete icon
* Custom Token is deleted and no longer displayed in the My Tokens screen.
* Token is deleted and no longer displayed.
