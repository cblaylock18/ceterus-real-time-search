// select HTML elements for use later
const searchInput = document.getElementById("search");
const filterInput = document.getElementById("filter");
const dataTable = document.getElementById("data-table");

// set users to null at module scope (similar to useState)
let users = null;

const getUsers = async () => {
    const url = "https://jsonplaceholder.typicode.com/users";

    appendFullLengthRow("Loading users...", "loading-row");

    try {
        const response = await fetch(url);
        if (!response.ok) {
            // handles non-200 status codes
            throw new Error(
                `HTTP error while fetching users. Status: ${response.status}`
            );
        }
        const data = await response.json();

        // forms the user data into an easier format to search and filter
        //  Note: String() returns "" for undefined values
        return data.map((user) => ({
            name: String(user.name),
            email: String(user.email),
            companyName: String(user.company?.name ?? ""), // handles scenario where company is undefined
        }));
    } catch (err) {
        console.error("Error fetching users:", err);
        return []; // return an empty array (no users) if there's an error
    }
};

// generic function to append full-length row to table
function appendFullLengthRow(message, htmlClass) {
    const row = document.createElement("tr");
    const cell = row.insertCell();
    cell.textContent = message;
    cell.classList.add(htmlClass);
    cell.colSpan = dataTable.rows[0].cells.length;
    dataTable.appendChild(row);
}

const displayUsers = async () => {
    if (!users) {
        // if users is null, fetch users (in memory cache)
        users = await getUsers();
    }

    while (dataTable.rows.length > 1) {
        dataTable.deleteRow(1);
    }

    if (users.length === 0) {
        // if no users were returned, display error message
        appendFullLengthRow("Unable to fetch users", "error-row");
        return;
    }

    users.forEach((user) => {
        // grab search and filter values
        const searchText = String(searchInput.value).toLowerCase(); // lowercase for case-insensitive search
        const filter = String(filterInput.value);

        // return if filter and search requirements aren't met
        if (filter === "all") {
            if (
                !Object.values(user).join("").toLowerCase().includes(searchText)
            ) {
                return;
            }
        } else if (!String(user[filter]).toLowerCase().includes(searchText)) {
            // lowercase for case-insensitive search
            return;
        }

        // create a new row and insert user data
        const row = document.createElement("tr");

        for (const key in user) {
            row.insertCell().textContent = user[key];
        }
        dataTable.appendChild(row);
    });

    // if no rows were added, display no results message
    if (dataTable.rows.length === 1) {
        appendFullLengthRow("No results found", "no-results-row");
    }
};

function debounce(fn, ms = 300) {
    let timer;
    return (...args) => {
        clearTimeout(timer);
        timer = setTimeout(() => fn(...args), ms);
    };
}

searchInput.addEventListener("input", debounce(displayUsers));
filterInput.addEventListener("change", displayUsers); // no debounce on filter change since it changes less frequently

displayUsers();
