// const products = [
//     { id: 1, title: 'Мужская куртка', price: 5500 ,img:'img/product_img1.jpg',description:'Known for her sculptural takes on traditional tailoring, Australian arbiter of cool Kym Ellery teams up with Moda Operandi.'},
//     { id: 2, title: 'Женский костюм', price: 3700,img:'img/product_img2.jpg',description:'Не следует, однако, забывать о том, что курс на социально-ориентированный...' },
//     { id: 3, title: 'Мужские шорты', price: 1500,img:'img/product_img3.jpg',description:'Не следует, однако, забывать о том, что курс на социально-ориентированный...'  },
//     { id: 4, title: 'Мужская куртка', price: 5500 ,img:'img/product_img1.jpg',description:'Known for her sculptural takes on traditional tailoring, Australian arbiter of cool Kym Ellery teams up with Moda Operandi.'},
//     { id: 5, title: 'Женский костюм', price: 3700,img:'img/product_img2.jpg',description:'Не следует, однако, забывать о том, что курс на социально-ориентированный...' },
//     { id: 6, title: 'Мужские шорты', price: 1500,img:'img/product_img3.jpg',description:'Не следует, однако, забывать о том, что курс на социально-ориентированный...'  },
    
// ];

// const renderProduct = (item) =>
//     `<article class="product">
//                 <div class="product_img">
//                     <img src="${item.img}" alt="product-1">
//                 </div>
//                 <div class="product__overlay">
//                     <!-- <button class="btn">Add to cart</button> -->
//                     <a href="#" class="product__btn">
                       
//                         <p class="text product__btn_text">Добавить в корзину</p>
//                     </a>
    
//                 </div>
//                 <div class="product__info">
//                     <a href="product.html" class="product__link">
//                         <h3 class="heading_h3">${item.title}</h3>
//                     </a>
//                     <p class="text product__text">${item.description}</p>
//                     <p class="product__text_pink padding_sale">${item.price}</p>
//                 </div>
//     </article>`;

// const renderProducts = list => {
//     document.querySelector('.products').insertAdjacentHTML('beforeend', list.map(item => renderProduct(item)).join(''));
// };

// renderProducts(products);