export type Graph<T> = Edge<T>[];

export type Edge<T> = {
    start: T;
    end: T;
}

export type Path<T> = T[];

export function edge<T>(start: T, end: T): Edge<T> {
    return {
        start,
        end,
    };
}

export function getPaths<T>(graph: Graph<T>, start: T, end: T, isEqual: (left: T, right: T) => boolean): Path<T>[] {
    const result: T[][] = [];

    const paths: T[][] = [];

    paths.push([end]);

    // HACK: There shouldn't be too many nodes anyways so compute all paths
    for (let visisted = 1; visisted <= 100; visisted++) {
        const path = paths.pop();
        if (path === undefined) {
            break;
        }

        if (isEqual(path[0], start)) {
            result.push(path);
            continue;
        }

        const parents = graph
            .filter(edge => isEqual(edge.end, path[0]))
            .map(edge => edge.start);

        for (const parent of parents) {
            paths.push([parent, ...path]);
        }
    }

    return result;
}
