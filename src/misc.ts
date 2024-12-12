export function toClass(classes: { [key: string]: boolean }): string {
    return Object.entries(classes)
        .filter(([_, include]) => include)
        .map(([key, _]) => key)
        .join(" ");
}

export function toStyle(style: { [key: string]: number | string | undefined }): string {
    return Object.entries(style)
        .map(([key, value]) => {
            if (value !== undefined) {
                return `${key}: ${value};`;
            }

            return "";
        })
        .filter(x => !!x)
        .join(" ");
}
