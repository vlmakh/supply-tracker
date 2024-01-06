# Supply tracker

Fullstack application for tracking the status of current deliveries.

The application helps to manage the current tasks of the supply department in
real time during its every step (Order, Invoice, Payment, Departure, Arrival).

Was created for using in supply department of Polysteel LLC.

## Frontend - React, TypeScript

- multilanguage: i18next
- state manager: zustand
- styling: emotion, styled-system, react-icons
- fetch: axios
- form validation: formik, yup
- date management: react-datepicker, date-fns
- adaptive layout for 3 breakpoints (mobile, tablet, desktop)
- choosing tasks by date period, by execution steps
- changing responsible person (available only for head of department)

## Backend - Node.js

- code: https://github.com/vlmakh/supply-tracker-server/
- hosting: render.com
- database: MongoDB
- registration: email credentials and email validation
- autorization: jsonwebtoken, using pair of tokens
