import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { PoetryService } from './services/poetry.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Poem } from './services/poetry';
import Swal from 'sweetalert2';

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
        'Lets have a beer',
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
      getAll: jasmine.createSpy('getAll').and.returnValue(Promise.resolve(mockData))
    }
    TestBed.overrideProvider(PoetryService, { useValue: mockPoetryService })

    fixture = TestBed.createComponent(AppComponent);
    app = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should update the poem table with the data from poetry service', async () => {
    spyOn(app.table, 'update');
    await app.search({ title: 'mocktitle', author: 'mockauthor' });
    expect(app.table.update).toHaveBeenCalledOnceWith(mockData)
  });

  it('should pop up an error if the poetry call was unsuccessful', async () => {
    mockPoetryService.getAll = jasmine.createSpy('getAll').and.returnValue(Promise.reject('mock error'));
    spyOn(Swal, 'fire');
    await app.search({ title: 'mocktitle', author: 'mockauthor' });
    expect(Swal.fire).toHaveBeenCalledOnceWith({
      title: 'Error!',
      text: 'mock error',
      icon: 'error',
    } as any);
  });

  it('should not update the poem table if the poetry call was unsuccessful', async () => {
    mockPoetryService.getAll = jasmine.createSpy('getAll').and.returnValue(Promise.reject('mock error'));
    spyOn(app.table, 'update');
    await app.search({ title: 'mocktitle', author: 'mockauthor' });
    expect(app.table.update).not.toHaveBeenCalled();
  });
});
