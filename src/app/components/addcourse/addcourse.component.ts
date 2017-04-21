import { Component, OnInit } from '@angular/core';
import { MdSnackBar } from '@angular/material';

import { CourseService } from '../../services/course/course.service';
import { Course } from '../../services/course/course';
import { Validator } from '../../services/course/validator';

@Component({
  selector: 'app-addcourse',
  templateUrl: './addcourse.component.html',
  styleUrls: ['./addcourse.component.sass']
})
export class AddcourseComponent implements OnInit {
  course: Course;
  validator: Validator;
  errorMessage: string = '';

  constructor(public courseService: CourseService, public snackBar: MdSnackBar) { }

  ngOnInit() {
  }

  addCourse(courseInfoData) {
    this.course.name = courseInfoData.name;
    this.course.classroom = courseInfoData.classroom;
    this.course.time = courseInfoData.time;
    let errorMessage = this.validator.checkCourseInfo(courseInfoData.name, courseInfoData.classroom,
                                                    courseInfoData.time);
    if (errorMessage != '') {
      this.errorMessage = errorMessage;
      return;
    }

    // TODO 在数据库中新建一个课程信息
    // this.courseService.addCourse(this.course).subscribe((data)=> {
    //   if (!data.isOK) {
    //     this.errorMessage = data;
    //   } else {
    //     this.course = data;
    //     this.snackBar.open('创建成功', '知道了', { duration: 2000 });
    //   }
    // });
  }

}
