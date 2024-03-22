import { TestBed } from '@angular/core/testing';
import { PoetryService } from './poetry.service';
import { HttpClientTestingModule, HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { Poem } from './poetry';

describe('PoetryService', () => {
  let service: PoetryService;
  let httpTestingController: HttpTestingController;

  const mockData: Poem[] = [
    { title: 'mock1', author: 'nobody', linecount: 0, lines: [] },
    { title: 'mock2', author: 'nobody', linecount: 0, lines: [] },
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ],
      providers: [ provideHttpClientTesting() ]
    });

    service = TestBed.inject(PoetryService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should retrieve all poems from poetrydb given author and title', async () => {
    service.getAllFromAuthorAndTitle('mockauthor', 'mocktitle')
    const req = httpTestingController.expectOne('https://poetrydb.org/author,title/mockauthor;mocktitle');
    expect(req.request.method).toBe('GET');
    expect(req.request.responseType).toBe('json');
    req.flush(mockData)
  });

  it('should retrieve all poems from poetrydb given only author', async () => {
    service.getAllFromAuthor('mockauthor')
    const req = httpTestingController.expectOne('https://poetrydb.org/author/mockauthor');
    expect(req.request.method).toBe('GET');
    expect(req.request.responseType).toBe('json');
  });

  it('should retrieve all poems from poetrydb given only title', async () => {
    service.getAllFromTitle('mocktitle')
    const req = httpTestingController.expectOne('https://poetrydb.org/title/mocktitle');
    expect(req.request.method).toBe('GET');
    expect(req.request.responseType).toBe('json');
  });
});
