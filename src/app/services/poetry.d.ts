export interface Poem {
    title: string;
    author: string;
    lines: Array<string>;
    linecount: number;
}

export interface PoetryAPIError {
    status: number;
    reason: string;
}
