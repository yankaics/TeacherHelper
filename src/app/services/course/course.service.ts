import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';

import { Course } from './course';

@Injectable()
export class CourseService {
  private headers = new Headers({'Content-Type': 'application/json'});
  courses: Course[];

  constructor(private http: Http) {}

  // 获取某一个课程的详情
  getCourse(name: string) {
    return this.http.post('/course/get-course', { name: name },
                          { headers: this.headers })
                    .map((res) => res.json());
  }

  // 获取这个老师的所有课程
  getCourses() {
    return this.http.post('/course/get-courses', {}, { headers: this.headers })
                    .map((res) => res.json());
  }

  // 删除某个课程
  deleteCourse(course) {
    // TODO 在数据库中删除课程信息
  }

  // 更新某个课程的信息
  updateCourse(course, oldName) {
    return this.http.post('/course/update-course',
                          { course: course, oldName: oldName },
                          { headers: this.headers })
                    .map((res) => {
                      let temp = res.json();
                      // 出现异常
                      if (!temp.isOK) return temp;
                      // 创建新的课程
                      return new Course(temp.name, temp.classroom, temp.time);
                    });
  }

  // 为老师添加一门课程
  addCourse(course) {
    return this.http.post('/course/add-course', { course: course },
                          { headers: this.headers })
                    .map((res) => res.json());
  }

}
