import LinkedList from '../linked-list/LinkedList'

export default class GraphVertex {
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

    // Normally you would store string value like vertex name.
    // But generally it may be any object as well
    this.value = value
    this.edges = new LinkedList(edgeComparator)
  }
  addEdge(edge) {
    this.edges.append(edge)
    return this
  }
  deleteEdge(edge) {
    this.edges.delete(edge)
  }
  hasEdge(requiredEdge) {
    const edgeNode = this.edges.find({
      callback: edge => edge === requiredEdge
    })
    return !!edgeNode
  }
  findEdge(vertex) {
    const edgeFinder = edge => {
      return edge.startVertex === vertex || edge.endVertex === vertex
    }
    const edge = this.edges.find({ callback: edgeFinder })
    return edge ? edge.value : null
  }
  getEdges() {
    return this.edges.toArray().map(linkedListNode => linkedListNode.value)
  }
  deleteAllEdges() {
    this.getEdges().forEach(edge => this.deleteEdge(edge))
    return this
  }
  getNeighbors() {
    const edges = this.edges.toArray()
    const neighborsConverter = node => {
      return node.value.startVertex === this
        ? node.value.endVertex
        : node.value.startVertex
    }
    return edges.map(neighborsConverter)
  }
  hasNeighbor(vertex) {
    const vertexNode = this.edges.find({
      callback: edge => edge.startVertex === vertex || edge.endVertex === vertex
    })
    return !!vertexNode
  }
  getDegree() {
    return this.edges.toArray().length
  }
  getKey() {
    return this.value
  }
  toString(callback) {
    return callback ? callback(this.value) : `${this.value}`
  }
}
