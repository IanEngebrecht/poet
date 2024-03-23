import { Component, Output } from "@angular/core";
import { MatInputModule } from "@angular/material/input";
import { MatFormFieldModule } from "@angular/material/form-field";
import { FormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatButtonToggleModule } from "@angular/material/button-toggle";
import { Subject } from "rxjs";
import { SearchCriteria } from "./search-menu";

/**
 * Toolbar that allows the user to search by author and title.
 */
@Component({
  selector: "app-search-menu",
  standalone: true,
  imports: [
    MatInputModule,
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatButtonToggleModule,
    FormsModule,
  ],
  templateUrl: "./search-menu.component.html",
  styleUrl: "./search-menu.component.scss",
})
export class SearchMenuComponent {
  // Triggered when the user clicks the search button
  @Output() search$ = new Subject<SearchCriteria>();

  // Contains the user's search criteria
  title: string = "";
  author: string = "";

  /**
   * Perform the search using the current search string.
   */
  applySearch() {
    this.search$.next({ title: this.title, author: this.author });
  }
}
