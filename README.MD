# Automation Bot

This bot is meant to be an automation between actions on discord and Google spreadsheets so we don't have to do it manually. This project is probably not too much of use to you. 

# Setting up

## Prerequisites

this project requires:
* [Node.JS](https://nodejs.org) with version 8.0 or newer
* [Discord.js](https://discord.js.org/#/), latest
* [Postgresql](https://www.postgresql.org/), latest 
* A Google Account

Check the package.json for the complete list of npm packages. 

## Installation 

## Acquire google docs OAuth access

1. Use [this wizard](https://console.developers.google.com/flows/enableapi?apiid=sheets.googleapis.com) to create or select a project in the Google Developers Console and automatically turn on the API. Click Continue, then Go to credentials.
2. On the Add credentials to your project page, click the Cancel button.
3. At the top of the page, select the OAuth consent screen tab. Select an Email address, enter a Product name if not already set, and click the Save button.
4. Select the Credentials tab, click the Create credentials button and select OAuth client ID.
5. Select the application type Other, enter the name "Google Sheets API Quickstart", and click the Create button.
6. Click OK to dismiss the resulting dialog.
7. Click the file_download (Download JSON) button to the right of the client ID.
8. Move this file to your working directory and rename it client_secret.json.

# Node.js

Run following script to install:

    TODO



# Postgresql:

Run following script: 

    TODO