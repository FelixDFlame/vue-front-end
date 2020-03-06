const _products = [
    { "id": 1, "title": "bon bon", "price": 500, "inventory": 10 },
    { "id": 2, "title": "permen", "price": 1000, "inventory": 5 },
    { "id": 3, "title": "candy", "price": 1500, "inventory": 3 },
]

export default {
    //supaya request butuh waktu 2 detik utk response
    getProducts(cb: any) {
        setTimeout(() => cb(_products), 2000);
    },
    buyProducts(products: any, cb: any, errorCb: any) {
        setTimeout(() => {
            var success = Math.random()>=0.5
            success ? cb() : errorCb()
        }, 100)
    }
}