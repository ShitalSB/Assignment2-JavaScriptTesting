class ShoppingCart {
    constructor() {
        this.products = [],
            this.percentage = 0;
    }

    scan(product) {
        if (this.products.length >= 5) {
            return "Your cart is full.";
        } else {
            this.products.push(product);
        }
    }

    remove(product) {
        if (this.products.length == 0) {
            return "Your cart is empty.";
        } else {
            this.products.forEach((element, index) => {
                if (element === product) {
                    this.products.splice(index, 1);
                }
            });
        }
    }

    discount(percentage) {
        if (percentage >= 50) {
            this.percentage = 0.50;
        } else if (percentage) {
            this.percentage = percentage / 100;
        } else {
            this.percentage = 0;
        }
    }

    total() {
        this.bill = 0;
        this.products.forEach(element => {
            this.bill += element.price;
        });
        this.bill = this.bill - (this.percentage * this.bill);
        return this.bill;
    }
    items() {
        return this.products;
    }
}