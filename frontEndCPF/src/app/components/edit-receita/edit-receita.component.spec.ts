import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditReceitaComponent } from './edit-receita.component';

describe('EditReceitaComponent', () => {
  let component: EditReceitaComponent;
  let fixture: ComponentFixture<EditReceitaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditReceitaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditReceitaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
