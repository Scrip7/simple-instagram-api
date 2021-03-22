# simple-instagram-api

<div align="center">
  <p>
    <a href="https://www.npmjs.com/package/simple-instagram-api"><img src="https://img.shields.io/npm/v/simple-instagram-api.svg?maxAge=3600" alt="NPM version" /></a>
    <a href="https://github.com/Scrip7/simple-instagram-api/actions"><img src="https://github.com/Scrip7/simple-instagram-api/workflows/Testing/badge.svg" alt="Testing" /></a>
    <a href="https://github.com/Scrip7/simple-instagram-api/actions"><img src="https://github.com/Scrip7/simple-instagram-api/workflows/Testing%20Cron/badge.svg" alt="Testing cron" /></a>
    <a href="https://www.npmjs.com/package/simple-instagram-api"><img src="https://img.shields.io/npm/dt/simple-instagram-api.svg?maxAge=3600" alt="NPM downloads" /></a>
    <a href="https://app.codacy.com/gh/Scrip7/simple-instagram-api"><img src="https://app.codacy.com/project/badge/Grade/56a6625b29034fa4a921c3ef99e55b62" alt="Code quality"/></a>
    <img alt="NPM bundle size" src="https://img.shields.io/bundlephobia/minzip/simple-instagram-api" />
  </p>
</div>

A simple package to extract Media download links on Instagram by having their unique Postcode.

## 📋 Table of contents

-   [Features](#-features)
-   [Installation](#-installation)
-   [Example Usage](#-example-usage)
-   [Running tests](#-running-tests)

## 🚀 Features

-   It **does not** require any login information
-   Can fetch **IG-TV** and **album** posts
-   **Zero** dependency

## 📝 Installation

Install `simple-instagram-api` from npm:

```sh
npm install simple-instagram-api
```

## 📖 Example Usage

```TypeScript
import InstagramApi from "simple-instagram-api";

// https://www.instagram.com/p/CMf29lRF52W/
const code = "CMf29lRF52W";

InstagramApi.get(code).then((result) => {
  console.log(result);
});
```

Response:

```JSON
{
  "id": "2530983242020396438",
  "code": "CMf29lRF52W",
  "is_video": false,
  "url": "...",
  "caption": "Introducing the new ..",
  "children": [
    {
      "id": "2530983238446620648",
      "code": "CMf29h8FB_o",
      "is_video": false,
      "url": "..."
    },
    {
      "id": "2530983238438257890",
      "code": "CMf29h7lITi",
      "is_video": false,
      "url": "..."
    },
    {
      "id": "2530983238555903256",
      "code": "CMf29iCl6UY",
      "is_video": false,
      "url": "..."
    },
    {
      "id": "2530983238430039583",
      "code": "CMf29h7Fx4f",
      "is_video": false,
      "url": "..."
    }
  ]
}
```

## ⭐ Running tests

```sh
npm run test
```
