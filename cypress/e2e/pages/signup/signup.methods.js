import { SignupElements } from "./signup.elements";

export class SignupMethods {
    static insertUsername(username) {
        SignupElements.textBoxes.username.invoke('val', username);
    }

    static insertPassword(password) {
        SignupElements.textBoxes.password.invoke('val', password);
    }

    static clickOnSignUpButton() {
        SignupElements.buttons.signup.click();
    }

    static signUp(username, password) {
        this.insertUsername(username);
        this.insertPassword(password);
        this.clickOnSignUpButton();
    }
}