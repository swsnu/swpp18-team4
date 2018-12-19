import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TagComponent } from './tag.component';
import { cp } from '@angular/core/src/render3';

describe('TagComponent', () => {
  let component: TagComponent;
  let fixture: ComponentFixture<TagComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TagComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TagComponent);
    component = fixture.componentInstance;

    component.hasCloseButton = false;
    component.isSelectable = true;
    component.justShowing = false;
    component.type = 2;
    component.body = 0;
    spyOn(component.addTag, 'emit');
    spyOn(component.removeTag, 'emit');

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    expect(component.tag_color).toEqual('#ff5050');
    expect(component.tag_string).toEqual('근로장학생');
  });


  it('test onClickSelect', () => {
    component.onClickSelect();
    expect(component.addTag.emit).toHaveBeenCalled();

  });
  it('test onClickRemove', () => {
    component.onClickRemove();
    expect(component.removeTag.emit).toHaveBeenCalled();
  });

});
