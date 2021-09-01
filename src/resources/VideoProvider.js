import HttpRequest from './HttpRequest';
import {getAuthToken} from '../constants/authentication';

class VideoProvider extends HttpRequest {
  async createVideoPath(payload) {
    this.setHeader(await getAuthToken());

    return await this.post('/create-video-path', payload);
  }
}

export default VideoProvider;
