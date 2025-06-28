# Ceterus Real-Time Search Filter

Chris Blaylock's submission for the take-home assessment from Ceterus (6-28-25).

This project fetches data from **[https://jsonplaceholder.typicode.com/users](https://jsonplaceholder.typicode.com/users)** and updates search results as the user types or changes the drop-down filter.

# Running the App

To run this app, you can:

1. Open it here at Github Pages: **[https://cblaylock18.github.io/ceterus-real-time-search/](https://cblaylock18.github.io/ceterus-real-time-search/)**

1. Fork the repository from Github
1. Clone it from your fork onto your computer
1. There shouldn't be any need to install dependencies, you can run the preview from your code editor.

# Breakdown

The three main files are index.html, index.js, and styles.css.

## `Index.html`

Gives initial layout of the page. I use JS to update the DOM as needed during fetch

## `Styles.css`

Simple responsive styling for the page. Clear styling for loading, errors, or no matches during search.

## `Index.js`

1. Selects relevant elements of the DOM to run subsequent functions
2. Initializes in-memory users variable so fetching only needs to happen once
3. Sets loading state
4. Fetches users
5. Clears loading state and displays users or error
6. Runs the users through a filter as the search input and filter input are changed
7. Debounces typing to avoid constant re-rendering
8. Finally, attached event listeners and runs initial function to display users

### Helper Functions

-   Append Full Length Row: Appends row to the table for messages like errors, loading, or no results found
-   Debounce waits 300ms before filtering the search when the user is typing
    -   Note: Not used on drop-down filter changes because the drop-down changes much less often on normal usage

## Assumptions Made

1.  I only want to see the name, email, and company name on the site
    -   Would just need to add the rest of the variables as desired to extend search features
2.  I don't need debounce on drop-down filter changes
3.  I don't need to optimize for extremely large data-sets
    -   Would require a better way to search many large strings, likely done in db operations rather than on frontend or server
4.  I assume that returning an empty string means that the fetch failed, which implies I expect the fetch to always pull users on success - true in this case, not necessarily true in all apps

## Example Input/Output:

**API Response:**
`[{  id:  1,  name:  “Leanne  Graham”,  email:  “Sincere@april.biz”,  company:  {  name:  "Romaguera-Crona”  },  ...}]`

**Input: Type “lean” in the search box.**
Output: Table shows only users with “lean” in their name, email, or company name (e.g., “Leanne Graham”).

**Input: Type “lean” in the search box and change the drop-down filter to "Email".**
Output: Table shows a "No results" message.

**Input: Type “invalid” (no matches).**
Output: Table is empty or shows a “No results” message.
