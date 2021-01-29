import * as actionTypes from '../actionTypes';

const prefix = '/api/';

export const resetExamTypes = () => ({ type: actionTypes.EXAM_TYPES_RESET });
const examTypesStart = () => ({ type: actionTypes.EXAM_TYPES_START });
const examTypesSuccess = data => ({ type: actionTypes.EXAM_TYPES_SUCCESS, ...data });
const examTypesFail = error => ({ type: actionTypes.EXAM_TYPES_FAIL, error });
export const getExamTypes = (page = 1, show = 10, search = '') => async (dispatch, getState) => {
    dispatch(examTypesStart());
    const { role } = getState().auth;

    try {
        const token = localStorage.getItem('token');
        const res = await fetch(`${prefix + role}/exam-types?page=${page}&show=${show}&search=${search}`, {
            headers: {
                Authorization: token
            }
        });
        const resData = await res.json();
        dispatch(examTypesSuccess(resData));
    } catch (error) {
        console.log(error);
        dispatch(examTypesFail(error));
    }
};

export const getExamType = id => async (dispatch, getState) => {
    dispatch(examTypesStart());
    const { role } = getState().auth;

    try {
        const token = localStorage.getItem('token');
        const res = await fetch(`${prefix + role}/exam-types/${id}`, {
            headers: {
                Authorization: token
            }
        });
        const resData = await res.json();
        dispatch(examTypesSuccess(resData));
    } catch (error) {
        console.log(error);
        dispatch(examTypesFail(error));
    }
};

export const postExamTypes = data => async (dispatch, getState) => {
    dispatch(examTypesStart());
    const { role } = getState().auth;

    try {
        const token = localStorage.getItem('token');
        const form = new FormData(data);
        const res = await fetch(`${prefix + role}/exam-types`, {
            method: 'POST',
            body: form,
            headers: {
                Authorization: token
            }
        });
        const resData = await res.json();
        if (res.status === 422) throw new Error(Object.values(resData.errors).join('\n'));
        else if (res.status !== 200 && res.status !== 201) throw new Error(resData.error.message);
        dispatch(examTypesSuccess(resData));
    } catch (error) {
        console.log(error);
        dispatch(examTypesFail(error));
    }
};

export const patchExamTypes = (id, data) => async (dispatch, getState) => {
    dispatch(examTypesStart());
    const { role } = getState().auth;

    try {
        const token = localStorage.getItem('token');
        const form = new FormData(data);
        const res = await fetch(`${prefix + role}/exam-types/${id}`, {
            method: 'POST',
            body: form,
            headers: {
                Authorization: token,
            }
        });
        const resData = await res.json();
        if (res.status === 422) throw new Error(Object.values(resData.errors).join('\n'));
        dispatch(examTypesSuccess(resData));
    } catch (error) {
        console.log(error);
        dispatch(examTypesFail(error));
    }
};

export const deleteExamTypes = id => async (dispatch, getState) => {
    dispatch(examTypesStart());
    const { role } = getState().auth;

    try {
        const page = document.getElementById('table-page').value;
        const show = document.getElementById('table-show').value;
        const search = document.getElementById('table-search').value;

        const token = localStorage.getItem('token');
        const res = await fetch(`${prefix + role}/exam-types/${id}?page=${page}&show=${show}&search=${search}`, {
            method: 'DELETE',
            headers: {
                Authorization: token
            }
        });
        const resData = await res.json();
        if (res.status === 422) throw new Error(Object.values(resData.errors).join('\n'));
        dispatch(examTypesSuccess(resData));
    } catch (error) {
        console.log(error);
        dispatch(examTypesFail(error));
    }
};