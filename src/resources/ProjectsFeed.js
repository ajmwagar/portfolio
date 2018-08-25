export default {
  feed() {
    return {
      path: '/products.json',
      resolve: (response, mappers) => mappers.pipe(response.results)
    }
  }
}
