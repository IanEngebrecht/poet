/**
 * Logical representation of a poem.
 */
export interface Poem {
  title: string;
  author: string;
  lines: Array<string>;
  linecount: number;
}

/**
 * The object returned by PoetryDB on error.
 */
export interface PoetryAPIError {
  status: number;
  reason: string;
}
