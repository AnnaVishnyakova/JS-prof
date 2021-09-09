const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

const app = new Vue({
    el: '#app',
    data: {
        userSearch: '', 
        showCart: false,
        catalogUrl: '/catalogData.json',
        cartUrl: 'getBasket.json',
        cartItems: [],//массив корзины товаров
        filtered: [], // массив отфильтрованный товаров
        imgCart: 'https://placehold.it/50x100',
        products: [], //массив каталога товаров
        imgProduct: 'https://placehold.it/200x150'
    },
    methods: {
        getJson(url){ //получение внешних данных в виде обьекта
            return fetch(url)
                .then(result => result.json())
                .catch(error => console.log(error))
        },
        addProduct(item){ //добавить товар
            this.getJson(`${API}/addToBasket.json`)
                .then(data => {
                    if(data.result === 1){
                       let find = this.cartItems.find(el => el.id_product === item.id_product);
                       if(find){
                           find.quantity++;
                       } else {
                           const prod = Object.assign({quantity: 1}, item);//создание нового объекта на основе двух, указанных в параметрах
                           this.cartItems.push(prod)
                       }
                    }
                })
        },
        remove(item){ //удалить товар
            this.getJson(`${API}/addToBasket.json`)
                .then(data => {
                    if (data.result === 1) {
                        if(item.quantity>1){
                            item.quantity--;
                        } else {
                            this.cartItems.splice(this.cartItems.indexOf(item), 1);
                        }
                    }
                })
        },
        filter(){ //метод фильтрации
            let regexp = new RegExp(this.userSearch, 'i');
            this.filtered =  this.products.filter(el => regexp.test(el.product_name));
        }
    },
    mounted(){ //заполняем только пока массивы
        this.getJson(`${API + this.cartUrl}`) //парсинг из внешних данных
            .then(data => {
                for (let item of data.contents){
                    this.cartItems.push(item); // формирование товаров корзинки на основе внешнего файла
                }
            });
        this.getJson(`${API + this.catalogUrl}`) //парсинг из внешних данных
            .then(data => {
                for (let item of data){
                    this.$data.products.push(item); //заполняем массив каталога из файла
                    this.$data.filtered.push(item); // заполняем такой же массив только для фильтрации
                }
            });
        // this.getJson(`getProducts.json`)
        //     .then(data => {
        //         for(let item of data){
        //             this.products.push(item);
        //             this.filtered.push(item);
        //         }
        //     })
    }

});


