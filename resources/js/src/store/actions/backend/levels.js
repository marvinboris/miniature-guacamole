import * as actionTypes from '../actionTypes';

const prefix = '/api/';

export const resetLevels = () => ({ type: actionTypes.LEVELS_RESET });
const levelsStart = () => ({ type: actionTypes.LEVELS_START });
const levelsSuccess = data => ({ type: actionTypes.LEVELS_SUCCESS, ...data });
const levelsFail = error => ({ type: actionTypes.LEVELS_FAIL, error });
export const getLevels = (page = 1, show = 10, search = '') => async (dispatch, getState) => {
    dispatch(levelsStart());
    const { role } = getState().auth;

    try {
        const token = localStorage.getItem('token');
        const res = await fetch(`${prefix + role}/levels?page=${page}&show=${show}&search=${search}`, {
            headers: {
                Authorization: token
            }
        });
        const resData = await res.json();
        dispatch(levelsSuccess(resData));
    } catch (error) {
        console.log(error);
        dispatch(levelsFail(error));
    }
};

export const getLevelsInfo = () => async (dispatch, getState) => {
    dispatch(levelsStart());
    const { role } = getState().auth;

    try {
        const token = localStorage.getItem('token');
        const res = await fetch(`${prefix + role}/levels/info`, {
            headers: {
                Authorization: token
            }
        });
        const resData = await res.json();
        dispatch(levelsSuccess(resData));
    } catch (error) {
        console.log(error);
        dispatch(levelsFail(error));
    }
};

export const getLevel = id => async (dispatch, getState) => {
    dispatch(levelsStart());
    const { role } = getState().auth;

    try {
        const token = localStorage.getItem('token');
        const res = await fetch(`${prefix + role}/levels/${id}`, {
            headers: {
                Authorization: token
            }
        });
        const resData = await res.json();
        dispatch(levelsSuccess(resData));
    } catch (error) {
        console.log(error);
        dispatch(levelsFail(error));
    }
};

export const postLevels = data => async (dispatch, getState) => {
    dispatch(levelsStart());
    const { role } = getState().auth;

    try {
        const token = localStorage.getItem('token');
        const form = new FormData(data);
        const res = await fetch(`${prefix + role}/levels`, {
            method: 'POST',
            body: form,
            headers: {
                Authorization: token
            }
        });
        const resData = await res.json();
        if (res.status === 422) throw new Error(Object.values(resData.errors).join('\n'));
        else if (res.status !== 200 && res.status !== 201) throw new Error(resData.error.message);
        dispatch(levelsSuccess(resData));
    } catch (error) {
        console.log(error);
        dispatch(levelsFail(error));
    }
};

export const patchLevels = (id, data) => async (dispatch, getState) => {
    dispatch(levelsStart());
    const { role } = getState().auth;

    try {
        const token = localStorage.getItem('token');
        const form = new FormData(data);
        const res = await fetch(`${prefix + role}/levels/${id}`, {
            method: 'POST',
            body: form,
            headers: {
                Authorization: token,
            }
        });
        const resData = await res.json();
        if (res.status === 422) throw new Error(Object.values(resData.errors).join('\n'));
        dispatch(levelsSuccess(resData));
    } catch (error) {
        console.log(error);
        dispatch(levelsFail(error));
    }
};

export const deleteLevels = id => async (dispatch, getState) => {
    dispatch(levelsStart());
    const { role } = getState().auth;

    try {
        const page = document.getElementById('table-page').value;
        const show = document.getElementById('table-show').value;
        const search = document.getElementById('table-search').value;

        const token = localStorage.getItem('token');
        const res = await fetch(`${prefix + role}/levels/${id}?page=${page}&show=${show}&search=${search}`, {
            method: 'DELETE',
            headers: {
                Authorization: token
            }
        });
        const resData = await res.json();
        if (res.status === 422) throw new Error(Object.values(resData.errors).join('\n'));
        dispatch(levelsSuccess(resData));
    } catch (error) {
        console.log(error);
        dispatch(levelsFail(error));
    }
};