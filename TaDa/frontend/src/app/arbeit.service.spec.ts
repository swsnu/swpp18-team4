import { TestBed, inject } from '@angular/core/testing';

import { ArbeitService } from './arbeit.service';
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { RouterTestingModule } from "@angular/router/testing";
import { HttpClientTestingModule, HttpTestingController } from "@angular/common/http/testing";
import {ArbeitPost} from "./Classes/ArbeitPost";
import {ArbeitRegionEnum} from "./Enums/ArbeitRegionEnum";
import {ArbeitTypeEnum} from "./Enums/ArbeitTypeEnum";

describe('ArbeitService', () => {
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;
  const mock_register_date = new Date('October 17, 2018 03:24:00');
  const mock_edit_date = new Date('October 18, 2018 03:24:00');
  const mockArbeitPost = <ArbeitPost>{id: 1, author_id: 1, title: 'title', content: 'content', region: ArbeitRegionEnum['Nakdae'], arbeit_type: ArbeitTypeEnum['Mentoring'], pay: 1.0,
                           time_zone: [], manager_name: 'team4', manager_phone: '010-0000-0000',
                           register_date: mock_register_date, edit_date: mock_edit_date, star: 1 };
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientTestingModule,
      ],
    });
    httpClient = TestBed.get(HttpClient);
    httpTestingController = TestBed.get(HttpTestingController);
  });

  it('should be created', () => {
    const service: ArbeitService = TestBed.get(ArbeitService);
    expect(service).toBeTruthy();
  });

  it('test getArbeitPosts func', inject([ArbeitService], (service: ArbeitService) => {
    const testPost: ArbeitPost = mockArbeitPost;

    service.getArbeitPosts()
      .then(data => expect(data).toEqual([mockArbeitPost]));

    httpClient.get<ArbeitPost>('api/arbeit/arbeit/').toPromise()
      .then(data => expect(data).toEqual(testPost));
  }));

  it('test getArbeitPostById func', inject([ArbeitService], (service: ArbeitService) => {
    const testPost: ArbeitPost = mockArbeitPost;
    const testPosts: ArbeitPost[] = [mockArbeitPost];
    let temp_title: string = '';
    service.getArbeitPostById(1)
      .then(data => expect(data).toEqual(testPost));
    service.getArbeitPostById(1).then(data => temp_title = data.title);
  }));

  it('test createArbeitPost func', inject([ArbeitService], (service: ArbeitService) => {
    const testPost: ArbeitPost = mockArbeitPost;

    service.createArbeitPost(mockArbeitPost)
      .then(data => expect(data).toEqual(testPost));

    httpClient.post<ArbeitPost>('api/arbeit/arbeit/', testPost).toPromise()
      .then(data => expect(data).toEqual(testPost));

  }));

  it('test updateArbeitPost func', inject([ArbeitService], (service: ArbeitService) => {
    const testPost: ArbeitPost = mockArbeitPost;

    service.updateArbeitPost(testPost)
      .then(data => expect(data).toEqual(testPost));

    httpClient.put<ArbeitPost>('api/arbeit/arbeit/1/', testPost).toPromise()
      .then(data => expect(data).toEqual(testPost));

  }));

  it('test deleteArbeitPost func', inject([ArbeitService], (service: ArbeitService)  => {
    const testPost: ArbeitPost = mockArbeitPost;

    service.deleteArbeitPost(testPost)
      .then(data => expect(data).toEqual(testPost));

    httpClient.delete<ArbeitPost>('api/arbeit/arbeit/1/').toPromise()
      .then(data => expect(data).toEqual(testPost));
  }));
});
