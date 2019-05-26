import reducer from './auth';

import * as actionTypes from '../actions/actionsTypes';

describe('auth reducer', () => {
    it('should return initial state', () => {
        expect(reducer(undefined, {})).toEqual({
            token: null,
            userId: null,
            error: null,
            loading: false,
            authRedirectPath: '/'
        });
    });
    it('shoild return token upon login state', () => {
        expect(reducer({
            token: null,
            userId: null,
            error: null,
            loading: false,
            authRedirectPath: '/'
        }
            , {
                type: actionTypes.AUTH_SUCCESS,
                userId: 'some-token',
                token: 'some-userID',
                error: null,
                loading: false
            })).toEqual({
                userId: 'some-token',
                token: 'some-userID',
                error: null,
                loading: false,
                authRedirectPath: '/'
            });
    });
})