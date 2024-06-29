import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentViewDialogComponent } from './document-view-dialog.component';

describe('DocumentViewDialogComponent', () => {
  let component: DocumentViewDialogComponent;
  let fixture: ComponentFixture<DocumentViewDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DocumentViewDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DocumentViewDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
