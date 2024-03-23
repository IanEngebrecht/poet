import { Component, Input } from "@angular/core";
import { Poem } from "../services/poetry";
import { CommonModule } from "@angular/common";
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";
import { MatDividerModule } from "@angular/material/divider";

/**
 * Displays the content of a single poem.
 */
@Component({
  selector: "app-poem-view",
  standalone: true,
  imports: [CommonModule, MatIconModule, MatButtonModule, MatDividerModule],
  templateUrl: "./poem-view.component.html",
  styleUrl: "./poem-view.component.scss",
})
export class PoemViewComponent {
  @Input() poem: Poem | null = null;

  /**
   * Closes the poem view.
   */
  closePoem() {
    this.poem = null;
  }
}
