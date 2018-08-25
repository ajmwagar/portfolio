export default {
  post(id) {
    return {
      path: `/projects/${id}.json`,
      resolve: (response, mappers) => {
        let { title, content, meta } = response.results[0]
        content = content.split('\n\n').join('</p><p>')
        return mappers.merge({ title, content, ...meta })
      }
    }
  }
}
