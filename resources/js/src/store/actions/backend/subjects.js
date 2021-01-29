import * as actionTypes from '../actionTypes';

const prefix = '/api/';

export const resetSubjects = () => ({ type: actionTypes.SUBJECTS_RESET });
const subjectsStart = () => ({ type: actionTypes.SUBJECTS_START });
const subjectsSuccess = data => ({ type: actionTypes.SUBJECTS_SUCCESS, ...data });
const subjectsFail = error => ({ type: actionTypes.SUBJECTS_FAIL, error });
export const getSubjects = (page = 1, show = 10, search = '') => async (dispatch, getState) => {
    dispatch(subjectsStart());
    const { role } = getState().auth;

    try {
        const token = localStorage.getItem('token');
        const res = await fetch(`${prefix + role}/subjects?page=${page}&show=${show}&search=${search}`, {
            headers: {
                Authorization: token
            }
        });
        const resData = await res.json();
        dispatch(subjectsSuccess(resData));
    } catch (error) {
        console.log(error);
        dispatch(subjectsFail(error));
    }
};

export const getSubjectsInfo = () => async (dispatch, getState) => {
    dispatch(subjectsStart());
    const { role } = getState().auth;

    try {
        const token = localStorage.getItem('token');
        const res = await fetch(`${prefix + role}/subjects/info`, {
            headers: {
                Authorization: token
            }
        });
        const resData = await res.json();
        dispatch(subjectsSuccess(resData));
    } catch (error) {
        console.log(error);
        dispatch(subjectsFail(error));
    }
};

export const getSubject = id => async (dispatch, getState) => {
    dispatch(subjectsStart());
    const { role } = getState().auth;

    try {
        const token = localStorage.getItem('token');
        const res = await fetch(`${prefix + role}/subjects/${id}`, {
            headers: {
                Authorization: token
            }
        });
        const resData = await res.json();
        dispatch(subjectsSuccess(resData));
    } catch (error) {
        console.log(error);
        dispatch(subjectsFail(error));
    }
};

export const postSubjects = data => async (dispatch, getState) => {
    dispatch(subjectsStart());
    const { role } = getState().auth;

    try {
        const token = localStorage.getItem('token');
        const form = new FormData(data);
        const res = await fetch(`${prefix + role}/subjects`, {
            method: 'POST',
            body: form,
            headers: {
                Authorization: token
            }
        });
        const resData = await res.json();
        if (res.status === 422) throw new Error(Object.values(resData.errors).join('\n'));
        else if (res.status !== 200 && res.status !== 201) throw new Error(resData.error.message);
        dispatch(subjectsSuccess(resData));
    } catch (error) {
        console.log(error);
        dispatch(subjectsFail(error));
    }
};

export const patchSubjects = (id, data) => async (dispatch, getState) => {
    dispatch(subjectsStart());
    const { role } = getState().auth;

    try {
        const token = localStorage.getItem('token');
        const form = new FormData(data);
        const res = await fetch(`${prefix + role}/subjects/${id}`, {
            method: 'POST',
            body: form,
            headers: {
                Authorization: token,
            }
        });
        const resData = await res.json();
        if (res.status === 422) throw new Error(Object.values(resData.errors).join('\n'));
        dispatch(subjectsSuccess(resData));
    } catch (error) {
        console.log(error);
        dispatch(subjectsFail(error));
    }
};

export const deleteSubjects = id => async (dispatch, getState) => {
    dispatch(subjectsStart());
    const { role } = getState().auth;

    try {
        const page = document.getElementById('table-page').value;
        const show = document.getElementById('table-show').value;
        const search = document.getElementById('table-search').value;

        const token = localStorage.getItem('token');
        const res = await fetch(`${prefix + role}/subjects/${id}?page=${page}&show=${show}&search=${search}`, {
            method: 'DELETE',
            headers: {
                Authorization: token
            }
        });
        const resData = await res.json();
        if (res.status === 422) throw new Error(Object.values(resData.errors).join('\n'));
        dispatch(subjectsSuccess(resData));
    } catch (error) {
        console.log(error);
        dispatch(subjectsFail(error));
    }
};