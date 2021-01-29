import * as actionTypes from '../actionTypes';

const prefix = '/api/';

export const resetStudents = () => ({ type: actionTypes.STUDENTS_RESET });
const studentsStart = () => ({ type: actionTypes.STUDENTS_START });
const studentsSuccess = data => ({ type: actionTypes.STUDENTS_SUCCESS, ...data });
const studentsFail = error => ({ type: actionTypes.STUDENTS_FAIL, error });
export const getStudents = (page = 1, show = 10, search = '') => async (dispatch, getState) => {
    dispatch(studentsStart());
    const { role } = getState().auth;

    try {
        const token = localStorage.getItem('token');
        const res = await fetch(`${prefix + role}/students?page=${page}&show=${show}&search=${search}`, {
            headers: {
                Authorization: token
            }
        });
        const resData = await res.json();
        dispatch(studentsSuccess(resData));
    } catch (error) {
        console.log(error);
        dispatch(studentsFail(error));
    }
};

export const getStudent = id => async (dispatch, getState) => {
    dispatch(studentsStart());
    const { role } = getState().auth;

    try {
        const token = localStorage.getItem('token');
        const res = await fetch(`${prefix + role}/students/${id}`, {
            headers: {
                Authorization: token
            }
        });
        const resData = await res.json();
        dispatch(studentsSuccess(resData));
    } catch (error) {
        console.log(error);
        dispatch(studentsFail(error));
    }
};

export const postStudents = data => async (dispatch, getState) => {
    dispatch(studentsStart());
    const { role } = getState().auth;

    try {
        const token = localStorage.getItem('token');
        const form = new FormData(data);
        const res = await fetch(`${prefix + role}/students`, {
            method: 'POST',
            body: form,
            headers: {
                Authorization: token
            }
        });
        const resData = await res.json();
        if (res.status === 422) throw new Error(Object.values(resData.errors).join('\n'));
        else if (res.status !== 200 && res.status !== 201) throw new Error(resData.error.message);
        dispatch(studentsSuccess(resData));
    } catch (error) {
        console.log(error);
        dispatch(studentsFail(error));
    }
};

export const patchStudents = (id, data) => async (dispatch, getState) => {
    dispatch(studentsStart());
    const { role } = getState().auth;

    try {
        const token = localStorage.getItem('token');
        const form = new FormData(data);
        const res = await fetch(`${prefix + role}/students/${id}`, {
            method: 'POST',
            body: form,
            headers: {
                Authorization: token,
            }
        });
        const resData = await res.json();
        if (res.status === 422) throw new Error(Object.values(resData.errors).join('\n'));
        dispatch(studentsSuccess(resData));
    } catch (error) {
        console.log(error);
        dispatch(studentsFail(error));
    }
};

export const deleteStudents = id => async (dispatch, getState) => {
    dispatch(studentsStart());
    const { role } = getState().auth;

    try {
        const page = document.getElementById('table-page').value;
        const show = document.getElementById('table-show').value;
        const search = document.getElementById('table-search').value;

        const token = localStorage.getItem('token');
        const res = await fetch(`${prefix + role}/students/${id}?page=${page}&show=${show}&search=${search}`, {
            method: 'DELETE',
            headers: {
                Authorization: token
            }
        });
        const resData = await res.json();
        if (res.status === 422) throw new Error(Object.values(resData.errors).join('\n'));
        dispatch(studentsSuccess(resData));
    } catch (error) {
        console.log(error);
        dispatch(studentsFail(error));
    }
};