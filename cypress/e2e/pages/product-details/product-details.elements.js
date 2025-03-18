export class ProductDetailsElements {
    static get buttons() {
        return {
            get addToCar() {
                return cy.contains('a', 'Add to cart');
            }
        }
    }
}