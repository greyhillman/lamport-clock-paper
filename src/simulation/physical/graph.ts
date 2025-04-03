type Vertex = number;

type Edge = readonly [number, number];

interface Graph {
    vertices: Vertex[];
    neighbours: { [key: Vertex]: Vertex[] };
}

function randomSelectFrom<T>(items: T[]): T {
    const index = Math.round(Math.random() * (items.length - 1));

    return items[index];
}

export function isReachable(graph: Graph, start: Vertex, end: Vertex): boolean {
    // BFS from https://hackernoon.com/a-beginners-guide-to-bfs-and-dfs-in-javascript

    const queue: Vertex[] = [start];
    const visited: Set<Vertex> = new Set<Vertex>();

    while (queue.length) {
        const vertex = queue.shift()!;

        if (!visited.has(vertex)) {
            visited.add(vertex);

            if (vertex in graph.neighbours) {
                for (const neighbour of graph.neighbours[vertex]) {
                    queue.push(neighbour);
                }
            }
        }
    }

    return visited.has(end);
}

export function random(numVertices: number): Graph {
    const vertices = [...Array(numVertices).keys()];

    const graph: Graph = {
        vertices: vertices,
        neighbours: {},
    };

    let components: Vertex[][] = graph.vertices.map(vertex => [vertex]);

    while (components.length > 1) {
        const startVertices = randomSelectFrom(components);
        const endVertices = randomSelectFrom(components);

        if (startVertices === endVertices) {
            console.log("Connecting component to itself; skipping");

            continue;
        }

        const startVertex = randomSelectFrom(startVertices);
        const endVertex = randomSelectFrom(endVertices);

        if (startVertex in graph.neighbours) {
            const neighbours = graph.neighbours[startVertex];

            const alreadyHasNeighbour = neighbours.some(neighbour => neighbour === endVertex);
            if (!alreadyHasNeighbour) {
                graph.neighbours[startVertex].push(endVertex);
            }
        } else {
            graph.neighbours[startVertex] = [endVertex];
        }

        if (isReachable(graph, startVertex, endVertex) && isReachable(graph, endVertex, startVertex)) {
            startVertices.push(...endVertices);

            components = components.filter(group => group != endVertices);
        }
    }

    return graph;
}

export function calculateDiameter(graph: Graph): number {
    // Best choice is Floyd-Warshall's algorithm of getting all the shortest paths
    // between any pair of vertices. Then, we find the maximum value of these paths.
    // If the maximum value is infinity, then the graph is not strongly connected.

    const distances: number[][] = graph.vertices.map(start => graph.vertices.map(end => Number.MAX_VALUE));

    for (const vertex of graph.vertices) {
        distances[vertex][vertex] = 0;
    }

    for (const start in graph.neighbours) {
        for (const neighbour of graph.neighbours[start]) {
            distances[start][neighbour] = 1;
        }
    }

    for (const k of graph.vertices) {
        for (const i of graph.vertices) {
            for (const j of graph.vertices) {
                if (distances[i][j] > distances[i][k] + distances[k][j]) {
                    distances[i][j] = distances[i][k] + distances[k][j];
                }
            }
        }
    }

    const diameter = distances.reduce((diameter, distances) => {
        return distances.reduce((diameter, distance) => Math.max(diameter, distance), diameter);
    }, 0);

    if (diameter > graph.vertices.length) {
        throw new Error("Graph is not strongly connected");
    }

    return diameter;
}