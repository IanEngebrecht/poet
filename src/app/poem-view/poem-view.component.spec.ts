import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PoemViewComponent } from './poem-view.component';

describe('PoemViewComponent', () => {
  let component: PoemViewComponent;
  let fixture: ComponentFixture<PoemViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: []
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PoemViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should allow the user to close the poem', () => {
    component.poem = { title: 'mocktitle', author: 'mockauthor', 'linecount': 0, lines: [] };
    component.closePoem();
    expect(component.poem).toBeFalsy();
  })
});
