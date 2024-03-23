import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Poem, PoetryAPIError } from "./poetry";

/**
 * Service managing the interactions with PoetryDB.
 */
@Injectable({
  providedIn: "root",
})
export class PoetryService {
  BASE_URL = "https://poetrydb.org/";

  /**
   * Did you know?
   *
   * In California, it is a misdemeanor to shoot at any kind of game from a moving vehicle...
   *
   * ...unless the target is a whale.
   *
   * @param {HttpClient} _http Service managing the raw HTTP calls.
   */
  constructor(private readonly _http: HttpClient) {}

  /**
   * Retrieves poems matching a given title and author.
   * @param {string} title The title of the poem to search for.
   * @param {string} author The author of the poem to search for.
   * @return {Promise<Poem[]>} List of poems matching both the given title and author.
   */
  async getAllFromAuthorAndTitle(
    author: string,
    title: string,
  ): Promise<Poem[]> {
    // TODO: String interpolation can be insecure if this comes directly from user input. Sanitize first!
    return this._poetryRequest(
      `${this.BASE_URL}author,title/${author};${title}`,
    );
  }

  /**
   * Retrieves poems writen by a given author.
   * @param {string} author The author of the poem to search for.
   * @return {Promise<Poem[]>} List of poems with an author matching the criteria.
   */
  async getAllFromAuthor(author: string): Promise<Poem[]> {
    // TODO: String interpolation can be insecure if this comes directly from user input. Sanitize first!
    return this._poetryRequest(`${this.BASE_URL}author/${author}`);
  }

  /**
   * Retrieves poems matching a given title.
   * @param {string} title The title of the poem to search for.
   * @return {Promise<Poem[]>} List of poems matching the given title.
   */
  async getAllFromTitle(title: string): Promise<Poem[]> {
    // TODO: String interpolation can be insecure if this comes directly from user input. Sanitize first!
    return this._poetryRequest(`${this.BASE_URL}title/${title}`);
  }

  /**
   * Performs the HTTP call to PoetryDB.
   * @param {string} url The URL string with embedded parameters.
   * @return {Promise<Poem[]>} The list of poems.
   */
  private async _poetryRequest(url: string): Promise<Poem[]> {
    return new Promise((resolve, reject) => {
      this._http
        .get<Poem[]>(url, { responseType: "json" })
        .subscribe((response: Poem[] | PoetryAPIError) => {
          /* eslint-disable-next-line no-prototype-builtins */
          response.hasOwnProperty("status")
            ? reject((response as PoetryAPIError).reason) // HTTP Error Response
            : resolve(response as Poem[]); // HTTP Success
        });
    });

    // TODO: Figure out why this error handling with this method doesn't work....
    // return new Promise((resolve, reject) => {
    //   this._http.get<Poem[]>(url, {responseType: 'json'})
    //   .subscribe({
    //     next: (poems: Poem[]) => resolve(poems),
    //     error: (error: HttpErrorResponse) => reject(error.message),
    //   })
    // });
  }
}
