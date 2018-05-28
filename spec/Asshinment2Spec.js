describe('ShoppingCart', () => {
    var shoppingCart;
    beforeEach(() => {
        shoppingCart = new ShoppingCart();
        cookies = {itemId: 30,price: 44.00};
        bag = {itemId: 20,price: 55.80};
        iphone = {itemId: 222,price: 15.10};
        hamburger = {itemId: 90,price: 215.80};
        sandwich = {itemId: 30,price: 12.30};
    });

    it('should add product to the shoppingCart', () => {
        shoppingCart.scan(cookies);
        expect(shoppingCart.items()).toEqual([cookies]);
        shoppingCart.scan(bag);
        shoppingCart.scan(iphone);
        shoppingCart.scan(hamburger);
        shoppingCart.scan(sandwich);
        expect(shoppingCart.items()).toEqual([cookies, bag, iphone, hamburger, sandwich]);
    });

    it('should return "your cart is full." while adding more then 5 products', () => {
        shoppingCart.scan(cookies);
        shoppingCart.scan(bag);
        shoppingCart.scan(iphone);
        shoppingCart.scan(hamburger);
        shoppingCart.scan(sandwich);
        expect(shoppingCart.scan(cookies)).toBe('Your cart is full.');
        expect(shoppingCart.items()).toEqual([cookies, bag, iphone, hamburger, sandwich]);
    });

    it('should remove a specific product from the shoppingCart', () => {
        shoppingCart.scan(bag);
        shoppingCart.scan(cookies);
        shoppingCart.remove(cookies);
        expect(shoppingCart.items()).toEqual([bag]);
        shoppingCart.remove(bag);
        expect(shoppingCart.items()).toEqual([]);
    });

    it('should return the "Your cart is empty" when there is no products in cart', () => {
        expect(shoppingCart.remove(cookies)).toBe('Your cart is empty.');
        shoppingCart.scan(bag);
        shoppingCart.scan(hamburger);
        shoppingCart.remove(bag);
        shoppingCart.remove(hamburger);
        expect(shoppingCart.remove(bag)).toBe('Your cart is empty.');
    });

    it('should return the total of all products in the shoppingCart', () => {
        expect(shoppingCart.total()).toBe(0);
        shoppingCart.scan(cookies);
        expect(shoppingCart.total()).toBe(44.00);
        shoppingCart.scan(bag);
        shoppingCart.scan(hamburger);
        expect(shoppingCart.total()).toBe(315.60);
    });

    it('should discount all products in the shoppingCart according to the given discount', () => {
        shoppingCart.discount(20);
        shoppingCart.scan(cookies);
        expect(shoppingCart.total()).toBe(35.2);
        shoppingCart.scan(iphone);
        shoppingCart.discount(50);
        expect(shoppingCart.total()).toBe(29.55);
    });

    it('should give 0% discount when no percentage given in discount function', () => {
        shoppingCart.discount();
        shoppingCart.scan(cookies);
        expect(shoppingCart.total()).toBe(44);
        shoppingCart.scan(iphone);
        shoppingCart.discount();
        expect(shoppingCart.total()).toBe(59.10);
    });

    it('should not discount products more than 50%', () => {
        shoppingCart.scan(iphone);
        shoppingCart.discount(58);
        expect(shoppingCart.total()).toBe(7.55);
        shoppingCart.discount(99);
        expect(shoppingCart.total()).toBe(7.55);
    });

    it('should return current products from the shoppingCart', () => {
        shoppingCart.scan(iphone);
        expect(shoppingCart.items()).toEqual([iphone]);
        shoppingCart.scan(bag);
        shoppingCart.scan(hamburger);
        shoppingCart.scan(sandwich);
        shoppingCart.scan(cookies);
        expect(shoppingCart.items()).toEqual([iphone, bag, hamburger, sandwich, cookies]);
    });
});