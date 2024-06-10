import { useSelector } from 'react-redux';
import store from '../store';

const useToken = (): string | null => {
  const token = useSelector((state: ReturnType<typeof store.getState>) => state.token.value);
  return token;
};

export default useToken;
