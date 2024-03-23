import { ComponentFixture, TestBed } from "@angular/core/testing";
import { SearchMenuComponent } from "./search-menu.component";
import { NoopAnimationsModule } from "@angular/platform-browser/animations";
import { SearchCriteria } from "./search-menu";

describe("SearchMenuComponent", () => {
  let component: SearchMenuComponent;
  let fixture: ComponentFixture<SearchMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NoopAnimationsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(SearchMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should output search criteria when user inputs only TITLE", (done) => {
    component.search$.subscribe((criteria: SearchCriteria) => {
      expect(criteria).toEqual({ title: "mocktitle", author: "" });
      done();
    });
    component.title = "mocktitle";
    component.applySearch();
  });

  it("should output search criteria when user inputs only AUTHOR", (done) => {
    component.search$.subscribe((criteria: SearchCriteria) => {
      expect(criteria).toEqual({ title: "", author: "mockauthor" });
      done();
    });
    component.author = "mockauthor";
    component.applySearch();
  });

  it("should output search criteria when user inputs BOTH TITLE AND AUTHOR", (done) => {
    component.search$.subscribe((criteria: SearchCriteria) => {
      expect(criteria).toEqual({ title: "mocktitle", author: "mockauthor" });
      done();
    });
    component.title = "mocktitle";
    component.author = "mockauthor";
    component.applySearch();
  });
});
