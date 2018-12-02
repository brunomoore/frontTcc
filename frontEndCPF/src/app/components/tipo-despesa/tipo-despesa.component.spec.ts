import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TipoDespesaComponent } from './tipo-despesa.component';

describe('TipoDespesaComponent', () => {
  let component: TipoDespesaComponent;
  let fixture: ComponentFixture<TipoDespesaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TipoDespesaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TipoDespesaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
