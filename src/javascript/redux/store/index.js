import { applyMiddleware, createStore } from 'redux';
import ReduxThunk from 'redux-thunk';
import reducer from 'javascript/redux/reducer';

function configureStore() {
  return createStore(reducer, applyMiddleware(ReduxThunk));
}

export default configureStore;