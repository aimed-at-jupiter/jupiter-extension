# Jupiter Extension

A Chromium browser extension to fetch client data from a public, transform, autofill a form and optionally send the data to a backend server.

---

## Public API

- **API Chosen:** [JSONPlaceholder](https://jsonplaceholder.typicode.com/users)
- Simple API with realistic user data, I felt this was most similar to real world client data.

---

## Data Transformation

The raw API data is transformed (and summarised) into a `ClientSummary` object:

```ts
type ClientSummary = {
  fullName: string;
  title?: string;
  email: string;
  phone: string;
  address: {
    line1: string;
    city: string;
    postCode: string;
  };
};
```

#### Key Changes

- `name` is parsed for a valid title, which is then omitted from `name` and assigned to a seperate `title` key if a title is present.

- `address.suite` and `address.street` are combined and assigned to `address.line1`.
  If `suite` includes the string "suite", it is omitted, all other strings (eg. "Flat, "Apt.", "Great Northen Hotel") are kept.

- I decided to keep all values as strings, given the possible valid formats of phone numbers, post/zip codes, and building names/numbers.

#### example transformation

```
{
    "id": 6,
    "name": "Mrs. Dennis Schulist",
    "username": "Leopoldo_Corkery",
    "email": "Karley_Dach@jasper.info",
    "address": {
      "street": "Norberto Crossing",
      "suite": "Apt. 950",
      "city": "South Christy",
      "zipcode": "23505-1337",
      "geo": {
        "lat": "-71.4197",
        "lng": "71.7478"
      }
    },
    "phone": "1-477-935-8478 x6430",
    "website": "ola.org",
    "company": {
      "name": "Considine-Lockman",
      "catchPhrase": "Synchronised bottom-line interface",
      "bs": "e-enable innovative applications"
    }
  }
```

becomes

```
{
  fullName: "Dennis Schulist";
  title?: "Mrs";
  email: "Karley_Dach@jasper.info";
  phone: "1-477-935-8478 x6430";
  address: {
    line1: "Apt. 950 Norberto Crossing";
    city: "South Christy";
    postCode: "23505-1337";
  };
}
```

## Run the Server

#### Prerequisites

- Node.js (v16+ recommended)
- PostgreSQL installed locally

Ensure the PostgreSQL user has permissions to create databases

---

#### Install Dependencies

```
cd server
npm install

```

#### Setup Database

This will create the jupiter_clients database and clients table.

```
npm run setup-db
```

This runs setup-db.sql which creates the database and tables automatically.

#### Run the Server

```
npm run dev
```

The server will start on:
http://localhost:8080

#### API Endpoint

POST /clients

Send a client record to the backend.

Request Body (JSON)

```
{
  "title": "Mr",
  "fullName": "Dale Cooper",
  "email": "cooper@bluerose.com",
  "phone": "+1 425 888 2556",
  "address": {
    "line1": "315 Great Northern Hotel",
    "city": "Twin Peaks",
    "postCode": "WA 98065-9687"
  }
}
```

Response

201 — successfully sent to backend and stored in CRM db

500 — error saving the record

---

## How to Test the Extension

**1. Load the Extension**

- Open Chrome/Edge/Brave.

- Go to chrome://extensions (or edge://extensions / brave://extensions).

- Enable Developer mode.

- Click Load unpacked and select the /extension folder.

**2. Open the Demo Form**

- Open demo-site/client-form.html in your browser.

This is a simple HTML page with inputs for:
Title
Full Name
Email
Phone
Address Line 1
City
Post Code

**3. Fetch and Autofill**

- Click the extension icon to open the popup.

- Click on a client to expand and preview details.

- Click Autofill Form — the demo page should populate with the client’s info.

**4. Optional: Send to CRM**

- Click Send to CRM to post the client record to the local backend.

- Button will show Sending…, then Sent (green) on success.

- Errors are displayed in red.

Thank you for taking the time to check out my extension!
