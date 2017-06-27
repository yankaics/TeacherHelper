import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { MdSnackBar } from '@angular/material';

import { CheckInService } from '../../services/check-in/check-in.service';
import { CourseService } from '../../services/course/course.service';

@Component({
  selector: 'app-check-in',
  templateUrl: './check-in.component.html',
  styleUrls: ['./check-in.component.sass']
})
export class CheckInComponent implements OnInit {
  isAuth: boolean;  // true 为老师，false 为学生
  courseName: string;
  checkInID: number;
  username: string;
  students: any = [];
  studentName: string = "";
  studentId: string = "";

  isLoaded: boolean = false;

  constructor(public router: Router, public activatedRoute: ActivatedRoute,
              public snackBar: MdSnackBar, public checkInService: CheckInService,
              public courseService: CourseService) {
                activatedRoute.params.subscribe((params: Params) => {
                  this.courseName = params['course'];
                  this.checkInID = params['check-in'];
                  this.username = params['username'];
                  this.getCheckInAndDisplay(true);
                  // 等待取回身份
                  let requestLoop = setInterval(() => {
                    if (this.isAuth != undefined && this.isAuth != null) {
                      this.isLoaded = true;
                      clearInterval(requestLoop);
                      // 轮询
                      if (this.isAuth == true) {
                        setInterval(() => {
                          this.getCheckInAndDisplay(false);
                        }, 2000);
                      }
                    }
                  }, 100);
                });
              }

  ngOnInit() {}

  getCheckInAndDisplay(isInit: boolean) {
    // 取回测试信息
    this.checkInService.getCheckIn(this.courseName, this.checkInID. this.username).subscribe((data) => {
      // 如果是第一次请求
      if (isInit) {
        // 装载数据
        this.students = data.checkIn.students;
        // 判断用户
        this.isAuth = data.isOK;
      // 如果不是第一次请求
      } else {
        this.students = data.checkIn.students;
      }
    });
  }

  // 学生提交签到情况
  submitCheckIn() {
    if (this.studentId != '' && this.studentName != '') {
      this.courseService.checkStudent(this.username, this.courseName, this.studentId, this.studentName).subscribe((data) => {
        if (data.isOK) {
          if (data.exist) {
            console.log("right");
          } else {
            this.snackBar.open('你尚未加入本课程', '知道了', { duration: 2000 });
          }
        }
      });
    } else {
      this.snackBar.open('学号和姓名不能为空', '知道了', { duration: 2000 });
    }
  }

}
