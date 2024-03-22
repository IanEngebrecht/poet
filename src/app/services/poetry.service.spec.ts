import { TestBed } from '@angular/core/testing';
import { PoetryService } from './poetry.service';
import { HttpClientTestingModule, HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
// import { HttpClient } from '@angular/common/http';

fdescribe('PoetryService', () => {
  let service: PoetryService;
  // let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ],
      providers: [provideHttpClientTesting()]
    });

    // mockHttp = {
    //   get: jasmine.createSpy('get').and.returnValue({
    //     subscribe: () => Promise.resolve([])
    //   })
    // }
    // TestBed.overrideProvider(HttpClient, { useValue: mockHttp });

    service = TestBed.inject(PoetryService);
    // httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should retrieve all poems from poetrydb given author and title', async () => {
    console.log(await service.getAllFromAuthorAndTitle('author', 'title'));
    httpTestingController.expectOne('http://poetrydb');
  });
});
