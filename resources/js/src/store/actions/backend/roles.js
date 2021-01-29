import * as actionTypes from '../actionTypes';

const prefix = '/api/';

export const resetRoles = () => ({ type: actionTypes.ROLES_RESET });
const rolesStart = () => ({ type: actionTypes.ROLES_START });
const rolesSuccess = data => ({ type: actionTypes.ROLES_SUCCESS, ...data });
const rolesFail = error => ({ type: actionTypes.ROLES_FAIL, error });
export const getRoles = (page = 1, show = 10, search = '') => async (dispatch, getState) => {
    dispatch(rolesStart());
    const { role } = getState().auth;

    try {
        const token = localStorage.getItem('token');
        const res = await fetch(`${prefix + role}/roles?page=${page}&show=${show}&search=${search}`, {
            headers: {
                Authorization: token
            }
        });
        const resData = await res.json();
        dispatch(rolesSuccess(resData));
    } catch (error) {
        console.log(error);
        dispatch(rolesFail(error));
    }
};

export const getRole = id => async (dispatch, getState) => {
    dispatch(rolesStart());
    const { role } = getState().auth;

    try {
        const token = localStorage.getItem('token');
        const res = await fetch(`${prefix + role}/roles/${id}`, {
            headers: {
                Authorization: token
            }
        });
        const resData = await res.json();
        dispatch(rolesSuccess(resData));
    } catch (error) {
        console.log(error);
        dispatch(rolesFail(error));
    }
};

export const getRolesInfo = () => async (dispatch, getState) => {
    dispatch(rolesStart());
    const { role } = getState().auth;

    try {
        const token = localStorage.getItem('token');
        const res = await fetch(`${prefix + role}/roles/info`, {
            headers: {
                Authorization: token
            }
        });
        const resData = await res.json();
        dispatch(rolesSuccess(resData));
    } catch (error) {
        console.log(error);
        dispatch(rolesFail(error));
    }
};

export const postRoles = data => async (dispatch, getState) => {
    dispatch(rolesStart());
    const { role } = getState().auth;

    try {
        const token = localStorage.getItem('token');
        const form = new FormData(data);
        const res = await fetch(`${prefix + role}/roles`, {
            method: 'POST',
            body: form,
            headers: {
                Authorization: token
            }
        });
        const resData = await res.json();
        if (res.status === 422) throw new Error(Object.values(resData.errors).join('\n'));
        else if (res.status !== 200 && res.status !== 201) throw new Error(resData.error.message);
        dispatch(rolesSuccess(resData));
    } catch (error) {
        console.log(error);
        dispatch(rolesFail(error));
    }
};

export const patchRoles = (id, data) => async (dispatch, getState) => {
    dispatch(rolesStart());
    const { role } = getState().auth;

    try {
        const token = localStorage.getItem('token');
        const form = new FormData(data);
        const res = await fetch(`${prefix + role}/roles/${id}`, {
            method: 'POST',
            body: form,
            headers: {
                Authorization: token,
            }
        });
        const resData = await res.json();
        if (res.status === 422) throw new Error(Object.values(resData.errors).join('\n'));
        dispatch(rolesSuccess(resData));
    } catch (error) {
        console.log(error);
        dispatch(rolesFail(error));
    }
};

export const deleteRoles = id => async (dispatch, getState) => {
    dispatch(rolesStart());
    const { role } = getState().auth;

    try {
        const page = document.getElementById('table-page').value;
        const show = document.getElementById('table-show').value;
        const search = document.getElementById('table-search').value;

        const token = localStorage.getItem('token');
        const res = await fetch(`${prefix + role}/roles/${id}?page=${page}&show=${show}&search=${search}`, {
            method: 'DELETE',
            headers: {
                Authorization: token
            }
        });
        const resData = await res.json();
        if (res.status === 422) throw new Error(Object.values(resData.errors).join('\n'));
        dispatch(rolesSuccess(resData));
    } catch (error) {
        console.log(error);
        dispatch(rolesFail(error));
    }
};