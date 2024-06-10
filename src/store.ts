import { combineReducers, createStore } from 'redux';
import tokenReducer from './reducers/tokenSlice';

const rootReducer = combineReducers({
  token: tokenReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

const store = createStore(rootReducer);

export default store;
