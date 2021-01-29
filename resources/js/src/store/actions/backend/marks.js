import * as actionTypes from '../actionTypes';

const prefix = '/api/';

export const resetMarks = () => ({ type: actionTypes.MARKS_RESET });
const marksStart = () => ({ type: actionTypes.MARKS_START });
const marksSuccess = data => ({ type: actionTypes.MARKS_SUCCESS, ...data });
const marksFail = error => ({ type: actionTypes.MARKS_FAIL, error });
export const getMarks = (page = 1, show = 10, search = '') => async (dispatch, getState) => {
    dispatch(marksStart());
    const { role } = getState().auth;

    try {
        const token = localStorage.getItem('token');
        const res = await fetch(`${prefix + role}/marks?page=${page}&show=${show}&search=${search}`, {
            headers: {
                Authorization: token
            }
        });
        const resData = await res.json();
        dispatch(marksSuccess(resData));
    } catch (error) {
        console.log(error);
        dispatch(marksFail(error));
    }
};

export const getMarksInfo = () => async (dispatch, getState) => {
    dispatch(marksStart());
    const { role } = getState().auth;

    try {
        const token = localStorage.getItem('token');
        const res = await fetch(`${prefix + role}/marks/info`, {
            headers: {
                Authorization: token
            }
        });
        const resData = await res.json();
        dispatch(marksSuccess(resData));
    } catch (error) {
        console.log(error);
        dispatch(marksFail(error));
    }
};

export const getMark = id => async (dispatch, getState) => {
    dispatch(marksStart());
    const { role } = getState().auth;

    try {
        const token = localStorage.getItem('token');
        const res = await fetch(`${prefix + role}/marks/${id}`, {
            headers: {
                Authorization: token
            }
        });
        const resData = await res.json();
        dispatch(marksSuccess(resData));
    } catch (error) {
        console.log(error);
        dispatch(marksFail(error));
    }
};

export const postMarks = data => async (dispatch, getState) => {
    dispatch(marksStart());
    const { role } = getState().auth;

    try {
        const token = localStorage.getItem('token');
        const form = new FormData(data);
        const res = await fetch(`${prefix + role}/marks`, {
            method: 'POST',
            body: form,
            headers: {
                Authorization: token
            }
        });
        const resData = await res.json();
        if (res.status === 422) throw new Error(Object.values(resData.errors).join('\n'));
        else if (res.status !== 200 && res.status !== 201) throw new Error(resData.error.message);
        dispatch(marksSuccess(resData));
    } catch (error) {
        console.log(error);
        dispatch(marksFail(error));
    }
};

export const patchMarks = (id, data) => async (dispatch, getState) => {
    dispatch(marksStart());
    const { role } = getState().auth;

    try {
        const token = localStorage.getItem('token');
        const form = new FormData(data);
        const res = await fetch(`${prefix + role}/marks/${id}`, {
            method: 'POST',
            body: form,
            headers: {
                Authorization: token,
            }
        });
        const resData = await res.json();
        if (res.status === 422) throw new Error(Object.values(resData.errors).join('\n'));
        dispatch(marksSuccess(resData));
    } catch (error) {
        console.log(error);
        dispatch(marksFail(error));
    }
};

export const deleteMarks = id => async (dispatch, getState) => {
    dispatch(marksStart());
    const { role } = getState().auth;

    try {
        const page = document.getElementById('table-page').value;
        const show = document.getElementById('table-show').value;
        const search = document.getElementById('table-search').value;

        const token = localStorage.getItem('token');
        const res = await fetch(`${prefix + role}/marks/${id}?page=${page}&show=${show}&search=${search}`, {
            method: 'DELETE',
            headers: {
                Authorization: token
            }
        });
        const resData = await res.json();
        if (res.status === 422) throw new Error(Object.values(resData.errors).join('\n'));
        dispatch(marksSuccess(resData));
    } catch (error) {
        console.log(error);
        dispatch(marksFail(error));
    }
};