Vue.component('search', {
    data() {
        return {
            userSearch: ''
        }
    },
  
    template: `<form action="#" class="header__search-form" @submit.prevent='$parent.filter(userSearch)'>
                    <input type="text" class="header__search-field" v-model="userSearch">
                    <button class="btn-search" type="submit">
                        <i class="fas fa-search"></i>
                    </button>
                </form>`
})