# LoginAutomationTests
I created these automation tests as a demo for how to test login functionality, a few notes about the project and the tests as well:
- I created these automation tests using Cypress, Typescript, and Cypress Testing Library and I opted for page object modeling
- You will notice that I have used comments in every test explaining almost every line of code, which might seem a bit redundant, I have done this intentionally to make my line of thoughts and processes more clear and although I do use comments in my actual tests in real world, I do it a bit more conservatively as to avoid polluting the code.
- I did create page object models for 2 pages, but only for the elements that I interacted with in my tests.
- I did NOT create custom commands as I didn't see any use for it, but if I were to tests other page/functionalities after logging in, I definitely would have also created a login command that would be through API, which is faster.
- I used Cypress Testing Library for creating locators (interacting with elements), because it provides methods that most closely mimic user's actions, and also provides some level of Accessibility Testing or awareness of accessibility.
