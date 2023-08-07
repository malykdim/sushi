import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuItemsListComponent } from './menu-items-list.component';

describe('ItemsListComponent', () => {
  let component: MenuItemsListComponent;
  let fixture: ComponentFixture<MenuItemsListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MenuItemsListComponent]
    });
    fixture = TestBed.createComponent(MenuItemsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
