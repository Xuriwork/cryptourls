# CryptoURLs

A content aggregator built in React and Python, web scraps content and display it nice looking interface.
## Tech Stack

- React - used for the front-end UI
- Python - the web scrapper is built fully in Python
- GCP - Cloud Functions and Cloud Scheduler - used to run the python web scrapper code every 2 hours to scrap content and save the data to the Firestore database.
- Firebase - used for hosting and database needs

![CryptoURLs Logo](https://github.com/Xuriwork/cryptourls/blob/master/images/cryptourls-page.png)

[Link to the Python Code, which is run on GCP](https://github.com/Xuriwork/cryptourls/blob/master/python/web_scrapper.py)

## Installation

Use yarn or npm to install dependencies

```bash
yarn install
```
or
```bash
npm install
```

## Running the application

Runs the app in the development mode.

```bash
yarn start
```
or
```bash
npm start
```
