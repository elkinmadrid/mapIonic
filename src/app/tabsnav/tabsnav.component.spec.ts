import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TabsnavComponent } from './tabsnav.component';

describe('TabsnavComponent', () => {
  let component: TabsnavComponent;
  let fixture: ComponentFixture<TabsnavComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TabsnavComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TabsnavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
