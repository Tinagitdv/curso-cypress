import { CartMethods } from "../pages/cart/cart.methods";
import { CommonPageData } from "../pages/common-page/common-page.data";
import { CommonPageMethods } from "../pages/common-page/common-page.methods";
import { HomeMethods } from "../pages/home/home.methods";
import { LoginData } from "../pages/login/login.data";
import { LoginMethods } from "../pages/login/login.methods";
import { PlaceOrderData } from "../pages/place-order/place-order.data";
import { PlaceOrderMethods } from "../pages/place-order/place-order.methods";
import { ProductDetailsMethods } from "../pages/product-details/product-details.methods";
import { ThankYouForYourPurchaseElements } from "../pages/thank-you-for-your-purchase/thank-you-for-your-purchase.elements";
import { ThankYouForYourPurchaseMethods } from "../pages/thank-you-for-your-purchase/thank-you-for-your-purchase.methods";
import { Logger } from "../util/logger";

const username = LoginData.validCredentials.username;
const password = LoginData.validCredentials.password;
const product = 'ASUS Full HD';

xdescribe(CommonPageData.testSuites.catalogoYCompras, () => {
    it('Navegación por categorías', () => {
        Logger.stepNumber(1);
        Logger.step('Iniciar sesión como usuario registrado');
        Logger.subStep('Navegar a la página de inicio');
        CommonPageMethods.navigateToDemoBlaze();
        Logger.subStep('Hacer click en "Log in" link');
        CommonPageMethods.clickOnLoginOption();
        Logger.subStep('Hacer "Log in"');
        LoginMethods.login(username, password);

        Logger.stepNumber(2);
        Logger.step('Navegar a la página de inicio');
        CommonPageMethods.clickOnHomeOption();

        Logger.stepNumber(3);
        Logger.step('Seleccionar una categoría de productos en el menú de navegación');
        HomeMethods.clickOnMonitorsOption();
        Logger.verification('Verificar que se muestre la lista de productos correspondiente a la categoría seleccionada');
        HomeMethods.verifyProductDisplayed('Apple monitor 24');
        HomeMethods.verifyProductDisplayed('ASUS Full HD');
    });

    it('Agregar producto al carrito', () => {
        Logger.stepNumber(1);
        Logger.step('Iniciar sesión como usuario registrado');
        Logger.subStep('Navegar a la página de inicio');
        CommonPageMethods.navigateToDemoBlaze();
        Logger.subStep('Hacer click en "Log in" link');
        CommonPageMethods.clickOnLoginOption();
        Logger.subStep('Hacer "Log in"');
        LoginMethods.login(username, password);

        Logger.stepNumber(2);
        Logger.step('Navegar a la página de inicio');
        CommonPageMethods.clickOnHomeOption();

        Logger.stepNumber(3);
        Logger.step('Seleccionar una categoría de productos en el menú de navegación');
        HomeMethods.clickOnMonitorsOption();

        Logger.stepNumber(4);
        Logger.step('Hacer click en un producto específico');
        HomeMethods.clickOnProductLink(product);

        Logger.stepNumber(5);
        Logger.step('Verificar que se muestra la página de detalle del producto');
        ProductDetailsMethods.verifyProductDetailsPageDisplayed();

        Logger.stepNumber(6);
        Logger.step('Hacer click en el botón "Add to cart"');
        ProductDetailsMethods.clickOnAddToCartButton();

        Logger.stepNumber(7);
        Logger.verification('Verificar que se muestra un mensaje de confirmación y el producto se agrega al carrito');
        ProductDetailsMethods.verifyProductAddedMessage();
        CommonPageMethods.clickOnCartOption();
        CartMethods.verifyProductAdded(product);

        Logger.postCondition('Empty cart and logout');
        CartMethods.emptyCart(username, password);
        cy.wait(5000);
        CommonPageMethods.logout();
    });

    xit('Realizar una compra', () => {
        Logger.stepNumber(1);
        Logger.step('Iniciar sesión como usuario registrado');
        Logger.subStep('Navegar a la página de inicio');
        CommonPageMethods.navigateToDemoBlaze();
        Logger.subStep('Hacer click en "Log in" link');
        CommonPageMethods.clickOnLoginOption();
        Logger.subStep('Hacer "Log in"');
        LoginMethods.login(username, password);

        Logger.stepNumber(2);
        Logger.step('Navegar a la página de inicio');
        CommonPageMethods.clickOnHomeOption();

        Logger.stepNumber(3);
        Logger.step('Seleccionar una categoría de productos en el menú de navegación');
        HomeMethods.clickOnMonitorsOption();

        Logger.stepNumber(4);
        Logger.step('Hacer click en un producto específico');
        HomeMethods.clickOnProductLink(product);

        Logger.stepNumber(5);
        Logger.step('Verificar que se muestra la página de detalle del producto');
        ProductDetailsMethods.verifyProductDetailsPageDisplayed();

        Logger.stepNumber(6);
        Logger.step('Hacer click en el botón "Add to cart"');
        ProductDetailsMethods.clickOnAddToCartButton();

        Logger.stepNumber(7);
        Logger.verification('Verificar que se muestra un mensaje de confirmación y el producto se agrega al carrito');
        ProductDetailsMethods.verifyProductAddedMessage();
        CommonPageMethods.clickOnCartOption();
        CartMethods.verifyProductAdded(product);

        Logger.stepNumber(8);
        Logger.verification('Hacer click en la opción "Cart" de la barra de navegación');
        CommonPageMethods.clickOnCartOption();

        Logger.stepNumber(9);
        Logger.verification('Verificar que se muestre la página del carrito de compras');
        CartMethods.verifyCartPageIsShown();

        Logger.stepNumber(10);
        Logger.verification('Hacer click en el botón "Place order"');
        CartMethods.clickOnPlaceOrderButton();

        Logger.stepNumber(11);
        Logger.verification('Completar los campos obligatorios en la página de información de envío');
        PlaceOrderMethods.insertOrderInformation(PlaceOrderData.testData);

        Logger.stepNumber(12);
        Logger.verification('Hacer click en el botón "Purchase"');
        PlaceOrderMethods.clickOnPurchaseButton();

        Logger.stepNumber(13);
        Logger.verification('Verificar que se muestra un mensaje de confirmación y que se redirige a la página de inicio');
        ThankYouForYourPurchaseMethods.verifyGreenCheckMarkIsDisplayed();
        ThankYouForYourPurchaseMethods.clickOnOkButton();
        CommonPageMethods.navigateToDemoBlaze();
        HomeMethods.verifyHomePageIsShown();
    });
});