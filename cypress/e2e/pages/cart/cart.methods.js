import { Logger } from "../../util/logger";
import { CommonPageMethods } from "../common-page/common-page.methods";
import { LoginMethods } from "../login/login.methods";
import { CartElements } from "./cart.elements";

export class CartMethods {
    static clickOnDeleteLink(productName) {
        CartElements.links.delete(productName).click();
    }

    static verifyProductAdded(productName) {
        CartElements.links.delete(productName).should('be.visible');
    }

    static verifyCartPageIsShown() {
        cy.url().should('include', `cart.html`);
    }

    static clickOnPlaceOrderButton() {
        CartElements.buttons.placeOrder.click();
    }

    static deleteProducts() {
        cy.intercept('POST', 'https://api.demoblaze.com/deleteitem').as('deleteItem');
        cy.get('a[onclick="deleteItem"]').each(link => {
            link.click();
            cy.wait('@deleteItem');
        });
    }

    static emptyCart(username, password) {
        Logger.subStep('Navigate to DemoBlaze');
        CommonPageMethods.navigateToDemoBlaze();
        Logger.subStep('Click on "Log out"');
        CommonPageMethods.logout();
        Logger.subStep('Click on "Home" option');
        CommonPageMethods.clickOnHomeOption();
        Logger.subStep('Click on "Log in"');
        CommonPageMethods.clickOnLoginOption();
        Logger.subStep(`Login with credentials ${username}/${password}`);
        LoginMethods.login(username, password);
        Logger.subStep('Click on "Cart" option');
        CommonPageMethods.clickOnCartOption();
        Logger.subStep('Deleting cart products');
        this.deleteProducts();
    }
}