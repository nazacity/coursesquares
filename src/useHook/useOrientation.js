import {useState, useEffect} from 'react';
import {Dimensions} from 'react-native';

const useOrientation = () => {
  const {width, height} = Dimensions.get('window');
  const [state, setState] = useState({
    state: 'landscape',
    width: width,
    height: height,
  });

  useEffect(() => {
    const subscription = Dimensions.addEventListener('change', ({window}) => {
      if (window.width > window.height) {
        setState({
          state: 'portrait',
          width: window.width,
          height: window.height,
        });
      } else if (width < height) {
        setState({
          state: 'landscape',
          width: window.width,
          height: window.height,
        });
      }
    });

    return () => subscription?.remove();
  }, [width, height]);

  return state;
};

export default useOrientation;
