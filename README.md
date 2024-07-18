# express-2fa
Express REST API with 2FA

## Getting started
### Install dependencies
You can use whichever node package manager you like. I used npm
```
npm install
```

### Environment Variables
To use this application you need a few environment variables saved in a ```.env``` file at the root of this project:
```
DATABASE_URL="mongodb+srv://username:password@mongodb.endpoint/DATABASE_NAME?retryWrites=true&w=majority"
PASSWORD_SALT="secretSalt"
JWT_SECRET="any string"
TWILIO_ACCOUNT_SID="sid beginning with ac"
TWILIO_AUTH_TOKEN="some token"
TWILIO_PHONE_NUMBER="phonenumber"
```

### Start the server
To start the server on ```localhost:3000``` run the following:
```
npm run dev
```

You can change the port in ```src/server.ts```


**Task requirements**

- Make sure your feature **works as expected**
- Your code is **easy to understand** and follows best practices

## **Backend engineer challenge**

You need to implement the backend part for the following user story. Please, make sure all of the acceptance criteria are met.

**User story**

- A user should be able to register/login with his name, email, mobile and login with a 2FA. A combination of SMS (for example Twilio) and a secure password.
- The user should only be able to change his name and email but not his mobile number.
- To be able to change the password, an SMS verification is required.

**Acceptance criteria**

- ExpressJs && (NodeJS || Typescript) should be used.
- The functions should be accessible via API endpoints.
- With two-factor authentication, external services can be used for sending SMS messages, for example.However, it is not allowed to implement the complete 2FA via external services.

**General questions**

How much time did you spend working on the solution?

 - Taking into account planning the overall project structure and figuring out how to achieve a good level of modularity, I spent roughly 3 to 4 hours.

What’s the part of the solution you are most proud of?

- I am most proud of the overall project structure/architecture, dividing it into classes with Interface and using dependency injection to ensure a modular structure

If you had more time, what other things you would like to do?
- Try to improve the database integration
- Add unit tests and integration tests.
- Add input validation and improve error handling.
- Improve secruity of the JWTs with a public/private key pair

Do you have any feedback regarding this coding challenge?
- The challenge was simple but covered a broad range of important backend development concepts. It was a good playground for me to implement concepts I barely got to see, like dependency injection, and to gain more experience with new technologies or improve my skills with technologies I don't have much experience like mongodb