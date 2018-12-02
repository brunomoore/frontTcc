import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TipoReceitaComponent } from './tipo-receita.component';

describe('TipoReceitaComponent', () => {
  let component: TipoReceitaComponent;
  let fixture: ComponentFixture<TipoReceitaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TipoReceitaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TipoReceitaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
