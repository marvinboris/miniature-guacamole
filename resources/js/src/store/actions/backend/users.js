import * as actionTypes from '../actionTypes';

const prefix = '/api/';

export const resetUsers = () => ({ type: actionTypes.USERS_RESET });
const usersStart = () => ({ type: actionTypes.USERS_START });
const usersSuccess = data => ({ type: actionTypes.USERS_SUCCESS, ...data });
const usersFail = error => ({ type: actionTypes.USERS_FAIL, error });
export const getUsers = (page = 1, show = 10, search = '') => async (dispatch, getState) => {
    dispatch(usersStart());
    const { role } = getState().auth;

    try {
        const token = localStorage.getItem('token');
        const res = await fetch(`${prefix + role}/users?page=${page}&show=${show}&search=${search}`, {
            headers: {
                Authorization: token
            }
        });
        const resData = await res.json();
        dispatch(usersSuccess(resData));
    } catch (error) {
        console.log(error);
        dispatch(usersFail(error));
    }
};

export const getUser = id => async (dispatch, getState) => {
    dispatch(usersStart());
    const { role } = getState().auth;

    try {
        const token = localStorage.getItem('token');
        const res = await fetch(`${prefix + role}/users/${id}`, {
            headers: {
                Authorization: token
            }
        });
        const resData = await res.json();
        dispatch(usersSuccess(resData));
    } catch (error) {
        console.log(error);
        dispatch(usersFail(error));
    }
};

export const getUsersInfo = () => async (dispatch, getState) => {
    dispatch(usersStart());
    const { role } = getState().auth;

    try {
        const token = localStorage.getItem('token');
        const res = await fetch(`${prefix + role}/users/info`, {
            headers: {
                Authorization: token
            }
        });
        const resData = await res.json();
        dispatch(usersSuccess(resData));
    } catch (error) {
        console.log(error);
        dispatch(usersFail(error));
    }
};

export const postUsers = data => async (dispatch, getState) => {
    dispatch(usersStart());
    const { role } = getState().auth;

    try {
        const token = localStorage.getItem('token');
        const form = new FormData(data);
        const res = await fetch(`${prefix + role}/users`, {
            method: 'POST',
            body: form,
            headers: {
                Authorization: token
            }
        });
        const resData = await res.json();
        if (res.status === 422) throw new Error(Object.values(resData.errors).join('\n'));
        else if (res.status !== 200 && res.status !== 201) throw new Error(resData.error.message);
        dispatch(usersSuccess(resData));
    } catch (error) {
        console.log(error);
        dispatch(usersFail(error));
    }
};

export const patchUsers = (id, data) => async (dispatch, getState) => {
    dispatch(usersStart());
    const { role } = getState().auth;

    try {
        const token = localStorage.getItem('token');
        const form = new FormData(data);
        const res = await fetch(`${prefix + role}/users/${id}`, {
            method: 'POST',
            body: form,
            headers: {
                Authorization: token,
            }
        });
        const resData = await res.json();
        if (res.status === 422) throw new Error(Object.values(resData.errors).join('\n'));
        dispatch(usersSuccess(resData));
    } catch (error) {
        console.log(error);
        dispatch(usersFail(error));
    }
};

export const deleteUsers = id => async (dispatch, getState) => {
    dispatch(usersStart());
    const { role } = getState().auth;

    try {
        const page = document.getElementById('table-page').value;
        const show = document.getElementById('table-show').value;
        const search = document.getElementById('table-search').value;

        const token = localStorage.getItem('token');
        const res = await fetch(`${prefix + role}/users/${id}?page=${page}&show=${show}&search=${search}`, {
            method: 'DELETE',
            headers: {
                Authorization: token
            }
        });
        const resData = await res.json();
        if (res.status === 422) throw new Error(Object.values(resData.errors).join('\n'));
        dispatch(usersSuccess(resData));
    } catch (error) {
        console.log(error);
        dispatch(usersFail(error));
    }
};