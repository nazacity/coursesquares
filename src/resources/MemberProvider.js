import HttpRequest from './HttpRequest';
import {getAuthToken} from '../constants/authentication';

class MemberProvider extends HttpRequest {
  async getMemberInfo() {
    this.setHeader(await getAuthToken());
    return this.get('/member-info');
  }
}

export default MemberProvider;
