import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PoemTableComponent } from './poem-table.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { Poem } from '../services/poetry';

describe('PoemTableComponent', () => {
  let component: PoemTableComponent;
  let fixture: ComponentFixture<PoemTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        NoopAnimationsModule,
        PoemTableComponent
      ]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PoemTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should display title, author, and linecount in the table', () => {
    expect(component.displayedColumns).toEqual(['title', 'author', 'linecount']);
  });

  it('should configure the sorter on startup', () => {
    expect(component.dataSource.sort).toBeTruthy();
  });

  it('should configure the paginator on startup', () => {
    expect(component.dataSource.paginator).toBeTruthy();
  });

  it('should update the table with a new list of poems', () => {
    const poems: Poem[] = [
      { title: 'mock1', author: 'nobody', linecount: 0, lines: [] },
      { title: 'mock2', author: 'nobody', linecount: 0, lines: [] },
    ];
    component.update(poems);
    expect(component.dataSource.data).toEqual(poems);
  });

  it('should output an event if the user clicks on a poem', (done) => {
    const mockPoem: Poem = { title: 'mock1', author: 'nobody', linecount: 0, lines: [] };
    component.poemSelected.subscribe((poem: Poem) => {
      expect(poem).toEqual(mockPoem);
      done();
    });
    component.selectPoem(mockPoem);
  });
});
