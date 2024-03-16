import { LoginPage, SecureAreaPage } from "../pages";
import validUser from "../fixtures/users.json";

const loginPage = new LoginPage();
const landingPage = new SecureAreaPage();

describe("Login Page Tests", () => {
  beforeEach(() => {
    cy.visit("/login");
  });
  it("Logging in with valid credentials", () => {
    cy.intercept("GET", "/secure").as("landingPageLoaded"); // Spying and later asserting that user successfully logged in before continuing with UI assertions

    cy.url().should("include", "/login"); // Url includes '/login' before logging in
    loginPage.login(validUser.username, validUser.password);

    cy.wait("@landingPageLoaded").its("response.statusCode").should("eq", 200); // Asserting 'secure area' page has loaded

    cy.url().should("include", "/secure"); // Url includes '/secure' after logging in
    landingPage.elements.pageHeader
      .should("have.text", "Secure Area")
      .and("be.visible");
    landingPage.elements.logoutBtn
      .should("have.attr", "href", "/logout")
      .and("be.visible");
  });

  it("Logging in with invalid password", () => {
    // Before attempting login
    cy.url().should("include", "/login");
    loginPage.elements.errorAlert.should("not.exist"); // Asserting no error messages exist
    loginPage.login(validUser.username, "invalidPassword"); // Attempting Login

    cy.url().should("include", "/login"); // Url includes '/login' after attempting login
    loginPage.elements.errorAlert
      .should("be.visible")
      .and("include.text", "Your password is invalid!"); // Asserting Error message (for invalid password) is displayed
    loginPage.elements.pageHeader
      .should("have.text", "Login Page")
      .and("be.visible");
    loginPage.elements.loginBtn.should("be.visible");
  });

  it("Logging in with invalid username", () => {
    // Before attempting login
    cy.url().should("include", "/login");
    loginPage.elements.errorAlert.should("not.exist");
    loginPage.login("invalidUsername", validUser.password); // Attempting Login

    cy.url().should("include", "/login"); // Url includes '/login' after attempting login
    loginPage.elements.errorAlert
      .should("be.visible")
      .and("include.text", "Your username is invalid!"); // Asserting Error message (for invalid username) is displayed
    loginPage.elements.pageHeader
      .should("have.text", "Login Page")
      .and("be.visible");
    loginPage.elements.loginBtn.should("be.visible");
  });

  it("Logging in without username or password", () => {
    // Before attempting login
    cy.url().should("include", "/login");
    loginPage.elements.errorAlert.should("not.exist");
    loginPage.elements.loginBtn.click(); // Attempting Login

    cy.url().should("include", "/login"); // Url includes '/login' after attempting login
    loginPage.elements.errorAlert
      .should("be.visible")
      .and("include.text", "Your username is invalid!"); // Asserting Error message (for invalid username) is displayed ******** I think a real application would have a more accurate error message for this scenario ***********

    loginPage.elements.pageHeader
      .should("have.text", "Login Page")
      .and("be.visible");
    loginPage.elements.loginBtn.should("be.visible");
  });

  it("Directly visiting 'Secure Area' page url without logging in", () => {
    // Before attempting direct url visit
    cy.url().should("include", "/login");
    loginPage.elements.errorAlert.should("not.exist"); // Asserting no error messages exist

    cy.visit("/secure");

    loginPage.elements.errorAlert
      .should("exist")
      .and("include.text", "You must login to view the secure area!");
    loginPage.elements.pageHeader
      .should("have.text", "Login Page")
      .and("be.visible");
    loginPage.elements.loginBtn.should("be.visible");
  });
});
