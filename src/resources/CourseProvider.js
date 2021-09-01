import HttpRequest from './HttpRequest';
import {getAuthToken} from '../constants/authentication';

class CourseProvider extends HttpRequest {
  async getCoursesByMemberId(memberId) {
    this.setHeader(await getAuthToken());
    // return this.get(`/studying-course-info/${memberId}`);
    return await this.get('/studying-course-info/3');
  }

  getCourseByCourseId(courseId) {
    return this.get(`/courses-info/cId/${courseId}`);
  }

  async getCourseModulesByCourseId(courseId) {
    this.setHeader(await getAuthToken());
    return await this.get(`/courses-module-info/cId/${courseId}`);
  }

  async getLectureInfoByCourseIdAndLectureId({courseId, lectureId}) {
    this.setHeader(await getAuthToken());
    return await this.get(`/lecture-info/cId/${courseId}/lecId/${lectureId}`);
  }
}

export default CourseProvider;
