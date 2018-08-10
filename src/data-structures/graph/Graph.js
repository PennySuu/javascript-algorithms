export default class Graph {
  constructor(isDirected = false) {
    this.vertices = {}
    this.edges = {}
    this.isDirected = isDirected
  }
  addVertex(newVertex) {
    this.vertices[newVertex.getKey()] = newVertex
  }
  getVertexByKey(vertexKey) {
    return this.vertices[vertexKey]
  }
  getAllVertices() {
    return Object.values(this.vertices)
  }
  findVertexByKey(vertexKey) {
    if (this.vertices[vertexKey]) {
      return this.vertices[vertexKey]
    }
    return null
  }
  addEdge(edge) {
    let startVertex = this.getVertexByKey(edge.startVertex.getKey())
    let endVertex = this.getVertexByKey(edge.endVertex.getKey())
    if (!startVertex) {
      this.addVertex(startVertex)
      startVertex = this.getVertexByKey(edge.startVertex.getKey())
    }

    if (!endVertex) {
      this.addVertex(endVertex)
      endVertex = this.getVertexByKey(edge.endVertex.getKey())
    }

    if (this.edges[edge.getKey()]) {
      throw new Error('Edge has already been added before')
    } else {
      this.edges[edge.getKey()] = edge
    }

    if (this.isDirected) {
      startVertex.addEdge(edge)
    } else {
      startVertex.addEdge(edge)
      endVertex.addEdge(edge)
    }
  }
  deleteEdge(edge) {
    if (this.edges[edge.getKey()]) {
      delete this.edges[edge.getKey()]
    } else {
      throw new Error('Edge not found in graph')
    }
    const startVertex = this.getVertexByKey(edge.startVertex.getKey())
    const endVertex = this.getVertexByKey(edge.endVertex.getKey())
    startVertex.deleteEdge(edge)
    endVertex.deleteEdge(edge)
  }
  findEdge(startVertex, endVertex) {
    const vertex = this.getVertexByKey(startVertex.getKey())
    if (!vertex) {
      return null
    }
    return vertex.findEdge(endVertex)
  }
  getAllEdges() {
    return Object.values(this.edges)
  }
  getWeight() {
    return this.getAllEdges().reduce((weight, graphEdge) => {
      return weight + graphEdge.weight
    }, 0)
  }
  reverse() {
    this.getAllEdges().forEach(edge => {
      this.deleteEdge(edge)
      edge.reverse()
      this.addEdge(edge)
    })
  }
  getNeighbors(vertex){
    return vertex.getNeighbors()
  }
  getVerticesIndices() {
    const verticesIndices = {}
    this.getAllVertices().forEach((vertex, index) => {
      verticesIndices[vertex.getKey()] = index
    })
    return verticesIndices
  }
  getAdjacencyMatrix() {
    const vertices = this.getAllVertices()
    const verticesIndices = this.getVerticesIndices()

    const initalValue = this.isDirected ? Infinity : 0
    const adjacencyMatrix = Array(vertices.length)
      .fill(null)
      .map(() => {
        return Array(vertices.length).fill(initalValue)
      })

    vertices.forEach((vertex, vertexIndex) => {
      vertex.getNeighbors().forEach(neighbor => {
        const neighborIndex = verticesIndices[neighbor.getKey()]
        adjacencyMatrix[vertexIndex][neighborIndex] = this.isDirected
          ? this.findEdge(vertex, neighbor).weight
          : 1
      })
    })

    return adjacencyMatrix
  }
  toString() {
    return Object.keys(this.vertices).toString()
  }
}
