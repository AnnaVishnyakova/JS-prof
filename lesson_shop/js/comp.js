Vue.component('comp',{
    data(){
        return{
            name:'ВОзраст',
            age:25
        }
    },
    template:`<div><h1> Hi {{name}},age {{age}}</h1>
    <slot></slot>
    </div > `
})

// Vue.component('inner-comp', {
//     data() {
//         return {
//             counter: 0,
           
//         }
//     }, 
//     template: `<div>
//         <button @click='increase'>Push</button>
//     {{counter}}</div>`,
//     methods:{
//         increase(){
//             this.counter++
//         }
//     }
// })

