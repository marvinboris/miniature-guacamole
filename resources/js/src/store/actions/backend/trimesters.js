import * as actionTypes from '../actionTypes';

const prefix = '/api/';

export const resetTrimesters = () => ({ type: actionTypes.TRIMESTERS_RESET });
const trimestersStart = () => ({ type: actionTypes.TRIMESTERS_START });
const trimestersSuccess = data => ({ type: actionTypes.TRIMESTERS_SUCCESS, ...data });
const trimestersFail = error => ({ type: actionTypes.TRIMESTERS_FAIL, error });
export const getTrimesters = (page = 1, show = 10, search = '') => async (dispatch, getState) => {
    dispatch(trimestersStart());
    const { role } = getState().auth;

    try {
        const token = localStorage.getItem('token');
        const res = await fetch(`${prefix + role}/trimesters?page=${page}&show=${show}&search=${search}`, {
            headers: {
                Authorization: token
            }
        });
        const resData = await res.json();
        dispatch(trimestersSuccess(resData));
    } catch (error) {
        console.log(error);
        dispatch(trimestersFail(error));
    }
};

export const getTrimestersInfo = () => async (dispatch, getState) => {
    dispatch(trimestersStart());
    const { role } = getState().auth;

    try {
        const token = localStorage.getItem('token');
        const res = await fetch(`${prefix + role}/trimesters/info`, {
            headers: {
                Authorization: token
            }
        });
        const resData = await res.json();
        dispatch(trimestersSuccess(resData));
    } catch (error) {
        console.log(error);
        dispatch(trimestersFail(error));
    }
};

export const getTrimester = id => async (dispatch, getState) => {
    dispatch(trimestersStart());
    const { role } = getState().auth;

    try {
        const token = localStorage.getItem('token');
        const res = await fetch(`${prefix + role}/trimesters/${id}`, {
            headers: {
                Authorization: token
            }
        });
        const resData = await res.json();
        dispatch(trimestersSuccess(resData));
    } catch (error) {
        console.log(error);
        dispatch(trimestersFail(error));
    }
};

export const postTrimesters = data => async (dispatch, getState) => {
    dispatch(trimestersStart());
    const { role } = getState().auth;

    try {
        const token = localStorage.getItem('token');
        const form = new FormData(data);
        const res = await fetch(`${prefix + role}/trimesters`, {
            method: 'POST',
            body: form,
            headers: {
                Authorization: token
            }
        });
        const resData = await res.json();
        if (res.status === 422) throw new Error(Object.values(resData.errors).join('\n'));
        else if (res.status !== 200 && res.status !== 201) throw new Error(resData.error.message);
        dispatch(trimestersSuccess(resData));
    } catch (error) {
        console.log(error);
        dispatch(trimestersFail(error));
    }
};

export const patchTrimesters = (id, data) => async (dispatch, getState) => {
    dispatch(trimestersStart());
    const { role } = getState().auth;

    try {
        const token = localStorage.getItem('token');
        const form = new FormData(data);
        const res = await fetch(`${prefix + role}/trimesters/${id}`, {
            method: 'POST',
            body: form,
            headers: {
                Authorization: token,
            }
        });
        const resData = await res.json();
        if (res.status === 422) throw new Error(Object.values(resData.errors).join('\n'));
        dispatch(trimestersSuccess(resData));
    } catch (error) {
        console.log(error);
        dispatch(trimestersFail(error));
    }
};

export const deleteTrimesters = id => async (dispatch, getState) => {
    dispatch(trimestersStart());
    const { role } = getState().auth;

    try {
        const page = document.getElementById('table-page').value;
        const show = document.getElementById('table-show').value;
        const search = document.getElementById('table-search').value;

        const token = localStorage.getItem('token');
        const res = await fetch(`${prefix + role}/trimesters/${id}?page=${page}&show=${show}&search=${search}`, {
            method: 'DELETE',
            headers: {
                Authorization: token
            }
        });
        const resData = await res.json();
        if (res.status === 422) throw new Error(Object.values(resData.errors).join('\n'));
        dispatch(trimestersSuccess(resData));
    } catch (error) {
        console.log(error);
        dispatch(trimestersFail(error));
    }
};