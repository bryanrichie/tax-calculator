# Tax Calculator

Vercel deployment:
https://tax-calculator-pearl.vercel.app/

Tax calculator created with Next.js to calculate a simple tax amount estimation from a given income and tax rates year.

The goal of this project was to learn and gain a better understanding of a new set of technologies that I had not used before.

Some key things I have learned from this project are:

- Utilising `shadcn/ui` and Tailwind CSS to create and design the frontend UI of the form and results table
- Basic form validation using Zod to shape the form payload and ensure data entered on the form is the correct shape
- Using Next.js server actions to fetch tax rates data without the need for any API calls before performing calculations and returning the results to the frontend

Some things to consider next time or implement in the future:

- Adding simple unit tests to ensure my functions are working as expected
- Instead of hardcoding the select dropdown used to select tax rates year, create a function that returns an array of strings using the keys of the tax rates data objects
- Creating a proper database with Postgres and `pg` to query instead of using mocked dummy data to more accurately resemble a real world app

## Features

- Calculate tax amount based on taxable income.
- Calculate other values such as superannuation, gross income, net income, etc.

## Architecture

### Technologies

- Next.js
- TypeScript and React
- `shadcn/ui`
- Tailwind CSS

### Folder layout:

- `app`: Contains the root layout, page component, and global css file
- `actions`: Contains the server action used to calculate all tax data after taking in a payload and fetching tax rates data from services
- `components`: Contains functional components and UI components imported from `shadcn/ui`
- `data`: Contains mocked tax rates data that is fetched by a service function
- `helper`: Contains helper functions for formatting currency, etc
- `services`: Contains the tax-rates services file, which fetches the dummy data from the mocked data in `data` and sends it to calculate tax server action
- `types`: Contains all interfaces and types used across the whole app

## Installation

1. Clone the repository:

```bash
git clone https://github.com/bryanrichie/tax-calculator.git
```

2. Navigate to the project directory:

```bash
cd tax-calculator
```

3. Install dependencies:

```bash
npm install
# or
yarn
```

## Usage

1. Start the development server:

```bash
npm run dev
# or
yarn dev
```

2. Open your browser and go to http://localhost:3000 to view the tax calculator.

3. Enter your values into the form

4. Submit the form to see all calculated amounts
