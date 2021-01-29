import * as actionTypes from '../actionTypes';

const prefix = '/api/';

export const resetSequences = () => ({ type: actionTypes.SEQUENCES_RESET });
const sequencesStart = () => ({ type: actionTypes.SEQUENCES_START });
const sequencesSuccess = data => ({ type: actionTypes.SEQUENCES_SUCCESS, ...data });
const sequencesFail = error => ({ type: actionTypes.SEQUENCES_FAIL, error });
export const getSequences = (page = 1, show = 10, search = '') => async (dispatch, getState) => {
    dispatch(sequencesStart());
    const { role } = getState().auth;

    try {
        const token = localStorage.getItem('token');
        const res = await fetch(`${prefix + role}/sequences?page=${page}&show=${show}&search=${search}`, {
            headers: {
                Authorization: token
            }
        });
        const resData = await res.json();
        dispatch(sequencesSuccess(resData));
    } catch (error) {
        console.log(error);
        dispatch(sequencesFail(error));
    }
};

export const getSequencesInfo = () => async (dispatch, getState) => {
    dispatch(sequencesStart());
    const { role } = getState().auth;

    try {
        const token = localStorage.getItem('token');
        const res = await fetch(`${prefix + role}/sequences/info`, {
            headers: {
                Authorization: token
            }
        });
        const resData = await res.json();
        dispatch(sequencesSuccess(resData));
    } catch (error) {
        console.log(error);
        dispatch(sequencesFail(error));
    }
};

export const getSequence = id => async (dispatch, getState) => {
    dispatch(sequencesStart());
    const { role } = getState().auth;

    try {
        const token = localStorage.getItem('token');
        const res = await fetch(`${prefix + role}/sequences/${id}`, {
            headers: {
                Authorization: token
            }
        });
        const resData = await res.json();
        dispatch(sequencesSuccess(resData));
    } catch (error) {
        console.log(error);
        dispatch(sequencesFail(error));
    }
};

export const postSequences = data => async (dispatch, getState) => {
    dispatch(sequencesStart());
    const { role } = getState().auth;

    try {
        const token = localStorage.getItem('token');
        const form = new FormData(data);
        const res = await fetch(`${prefix + role}/sequences`, {
            method: 'POST',
            body: form,
            headers: {
                Authorization: token
            }
        });
        const resData = await res.json();
        if (res.status === 422) throw new Error(Object.values(resData.errors).join('\n'));
        else if (res.status !== 200 && res.status !== 201) throw new Error(resData.error.message);
        dispatch(sequencesSuccess(resData));
    } catch (error) {
        console.log(error);
        dispatch(sequencesFail(error));
    }
};

export const patchSequences = (id, data) => async (dispatch, getState) => {
    dispatch(sequencesStart());
    const { role } = getState().auth;

    try {
        const token = localStorage.getItem('token');
        const form = new FormData(data);
        const res = await fetch(`${prefix + role}/sequences/${id}`, {
            method: 'POST',
            body: form,
            headers: {
                Authorization: token,
            }
        });
        const resData = await res.json();
        if (res.status === 422) throw new Error(Object.values(resData.errors).join('\n'));
        dispatch(sequencesSuccess(resData));
    } catch (error) {
        console.log(error);
        dispatch(sequencesFail(error));
    }
};

export const deleteSequences = id => async (dispatch, getState) => {
    dispatch(sequencesStart());
    const { role } = getState().auth;

    try {
        const page = document.getElementById('table-page').value;
        const show = document.getElementById('table-show').value;
        const search = document.getElementById('table-search').value;

        const token = localStorage.getItem('token');
        const res = await fetch(`${prefix + role}/sequences/${id}?page=${page}&show=${show}&search=${search}`, {
            method: 'DELETE',
            headers: {
                Authorization: token
            }
        });
        const resData = await res.json();
        if (res.status === 422) throw new Error(Object.values(resData.errors).join('\n'));
        dispatch(sequencesSuccess(resData));
    } catch (error) {
        console.log(error);
        dispatch(sequencesFail(error));
    }
};