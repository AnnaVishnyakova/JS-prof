Vue.component('cart', {
    props: ['cartItems', 'img', 'visibility'],
    template: `
        <div class="header__basket" v-show="visibility">
          
            <cart-item class="header__sale-id" v-for="item of cartItems" :key="item.id_product" :img="img" :cart-item="item">
            </cart-item>
        </div>
    `
});

Vue.component('cart-item', {
    props: ['img', 'cartItem'],
    template: `
    <div class="cart-item">
     
                    <img :src = "img" alt="Sale image">
                        <div class = "header__sale-content">
                        <p class = "header__sale-title" > {{cartItem.product_name}}
                        </p>
                        <p class = "header__price-item" > Цена за товар: {{cartItem.price}} 
                        </p>
                        <p class = "header__sale-quantity" > Количество: {{cartItem.quantity}} 
                        </p>
                        </div> 
                        <div class = "header__price" >
                        <p class = "product-price" > {{cartItem.quantity * cartItem.price}}
                        </p>
                        </div> 
                        <div class = "close" >
                        <button class = "header__sale-close" @click = "$root.remove(cartItem)"> &times; </button> </div>
                </div>
    `
})