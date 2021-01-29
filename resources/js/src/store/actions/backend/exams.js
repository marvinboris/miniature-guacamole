import * as actionTypes from '../actionTypes';

const prefix = '/api/';

export const resetExams = () => ({ type: actionTypes.EXAMS_RESET });
const examsStart = () => ({ type: actionTypes.EXAMS_START });
const examsSuccess = data => ({ type: actionTypes.EXAMS_SUCCESS, ...data });
const examsFail = error => ({ type: actionTypes.EXAMS_FAIL, error });
export const getExams = (page = 1, show = 10, search = '') => async (dispatch, getState) => {
    dispatch(examsStart());
    const { role } = getState().auth;

    try {
        const token = localStorage.getItem('token');
        const res = await fetch(`${prefix + role}/exams?page=${page}&show=${show}&search=${search}`, {
            headers: {
                Authorization: token
            }
        });
        const resData = await res.json();
        dispatch(examsSuccess(resData));
    } catch (error) {
        console.log(error);
        dispatch(examsFail(error));
    }
};

export const getExamsInfo = () => async (dispatch, getState) => {
    dispatch(examsStart());
    const { role } = getState().auth;

    try {
        const token = localStorage.getItem('token');
        const res = await fetch(`${prefix + role}/exams/info`, {
            headers: {
                Authorization: token
            }
        });
        const resData = await res.json();
        dispatch(examsSuccess(resData));
    } catch (error) {
        console.log(error);
        dispatch(examsFail(error));
    }
};

export const getExam = id => async (dispatch, getState) => {
    dispatch(examsStart());
    const { role } = getState().auth;

    try {
        const token = localStorage.getItem('token');
        const res = await fetch(`${prefix + role}/exams/${id}`, {
            headers: {
                Authorization: token
            }
        });
        const resData = await res.json();
        dispatch(examsSuccess(resData));
    } catch (error) {
        console.log(error);
        dispatch(examsFail(error));
    }
};

export const postExams = data => async (dispatch, getState) => {
    dispatch(examsStart());
    const { role } = getState().auth;

    try {
        const token = localStorage.getItem('token');
        const form = new FormData(data);
        const res = await fetch(`${prefix + role}/exams`, {
            method: 'POST',
            body: form,
            headers: {
                Authorization: token
            }
        });
        const resData = await res.json();
        if (res.status === 422) throw new Error(Object.values(resData.errors).join('\n'));
        else if (res.status !== 200 && res.status !== 201) throw new Error(resData.error.message);
        dispatch(examsSuccess(resData));
    } catch (error) {
        console.log(error);
        dispatch(examsFail(error));
    }
};

export const patchExams = (id, data) => async (dispatch, getState) => {
    dispatch(examsStart());
    const { role } = getState().auth;

    try {
        const token = localStorage.getItem('token');
        const form = new FormData(data);
        const res = await fetch(`${prefix + role}/exams/${id}`, {
            method: 'POST',
            body: form,
            headers: {
                Authorization: token,
            }
        });
        const resData = await res.json();
        if (res.status === 422) throw new Error(Object.values(resData.errors).join('\n'));
        dispatch(examsSuccess(resData));
    } catch (error) {
        console.log(error);
        dispatch(examsFail(error));
    }
};

export const deleteExams = id => async (dispatch, getState) => {
    dispatch(examsStart());
    const { role } = getState().auth;

    try {
        const page = document.getElementById('table-page').value;
        const show = document.getElementById('table-show').value;
        const search = document.getElementById('table-search').value;

        const token = localStorage.getItem('token');
        const res = await fetch(`${prefix + role}/exams/${id}?page=${page}&show=${show}&search=${search}`, {
            method: 'DELETE',
            headers: {
                Authorization: token
            }
        });
        const resData = await res.json();
        if (res.status === 422) throw new Error(Object.values(resData.errors).join('\n'));
        dispatch(examsSuccess(resData));
    } catch (error) {
        console.log(error);
        dispatch(examsFail(error));
    }
};