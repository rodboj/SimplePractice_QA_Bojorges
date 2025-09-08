# SimplePractice | QA Automation (Playwright + TypeScript)

This repository is an implementation of the SimplePractice QA assessment, developed with Playwright + TypeScript.
The goal is to showcase end-to-end testing skills with a focus on: 
Page Object Model and centralized selectors and implementing environment-based credentials for security.

The test flow  covers the following scenario:
* Login to SimplePractice using the credentials provided

* Navigate to the Tasks page

* Create a new task → verify that it was successfully created

* Complete this task → verify that it was successfully marked as completed

In addition, I added a Microsoft File on the repository por the Analytical Part of the assesment.

# Pre Prerequisites
- Node 18+
- Google Chrome already bundled with Playwright browsers.

# Installation
```bash
npm i
npm run prepare
```
# Environment setup
```bash
cp .env.example .env
# SP_EMAIL= 'user'
# SP_PASSWORD= 'password'
# SP_BASE_URL=https://secure.simplepractice.com
```
# Run Tests
```bash
npm test
# Headed:
npm run test:headed
# View HTML report
npm run report
```
