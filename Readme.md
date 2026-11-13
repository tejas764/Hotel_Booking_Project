<p align="center">
  <a href="Readme.md"><strong>OVERVIEW</strong></a> &nbsp; · &nbsp;
  <a href="DEMO.md"><strong>DEMO & SCREENSHOTS</strong></a> &nbsp; · &nbsp;
  <a href="DEMO.md#demo-setup"><strong>SETUP & DEPLOYMENT</strong></a>
</p>

# WanderLust — Accommodation Listings

A full-stack accommodation-listing application built with Express, MongoDB, and EJS. Visitors can browse properties; authenticated users can manage listings and write reviews.

**Node.js · Express · MongoDB · EJS · Passport · Cloudinary · Mapbox**

[Features](#features) · [Getting started](#getting-started) · [Configuration](#configuration) · [Project structure](#project-structure)

## Features

- Property listings with images, prices, locations, and descriptions
- Account registration, login, and session-based authentication
- Listing creation, editing, and deletion with ownership checks
- Reviews associated with listings and their authors
- Cloudinary image uploads and Mapbox geocoding
- Server-rendered pages, flash messages, and validation

## Getting started

You need Node.js/npm, a MongoDB database, Cloudinary credentials, and a Mapbox token. The package manifest declares Node.js `23.11.0`; compatibility with other versions should be checked when upgrading.

```bash
git clone https://github.com/tejas764/Hotel_Booking_Project.git
cd Hotel_Booking_Project
npm install
```

Configure the services below, then run:

```bash
node app.js
```

Open **http://localhost:3000/listings**. The root URL is a simple route check. There is no `npm start` script in the current manifest.

## Configuration

Create a local `.env` file:

```dotenv
ATLASDB_URL=mongodb://127.0.0.1:27017/WanderLust
SECRET=replace-with-a-long-random-session-secret
CLOUD_NAME=your-cloud-name
CLOUD_API_KEY=your-api-key
CLOUD_API_SECRET=your-api-secret
```

`ATLASDB_URL` can also point to your MongoDB Atlas database. In production, supply these settings through the hosting environment.

Mapbox is currently configured with a token in `controllers/listing.js`. Replace it with your own configuration and check the map-related frontend files for matching token settings before deployment. No Mapbox environment variable is wired into that controller yet.

## Project structure

| Path | Purpose |
| --- | --- |
| [app.js](app.js) | Express setup, sessions, authentication, routes |
| [routes/](routes/) | Listing, user, and review routes |
| [controllers/](controllers/) | Request handlers |
| [models/](models/) | MongoDB models |
| [views/](views/) | EJS pages and layouts |
| [public/](public/) | Styles, scripts, and static assets |
| [middleware.js](middleware.js) | Authorization and validation helpers |
| [cloudConfig.js](cloudConfig.js) | Cloudinary upload configuration |
| [init/](init/) | Data initialization scripts; inspect before running |

## Scope and validation

This codebase focuses on listings and reviews. A reservation checkout or payment workflow is not documented as implemented here. The `npm test` command is a placeholder that exits with an error; verify signup/login, listing creation, image upload, and reviews manually when making changes.

## Credits and licensing

Maintained by Tejas Bhandarkar. The package manifest declares ISC; no standalone license file is included.
