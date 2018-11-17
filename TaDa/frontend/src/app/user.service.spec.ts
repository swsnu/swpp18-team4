import { TestBed, async } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from "@angular/common/http/testing";
import { HttpClient } from "@angular/common/http";

import { UserService } from './user.service';
import {Employer, User} from "./Classes/User";
import { UserTypeEnum } from "./Enums/UserTypeEnum";

const mockUserList: User[] = [
  { id: 1, type: UserTypeEnum.Employer, email: "a@gmail.com", password: "a_pass", name: "a_name"},
  { id: 2, type: UserTypeEnum.Employee, email: "b@gmail.com", password: "b_pass", name: "b_name"}
];
const mockEmployerList: Employer[] = [
  {id: 1, company_name: "c1", company_address: "c1", business_content: "c1", representative_name: "c1_name",
    representative_phonenumber: "c1", star: 1},
  {id: 2, company_name: "c2", company_address: "c2", business_content: "c2", representative_name: "c2_name",
    representative_phonenumber: "c2", star: 2},
];
const mockUser: User = { id: 1, type: UserTypeEnum.Employer, email: "a@gmail.com", password: "a", name: "a"};
const mockEmployer: Employer = {id: 1, company_name: "c1", company_address: "c1", business_content: "c1", representative_name: "c1_name",
                                  representative_phonenumber: "c1", star: 1};

describe('UserService', () => {
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;
  let userService: UserService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
      ],
      providers: [
        UserService,
      ]
    });
    httpClient = TestBed.get(HttpClient);
    httpTestingController = TestBed.get(HttpTestingController);
    userService = TestBed.get(UserService);
  });

  it('should be created', () => {
    const service: UserService = TestBed.get(UserService);
    expect(service).toBeTruthy();
  });

  it('test getEmployerList func', async(() => {
    const url = `api/user/employer/`;

    userService.getEmployerList();
    const req = httpTestingController.expectOne(url);
    expect(req.request.method).toEqual('GET');
    req.flush(mockEmployerList);
  }));

  it('test getEmployer func', async(() => {
    const userId = mockEmployerList[0].id;

    const url = `api/user/employer/1/`;

    userService.getEmployer(userId)
      .then((user) => {
        expect(user).toEqual(mockEmployerList[0]);
      });
    const req = httpTestingController.expectOne(url);
    expect(req.request.method).toEqual('GET');
    req.flush(mockEmployerList[0]);
  }));

});
