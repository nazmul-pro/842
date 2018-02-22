import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WarmupComponent } from './warmup.component';

describe('WarmupComponent', () => {
  let component: WarmupComponent;
  let fixture: ComponentFixture<WarmupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WarmupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WarmupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
