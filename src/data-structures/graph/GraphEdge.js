export default class GraphEdge {
  constructor(startVertex, endVertex, weight = 0) {
    this.startVertex = startVertex
    this.endVertex = endVertex
    this.weight = weight
  }
  getKey() {
    const startVertex = this.startVertex.getKey()
    const endVertex = this.endVertex.getKey()
    return `${startVertex}_${endVertex}`
  }
  reverse() {
    ;[this.startVertex, this.endVertex] = [this.endVertex, this.startVertex]
    return this
  }
  toString() {
    return this.getKey()
  }
}
