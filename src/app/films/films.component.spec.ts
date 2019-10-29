import { CarouselComponent } from './../carousel/carousel.component';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NgbCarousel } from '@ng-bootstrap/ng-bootstrap';
import { FilmsComponent } from './films.component';
import { RouterTestingModule } from '@angular/router/testing';
import { StoreModule, Store } from '@ngrx/store';
import * as fromRoot from '../shared/store/metaReducer';

describe('FilmsComponent', () => {
  let component: FilmsComponent;
  let fixture: ComponentFixture<FilmsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FilmsComponent, CarouselComponent, NgbCarousel ],
      imports: [
        RouterTestingModule.withRoutes([
          {
              path:'',
              component: FilmsComponent
          }
        ]),
        StoreModule.forRoot({
          ...fromRoot.reducers
        })
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FilmsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