// class List {
//     constructor(url, container){
//         this.container = container;
//         this.url = url;
//         this.goods = [];
//         this.allProducts = [];
//         this.filtered = [];
//         this._init();
//     }
//     getJson(url){
//         return fetch(url ? url : `${API + this.url}`)
//             .then(result => result.json())
//             .catch(error => console.log(error))
//     }
//     calcSum(){
//         return this.allProducts.reduce((accum, item) => accum += item.price, 0);
//     }
//     handleData(data){
//         this.goods = data;
//         this.render();
//     }
//     render(){
//         const block = document.querySelector(this.container);
//         for (let product of this.goods){
//             const productObj = new list[this.constructor.name](product);
//             this.allProducts.push(productObj);
//             block.insertAdjacentHTML('beforeend', productObj.render());
//         }
//     }
//     filter(value){
//         const regexp = new RegExp(value, 'i');
//         this.filtered = this.allProducts.filter(product => regexp.test(product.product_name));
//         this.allProducts.forEach(el => {
//             const block = document.querySelector(`.product-item[data-id="${el.id_product}"]`);
//             if(!this.filtered.includes(el)){
//                 block.classList.add('invisible');
//             } else {
//                 block.classList.remove('invisible');
//             }
//         })
//     }
//     _init(){
//         return false
//     }
// }
// class Item {
//     constructor(el, img = 'https://placehold.it/200x150'){
//         this.product_name = el.product_name;
//         this.price = el.price;
//         this.img = img;
//         this.id_product = el.id_product
//     }
//
//     render(){
//         return `<div class="product-item" data-id="${this.id_product}">
//                     <img src="${this.img}" alt="Some img">
//                     <div class="desc">
//                         <h3>${this.product_name}</h3>
//                         <p>${this.price} $</p>
//                         <button class="buy-btn"
//                         data-id="${this.id_product}"
//                         data-price="${this.price}"
//                         data-name="${this.product_name}"
//                         data-img="${this.img}">
//                         Купить
// </button>
//                     </div>
//                 </div>`;
//
//     }
// }
//
//
// class ProductsList extends List {
//     constructor(cart, url = '/catalogData.json',container = '.products'){
//         super(url, container);
//         this.cart = cart;
//         this.getJson()
//             .then(data => this.handleData(data));
//     }
//     _init(){
//         document.querySelector(this.container).addEventListener('click', e => {
//             if(e.target.classList.contains('buy-btn')){
//                 this.cart.addProduct(e.target);
//             }
//         });
//         document.querySelector('.search-form').addEventListener('submit', e => {
//             e.preventDefault();
//             this.filter(document.querySelector('.search-field').value);
//         })
//     }
// }
//
// class Product extends Item{}
// class Cart extends List{
//     constructor(url = '/getBasket.json', container = '.cart-block'){
//         super(url, container);
//         this.getJson()
//             .then(data => this.handleData(data.contents));
//     }
//     addProduct(element){
//         this.getJson(`${API}/addToBasket.json`)
//             .then(data => {
//                 if(data.result === 1){
//                     let productId = +element.dataset['id'];
//                     let find = this.allProducts.find(product => product.id_product === productId);
//                     if(find){
//                         find.quantity++;
//                         this._updateCart(find);
//                     } else {
//                         let product = {
//                             id_product: productId,
//                             price: +element.dataset['price'],
//                             product_name: element.dataset['name'],
//                             quantity: 1
//                         };
//                         this.goods = [product];
//                         this.render();
//                     }
//                 } else {
//                     alert('Error')
//                 }
//             })
//     }
//     removeProduct(element){
//         this.getJson(`${API}/deleteFromBasket.json`)
//             .then(data => {
//                 if(data.result === 1){
//                     let productId = +element.dataset['id'];
//                     let find = this.allProducts.find(product => product.id_product === productId);
//                     if(find.quantity > 1){
//                         find.quantity--;
//                         this._updateCart(find);
//                     } else {
//                         this.allProducts.splice(this.allProducts.indexOf(find), 1);
//                         document.querySelector(`.cart-item[data-id="${productId}"]`).remove();
//                     }
//                 } else {
//                     alert('Error')
//                 }
//             })
//     }
//     _updateCart(product){
//         const block = document.querySelector(`.cart-item[data-id="${product.id_product}"]`);
//         block.querySelector(`.product-quantity`).textContent = `Quantity: ${product.quantity}`;
//         block.querySelector(`.product-price`).textContent = `$${product.quantity*product.price}`;
//     }
//     _init(){
//         document.querySelector(this.container).addEventListener('click', e => {
//             if(e.target.classList.contains('del-btn')){
//                 this.removeProduct(e.target);
//             }
//         });
//         document.querySelector('.btn-cart').addEventListener('click', () => {
//             document.querySelector(this.container).classList.toggle('invisible')
//         })
//     }
// }
//
// class CartItem extends Item{
//     constructor(el, img = 'https://placehold.it/50x100'){
//         super(el, img);
//         this.quantity = el.quantity;
//     }
//     render(){
//         return `<div class="cart-item" data-id="${this.id_product}">
//     <div class="product-bio">
//         <img src="${this.img}" alt="Some image">
//         <div class="product-desc">
//             <p class="product-title">${this.product_name}</p>
//             <p class="product-quantity">Quantity: ${this.quantity}</p>
//             <p class="product-single-price">$${this.price} each</p>
//         </div>
//     </div>
//     <div class="right-block">
//         <p class="product-price">${this.quantity*this.price}</p>
//         <button class="del-btn" data-id="${this.id_product}">&times;</button>
//     </div>
// </div>`
//     }
// }
//
// const list = {
//     ProductsList: Product,
//     Cart: CartItem
// };
//
//
// const cart = new Cart();
// const products = new ProductsList(cart);
// setTimeout(() => {
//     products.getJson(`getProducts.json`).then(data => products.handleData(data));
// }, 300);

// list.getProducts(() => {
//     list.render();
// });





// 'use strict';
// const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

