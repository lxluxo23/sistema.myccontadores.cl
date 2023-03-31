import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainDocumentosComponent } from './main-documentos.component';

describe('MainDocumentosComponent', () => {
  let component: MainDocumentosComponent;
  let fixture: ComponentFixture<MainDocumentosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MainDocumentosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MainDocumentosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
