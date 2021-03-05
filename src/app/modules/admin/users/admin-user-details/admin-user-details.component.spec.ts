import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminUserDetailsComponent } from './admin-animal-details.component';

describe('AdminAnimalDetailsComponent', () => {
  let component: AdminUserDetailsComponent;
  let fixture: ComponentFixture<AdminUserDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminUserDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminUserDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
