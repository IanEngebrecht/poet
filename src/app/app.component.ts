import { ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PoemTableComponent } from './poem-table/poem-table.component';
import { HttpClientModule } from '@angular/common/http';
import { PoetryService } from './services/poetry.service';
import { SearchMenuComponent } from './search-menu/search-menu.component';
import { SearchCriteria } from './search-menu/search-menu';
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import Swal from 'sweetalert2'
import { Poem } from './services/poetry';

/**
 * Registers application-wide modules and handles wiring between the major components.
 */
@Component({
  selector: 'app-root',
  standalone: true,
  providers: [
    PoetryService,
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    RouterOutlet,
    PoemTableComponent,
    SearchMenuComponent,
    MatProgressSpinnerModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  @ViewChild(PoemTableComponent) table!: PoemTableComponent;

  // TODO: What is this?
  title = 'poet';

  // If true, displays a spinner instead of the poem table
  pending = false;

  /**
   * 
   * @param {PoetryService} _poetryService Responsible for interactions with PoetryDB.
   * @param {ChangeDetectorRef} _cd Reference to Angular's built-in change detector.
   */
  constructor(
    private readonly _poetryService: PoetryService,
    private readonly _cd: ChangeDetectorRef,
  ) {}

  /**
   * Performs a poem search and updates the table with the results.
   * @param {SearchCriteria} criteria The user's search criteria.
   */
  async search(criteria: SearchCriteria) {
    this.pending = true;
    const poems = await this._runSearch(criteria)
      .catch((error: string) => {
        Swal.fire({
          title: 'Error!',
          text: error,
          icon: 'error',
        })
      })
      .finally(() => {
        this.pending = false;
        this._cd.detectChanges();
      });

    if (poems) {
      this.table.update(poems);
      this._cd.detectChanges();
    }
  }

  /**
   * Runs the poem search.
   * Acts as a translator between the SearchCriteria interface used in the search menu 
   * and the author/title interface used by PoetryService.
   * @param {SearchCriteria} criteria The search criteria provided by the user.
   * @return {Promise<Poem[]>} List of poems matching the search criteria.
   */
  private _runSearch(criteria: SearchCriteria): Promise<Poem[]> {
    if (criteria.title && criteria.author) {
      return this._poetryService.getAllFromAuthorAndTitle(criteria.author, criteria.title);
    }
    if (criteria.title) {
      return this._poetryService.getAllFromTitle(criteria.title);
    }
    return this._poetryService.getAllFromAuthor(criteria.author);
  }
}
