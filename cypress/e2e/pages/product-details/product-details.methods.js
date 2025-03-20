import { CommonPageMethods } from "../common-page/common-page.methods";
import { ProductDetailsElements } from "./product-details.elements";

export class ProductDetailsMethods {
    static clickOnAddToCartButton() {
        ProductDetailsElements.buttons.addToCar.click();
    }

    static verifyProductDetailsPageDisplayed() {
        ProductDetailsElements.buttons.addToCar.should('be.visible');
    }

    static verifyProductAddedMessage() {
        CommonPageMethods.verifyAlert('Product added.');
    }
}