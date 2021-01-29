import * as actionTypes from '../actionTypes';

const prefix = '/api/';

export const resetSessions = () => ({ type: actionTypes.SESSIONS_RESET });
const sessionsStart = () => ({ type: actionTypes.SESSIONS_START });
const sessionsSuccess = data => ({ type: actionTypes.SESSIONS_SUCCESS, ...data });
const sessionsFail = error => ({ type: actionTypes.SESSIONS_FAIL, error });
export const getSessions = (page = 1, show = 10, search = '') => async (dispatch, getState) => {
    dispatch(sessionsStart());
    const { role } = getState().auth;

    try {
        const token = localStorage.getItem('token');
        const res = await fetch(`${prefix + role}/sessions?page=${page}&show=${show}&search=${search}`, {
            headers: {
                Authorization: token
            }
        });
        const resData = await res.json();
        dispatch(sessionsSuccess(resData));
    } catch (error) {
        console.log(error);
        dispatch(sessionsFail(error));
    }
};

export const getSessionsInfo = () => async (dispatch, getState) => {
    dispatch(sessionsStart());
    const { role } = getState().auth;

    try {
        const token = localStorage.getItem('token');
        const res = await fetch(`${prefix + role}/sessions/info`, {
            headers: {
                Authorization: token
            }
        });
        const resData = await res.json();
        dispatch(sessionsSuccess(resData));
    } catch (error) {
        console.log(error);
        dispatch(sessionsFail(error));
    }
};

export const getSession = id => async (dispatch, getState) => {
    dispatch(sessionsStart());
    const { role } = getState().auth;

    try {
        const token = localStorage.getItem('token');
        const res = await fetch(`${prefix + role}/sessions/${id}`, {
            headers: {
                Authorization: token
            }
        });
        const resData = await res.json();
        dispatch(sessionsSuccess(resData));
    } catch (error) {
        console.log(error);
        dispatch(sessionsFail(error));
    }
};

export const postSessions = data => async (dispatch, getState) => {
    dispatch(sessionsStart());
    const { role } = getState().auth;

    try {
        const token = localStorage.getItem('token');
        const form = new FormData(data);
        const res = await fetch(`${prefix + role}/sessions`, {
            method: 'POST',
            body: form,
            headers: {
                Authorization: token
            }
        });
        const resData = await res.json();
        if (res.status === 422) throw new Error(Object.values(resData.errors).join('\n'));
        else if (res.status !== 200 && res.status !== 201) throw new Error(resData.error.message);
        dispatch(sessionsSuccess(resData));
    } catch (error) {
        console.log(error);
        dispatch(sessionsFail(error));
    }
};

export const patchSessions = (id, data) => async (dispatch, getState) => {
    dispatch(sessionsStart());
    const { role } = getState().auth;

    try {
        const token = localStorage.getItem('token');
        const form = new FormData(data);
        const res = await fetch(`${prefix + role}/sessions/${id}`, {
            method: 'POST',
            body: form,
            headers: {
                Authorization: token,
            }
        });
        const resData = await res.json();
        if (res.status === 422) throw new Error(Object.values(resData.errors).join('\n'));
        dispatch(sessionsSuccess(resData));
    } catch (error) {
        console.log(error);
        dispatch(sessionsFail(error));
    }
};

export const deleteSessions = id => async (dispatch, getState) => {
    dispatch(sessionsStart());
    const { role } = getState().auth;

    try {
        const page = document.getElementById('table-page').value;
        const show = document.getElementById('table-show').value;
        const search = document.getElementById('table-search').value;

        const token = localStorage.getItem('token');
        const res = await fetch(`${prefix + role}/sessions/${id}?page=${page}&show=${show}&search=${search}`, {
            method: 'DELETE',
            headers: {
                Authorization: token
            }
        });
        const resData = await res.json();
        if (res.status === 422) throw new Error(Object.values(resData.errors).join('\n'));
        dispatch(sessionsSuccess(resData));
    } catch (error) {
        console.log(error);
        dispatch(sessionsFail(error));
    }
};