Vue.component('products', {
    props:['products','img'],
    template:`<div class="product">
                <product v-for= "item of products"
                
                :img="img"
                :product="item">
                </product>
            </div>`
})

Vue.component('product',{
    props:['product','img'],
    template: `<div class="product__info">
                <img :src="img" alt="some img">
                <div class = "product__info" >
                   <a href = "product.html" class = "product__link" >
                    <h3 class="heading_h3">{{product.product_name}}</h3>
                   </a>
                   <p class="text product__text">{{product.price}} $</p>
                   <button class="buy-btn" @click="$root.addProduct(product)">Купить</button>
                </div>
              </div>`
})
