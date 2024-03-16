export class LoginPage {
  elements = {
    get pageHeader() {
      return cy.findByRole("heading", { name: "Login Page" });
    },

    get errorAlert() {
      return cy.findByRole("alert");
    },

    get loginBtn() {
      return cy.findByRole("button", { name: "Login" });
    },

    get passwordTxtBox() {
      return cy.findByLabelText("Password");
    },

    get usernameTxtBox() {
      return cy.findByRole("textbox", { name: "Username" });
    },
  };

  login(username: string, password: string) {
    this.elements.usernameTxtBox.type(username);
    this.elements.passwordTxtBox.type(password);
    this.elements.loginBtn.click();
  }
}
