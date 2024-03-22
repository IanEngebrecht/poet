import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { PoetryService } from './services/poetry.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Poem } from './services/poetry';
import Swal from 'sweetalert2';
import { SearchCriteria } from './search-menu/search-menu';

describe('AppComponent', () => {
  let mockPoetryService: any;
  let fixture: ComponentFixture<AppComponent>;
  let app: AppComponent;

  const mockData: Poem[] = [
    {
      title: 'poem 1',
      author: 'myself',
      linecount: 4,
      lines: [
        'I am not a poet',
        'That much is clear',
        'I know that you know it',
        'So lets have a beer',
      ]
    },
    {
      title: 'poem 2',
      author: 'myself',
      linecount: 4,
      lines: [
        'Another poem is asked of me',
        'Suppose I should give it a try',
        'But rhyming is so hard, you see',
        'So I give up...I am going back to development...',
      ]
    }
  ]

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        AppComponent,
        BrowserAnimationsModule,
      ],
    }).compileComponents();
    
    // Override PoetryService with a mock version
    mockPoetryService = {
      BASE_URL: 'mymockurl/',
      getAllFromAuthorAndTitle: jasmine.createSpy('getAllFromAuthorAndTitle').and.returnValue(Promise.resolve(mockData)),
      getAllFromTitle: jasmine.createSpy('getAllFromTitle').and.returnValue(Promise.resolve(mockData)),
      getAllFromAuthor: jasmine.createSpy('getAllFromAuthor').and.returnValue(Promise.resolve(mockData)),
    }
    TestBed.overrideProvider(PoetryService, { useValue: mockPoetryService })

    fixture = TestBed.createComponent(AppComponent);
    app = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('Poem Search', () => {
    const searchAT: SearchCriteria = { title: 'mocktitle', author: 'mockauthor' };
    const searchA: SearchCriteria = { title: '', author: 'mockauthor' };
    const searchT: SearchCriteria = { title: 'mocktitle', author: '' };

    it('should update the poem table with the data from poetry service', async () => {
      spyOn(app.table, 'update');
      await app.search(searchAT);
      expect(app.table.update).toHaveBeenCalledOnceWith(mockData)
    });
  
    it('should pop up an error if the poetry call was unsuccessful', async () => {
      mockPoetryService.getAllFromAuthorAndTitle = jasmine.createSpy('getAll').and.returnValue(Promise.reject('mock error'));
      spyOn(Swal, 'fire');
      await app.search(searchAT);
      expect(Swal.fire).toHaveBeenCalledOnceWith({
        title: 'Error!',
        text: 'mock error',
        icon: 'error',
      } as any);
    });
  
    it('should NOT update the poem table if the poetry call was unsuccessful', async () => {
      mockPoetryService.getAllFromAuthorAndTitle = jasmine.createSpy('getAll').and.returnValue(Promise.reject('mock error'));
      spyOn(app.table, 'update');
      await app.search(searchAT);
      expect(app.table.update).not.toHaveBeenCalled();
    });

    it('should allow a poem search with only title', async () => {
      await app.search(searchT);
      expect(mockPoetryService.getAllFromTitle).toHaveBeenCalledOnceWith(searchT.title);
    });

    it('should allow a poem search with only author', async () => {
      await app.search(searchA);
      expect(mockPoetryService.getAllFromAuthor).toHaveBeenCalledOnceWith(searchA.author);
    });

    it('should allow a poem search with both title and author', async () => {
      await app.search(searchAT);
      expect(mockPoetryService.getAllFromAuthorAndTitle).toHaveBeenCalledOnceWith(searchAT.author, searchAT.title);
    });
  });

  describe('Poem View', () => {
    it('should give selected poem from PoemTableComponent to PoemViewComponent', () => {
      const mockPoem: Poem = { title: 'mocktitle', author: 'mockauthor', linecount: 0, lines: [] };
      app.table.poemSelected.next(mockPoem);
      expect(app.poemView.poem).toEqual(mockPoem)
    });
  });
});
