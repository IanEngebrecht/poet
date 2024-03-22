import { Component, ViewChild } from '@angular/core';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { Poem } from '../services/poetry';
import { MatButtonModule } from '@angular/material/button';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { CommonModule } from '@angular/common';

/**
 * Displays the list of poems in a table view.
 */
@Component({
  selector: 'app-poem-table',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatInputModule,
    MatButtonModule,
    MatSortModule,
    MatPaginatorModule,
  ],
  templateUrl: './poem-table.component.html',
  styleUrl: './poem-table.component.scss',
})
export class PoemTableComponent {
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  // The data being displayed in the table
  dataSource = new MatTableDataSource<Poem>([]);

  // Columns displayed in the table
  displayedColumns = ['title', 'author', 'linecount'];

  /**
   * Angular lifecycle hook trigered after the view has been initialized.
   */
  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  /**
   * Updates the table with a new list of poems.
   * @param {Poem[]} poems The new list of poems.
   */
  update(poems: Poem[]) {
    this.dataSource.data = poems;
  }
}

