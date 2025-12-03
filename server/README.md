# Jupiter API Server

This is a minimal backend server for the Jupiter Extension.  
It exposes a simple POST endpoint to receive client records ("Send to CRM" feature).

---

## Prerequisites

- Node.js (v16+ recommended)
- PostgreSQL installed locally

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

#### Notes

Ensure the PostgreSQL user (postgres) has permissions to create databases.
