import LinkedList from '../linked-list/LinkedList'

export default class GraphVertex {
  constructor(value) {
    if (value === undefined) {
      throw new Error('Graph vertex must have a value')
    }
    const edgeComparator = (edgeA, edgeB) => {
      if (edgeA.weight === edgeB.weight) {
        return 0
      }
      return edgeA.weight > edgeB.weight ? 1 : -1
    }
    this.value = value
    this.edges = new LinkedList(edgeComparator)
  }
  addEdge(edge) {
    this.edges.append(edge)
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
  }
  getNeighbors() {
    const edges = this.edges.toArray()
    const neighborsConverter = node => {
      return node.value.startVertex === this
        ? node.value.startVertex
        : node.value.endVertex
    }
    return edges.map(neighborsConverter)
  }
  hasNeighbor(vertex) {
    const vertexNode = this.edge.find({
      callback: edge => edge.startVertex === vertex || edge.endVertex === vertex
    })
    return vertexNode
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
