import LinkedList from '../linked-list/LinkedList'

export default class GraphVertex {
  /**
   * 图的顶点
   * @param {*} value
   */
  constructor(value) {
    if (value === undefined) {
      throw new Error('Graph vertex must have a value')
    }

    /**
     * @param {GraphEdge} edgeA
     * @param {GraphEdge} edgeB
     */
    const edgeComparator = (edgeA, edgeB) => {
      if (edgeA.getKey() === edgeB.getKey()) {
        return 0
      }

      return edgeA.getKey() < edgeB.getKey() ? -1 : 1
    }
    // 顶点的值
    this.value = value
    // 邻接表，保存边节点
    this.edges = new LinkedList(edgeComparator)
  }
  /**
   * 保存边节点
   * @param {GraphEdge} edge
   */
  addEdge(edge) {
    this.edges.append(edge)
    return this
  }
  /**
   * 删除边节点
   * @param {GraphEdge} edge
   */
  deleteEdge(edge) {
    this.edges.delete(edge)
  }
  /**
   * 是否为某条边的顶点
   * @param {GraphEdge} requiredEdge
   * @returns {boolean}
   */
  hasEdge(requiredEdge) {
    const edgeNode = this.edges.find({
      callback: edge => edge === requiredEdge
    })
    return !!edgeNode
  }
  /**
   * 找到与某个顶点的边
   * @param {GraphVertex} vertex
   * @returns {GraphEdge|null}
   */
  findEdge(vertex) {
    const edgeFinder = edge => {
      return edge.startVertex === vertex || edge.endVertex === vertex
    }
    const edge = this.edges.find({
      callback: edgeFinder
    })
    return edge ? edge.value : null
  }
  /**
   * 获取顶点所有的边
   * @returns{GraphEdge[]}
   */
  getEdges() {
    return this.edges.toArray().map(linkedListNode => linkedListNode.value)
  }
  /**
   * 删除顶点所有的边
   * @returns {GraphVertex}
   */
  deleteAllEdges() {
    this.getEdges().forEach(edge => this.deleteEdge(edge))
    return this
  }
  /**
   * 获取所有与顶点相连的点
   * @returns {GraphVertex[]}
   */
  getNeighbors() {
    const edges = this.edges.toArray()
    const neighborsConverter = node => {
      return node.value.startVertex === this
        ? node.value.endVertex
        : node.value.startVertex
    }
    return edges.map(neighborsConverter)
  }
  /**
   * 是否与某个顶点相连
   * @param {GraphVertex} vertex
   * @returns {boolean}
   */
  hasNeighbor(vertex) {
    const vertexNode = this.edges.find({
      callback: edge => edge.startVertex === vertex || edge.endVertex === vertex
    })
    return !!vertexNode
  }
  /**
   * 获取顶点的度（有向图的入度）
   * @returns {number}
   */
  getDegree() {
    return this.edges.toArray().length
  }
  /**
   * 获取顶点的值
   */
  getKey() {
    return this.value
  }
  /**
   * @param {functtion} callback
   * @returns {string}
   */
  toString(callback) {
    return callback ? callback(this.value) : `${this.value}`
  }
}
