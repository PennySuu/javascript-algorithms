import GraphVertex from './GraphVertex'

export default class GraphEdge {
  /**
   * 图的边
   * @param {GraphVertex} startVertex
   * @param {GraphVertex} endVertex
   * @param {number} weight
   */
  constructor(startVertex, endVertex, weight = 0) {
    // 边的始点
    this.startVertex = startVertex
    // 边的终点
    this.endVertex = endVertex
    // 边的权重
    this.weight = weight
  }
  /**
   * 获得边的顶点
   * @returns {srting}
   */
  getKey() {
    const startVertex = this.startVertex.getKey()
    const endVertex = this.endVertex.getKey()
    return `${startVertex}_${endVertex}`
  }
  /**
   * 反转边的始点与终点
   * @returns {GraphEdge}
   */
  reverse() {
    ;[this.startVertex, this.endVertex] = [this.endVertex, this.startVertex]
    return this
  }
  /**
   * @returns {string}
   */
  toString() {
    return this.getKey()
  }
}
