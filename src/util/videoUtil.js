import AsyncStorage from '@react-native-async-storage/async-storage';

export const onVideoProgress = async (currentTime, videoId) => {
  await AsyncStorage.setItem(`${videoId}`, `${currentTime}`);
};

export const getVideoTime = async videoId => {
  try {
    const time = await AsyncStorage.getItem(`${videoId}`);

    return +time;
  } catch (error) {
    return 0;
  }
};
