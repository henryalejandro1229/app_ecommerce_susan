import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalTiposComponent } from './modal-tipos.component';

describe('ModalTiposComponent', () => {
  let component: ModalTiposComponent;
  let fixture: ComponentFixture<ModalTiposComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalTiposComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalTiposComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
