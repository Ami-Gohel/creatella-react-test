const url = 'http://localhost:3000/'


module.exports = {
    async getproductList(params) {
        console.log(params)
        return fetch(`${url}api/products?_page=${params._page}&_limit=${params._limit}&_sort=${params._sort}`)
            .then((response) => response.json())
    }
}