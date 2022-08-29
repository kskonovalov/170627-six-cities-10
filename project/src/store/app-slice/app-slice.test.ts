import {appSlice} from './app-slice';
import {loading, setError} from '../actions';

describe('Reducer: App slice', () => {
  it('without additional params should return default state', () => {
    expect(appSlice.reducer(void 0, {type: 'UNKNOWN_ACTION'}))
      .toEqual({loading: {}, error: null});
  });

  it('should add the "loading" value with any key', () => {
    expect(appSlice.reducer(void 0, loading({name: 'appLoading', status: true})))
      .toEqual({loading: {appLoading: true}, error: null});
  });

  it('should add the single string error to the state', () => {
    expect(appSlice.reducer(void 0, setError('test error')))
      .toEqual({loading: {}, error: 'test error'});
  });

  it('should add the array of the string errors to the state', () => {
    expect(appSlice.reducer(void 0, setError(['error 1', 'error 2'])))
      .toEqual({loading: {}, error: ['error 1', 'error 2']});
  });

  it('should reset to the null error in the state', () => {
    const state = {
      loading: {},
      error: 'some error'
    };
    expect(appSlice.reducer(state, setError(null)))
      .toEqual({loading: {}, error: null});
  });
});
