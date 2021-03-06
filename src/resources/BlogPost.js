export default {
  post(id) {
    return {
      path: `/post/${id}.json`,
      resolve: (response, mappers) => {
        let { title, content, meta } = response.results[0]
        content = content.split('\n\n').join('')
        return mappers.merge({ title, content, ...meta })
      }
    }
  }
}
