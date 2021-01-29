import * as actionTypes from '../actionTypes';

const prefix = '/api/';

export const resetClassrooms = () => ({ type: actionTypes.CLASSROOMS_RESET });
const classroomsStart = () => ({ type: actionTypes.CLASSROOMS_START });
const classroomsSuccess = data => ({ type: actionTypes.CLASSROOMS_SUCCESS, ...data });
const classroomsFail = error => ({ type: actionTypes.CLASSROOMS_FAIL, error });
export const getClassrooms = (page = 1, show = 10, search = '') => async (dispatch, getState) => {
    dispatch(classroomsStart());
    const { role } = getState().auth;

    try {
        const token = localStorage.getItem('token');
        const res = await fetch(`${prefix + role}/classrooms?page=${page}&show=${show}&search=${search}`, {
            headers: {
                Authorization: token
            }
        });
        const resData = await res.json();
        dispatch(classroomsSuccess(resData));
    } catch (error) {
        console.log(error);
        dispatch(classroomsFail(error));
    }
};

export const getClassroomsInfo = () => async (dispatch, getState) => {
    dispatch(classroomsStart());
    const { role } = getState().auth;

    try {
        const token = localStorage.getItem('token');
        const res = await fetch(`${prefix + role}/classrooms/info`, {
            headers: {
                Authorization: token
            }
        });
        const resData = await res.json();
        dispatch(classroomsSuccess(resData));
    } catch (error) {
        console.log(error);
        dispatch(classroomsFail(error));
    }
};

export const getClassroom = id => async (dispatch, getState) => {
    dispatch(classroomsStart());
    const { role } = getState().auth;

    try {
        const token = localStorage.getItem('token');
        const res = await fetch(`${prefix + role}/classrooms/${id}`, {
            headers: {
                Authorization: token
            }
        });
        const resData = await res.json();
        dispatch(classroomsSuccess(resData));
    } catch (error) {
        console.log(error);
        dispatch(classroomsFail(error));
    }
};

export const postClassrooms = data => async (dispatch, getState) => {
    dispatch(classroomsStart());
    const { role } = getState().auth;

    try {
        const token = localStorage.getItem('token');
        const form = new FormData(data);
        const res = await fetch(`${prefix + role}/classrooms`, {
            method: 'POST',
            body: form,
            headers: {
                Authorization: token
            }
        });
        const resData = await res.json();
        if (res.status === 422) throw new Error(Object.values(resData.errors).join('\n'));
        else if (res.status !== 200 && res.status !== 201) throw new Error(resData.error.message);
        dispatch(classroomsSuccess(resData));
    } catch (error) {
        console.log(error);
        dispatch(classroomsFail(error));
    }
};

export const patchClassrooms = (id, data) => async (dispatch, getState) => {
    dispatch(classroomsStart());
    const { role } = getState().auth;

    try {
        const token = localStorage.getItem('token');
        const form = new FormData(data);
        const res = await fetch(`${prefix + role}/classrooms/${id}`, {
            method: 'POST',
            body: form,
            headers: {
                Authorization: token,
            }
        });
        const resData = await res.json();
        if (res.status === 422) throw new Error(Object.values(resData.errors).join('\n'));
        dispatch(classroomsSuccess(resData));
    } catch (error) {
        console.log(error);
        dispatch(classroomsFail(error));
    }
};

export const deleteClassrooms = id => async (dispatch, getState) => {
    dispatch(classroomsStart());
    const { role } = getState().auth;

    try {
        const page = document.getElementById('table-page').value;
        const show = document.getElementById('table-show').value;
        const search = document.getElementById('table-search').value;

        const token = localStorage.getItem('token');
        const res = await fetch(`${prefix + role}/classrooms/${id}?page=${page}&show=${show}&search=${search}`, {
            method: 'DELETE',
            headers: {
                Authorization: token
            }
        });
        const resData = await res.json();
        if (res.status === 422) throw new Error(Object.values(resData.errors).join('\n'));
        dispatch(classroomsSuccess(resData));
    } catch (error) {
        console.log(error);
        dispatch(classroomsFail(error));
    }
};