// class GoodItem{
//     constructor(product,img ="img/product_img1.jpg"){
//         this.title = product.product_name;
//         this.price =  product.price;
//         this.img = img;
//         this.id = product.id_product;;
//     };

//     render() {
//             return `<article class="product data-id="${this.id_product}">
//                         <div class="product_img">
//                             <img src="${this.img}" alt="product-1">
//                         </div>
//                         <div class="product__overlay">
//                             <!-- <button class="btn">Add to cart</button> -->
//                             <a href="#" class="product__btn">
                            
//                                 <p class="text product__btn_text">Добавить в корзину</p>
//                             </a>
            
//                         </div>
//                         <div class="product__info">
//                             <a href="product.html" class="product__link">
//                                 <h3 class="heading_h3">${this.title}</h3>
//                             </a>
//                             <p class="text product__text">${this.id}</p>
//                             <p class="product__text_pink padding_sale">${this.price}</p>
//                         </div>
//                 </article>`;
//         }
// }


// class Goods{
//     constructor(){
//         this.goods = [];
//         this.sumGoods = 0;
//         this._getProducts()
//          .then(data => { //data - объект js
//                  this.goods = [...data];
//                  this.render()
//             });
//         this.summGoods();
//         // this.render();
//     }

//     _getProducts(){
      
//         return fetch(`${API}/catalogData.json`)
//             .then(result => result.json())
//             .catch(error => {
//                 console.log(error);
//             })
//     }
//     filter(value){
//         const regexp = new RegExp(value, 'i');
//         this.filtered = this.goods.filter(product => regexp.test(product.product_name));
//         this.goods.forEach(el => {
//             const block = document.querySelector(`.product[data-id="${el.id_product}"]`);
//             if(!this.filtered.includes(el)){
//                 block.classList.add('invisible');
//             } else {
//                 block.classList.remove('invisible');
//             }
//         })
//     }
//     _filterProducts(){
//         document.querySelectorAll('.header__search-form').addEventListener('submit',item=>{
//             item.preventDefault();//отменяет действия по умолчанию
//             this.filter(document.querySelector('.header__search-field').value)
//         })
//     }

//     summGoods() {

//        this.goods.forEach((good) => {
//             if(good.price !== undefined) {
//                 this.sumGoods+= good.price;
               
//             }
//         });
        
//     };

//     render(){
//          const block = document.querySelector('.products');

//          this.goods.forEach(item => {
//              const goodItem = new GoodItem(item);
//               block.insertAdjacentHTML("beforeend",goodItem.render());
             
//          });

//          console.log(`Сумма товаров${this.sumGoods}`);

//     };



// }



// class Basket {
//     constructor(container=".header__basket") {
//         this.container=container;
//         this.goods =[];
//         this._clickBasket();
//         this._getBasketItem()
//             .then(data => { //data - объект js
//                 this.goods = [...data.contents];
//                 this.render()
//             });
//     }


//     _getBasketItem() {
//         return fetch(`${API}/getBasket.json`)
//             .then(result => result.json())
//             .catch(error => {
//                 console.log(error);
//             })
//     }

//     render() {
//         const block = document.querySelector(this.container);
//         for (let product of this.goods) {
//             const productObj = new BasketItem();
            
//             block.insertAdjacentHTML('beforeend', productObj.render(product));
//         }

//     }

//     _clickBasket(){
//         document.getElementById('header__saleButton').addEventListener('click',()=>{
//             document.querySelector(this.container).classList.toggle('invisible');
//         })
//     }

// }
// class BasketItem {
  
//     render(product) {
//         return `<div class="header__sale-id" data-id="${product.id_product}">
//     <img src="${product.img}" alt="Sale image">
//     <div class="header__sale-content">
//         <p class="header__sale-title">
//             ${product.product_name}
//         </p>
//         <p class="header__price-item">Цена за товар:$${product.price}</p>
//         <p class="header__sale-quantity">Количество: ${product.quantity}</p>
//     </div>
//     <div class="header__price">
//         <p class="product-price">$${product.quantity * product.price}</p>
        
//     </div>
//     <div class="close">
//     <button class="header__sale-close" data-id="${product.id_product}">&times;</button></div>
// </div>`
//     }
// }

// let bask = new Basket();



// let list = new Goods();








