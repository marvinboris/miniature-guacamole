import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
    admins: {
        loading: false,
        error: null
    },
    cms: {
        loading: false,
        error: null
    },
    dashboard: {
        loading: false,
        error: null
    },
    features: {
        loading: false,
        error: null
    },
    languages: {
        loading: false,
        error: null
    },
    roles: {
        loading: false,
        error: null
    },
    users: {
        loading: false,
        error: null
    },

    
    cycles: {
        loading: false,
        error: null
    },
    levels: {
        loading: false,
        error: null
    },
    classrooms: {
        loading: false,
        error: null
    },
    years: {
        loading: false,
        error: null
    },
    students: {
        loading: false,
        error: null
    },
    subjects: {
        loading: false,
        error: null
    },
    sessions: {
        loading: false,
        error: null
    },
    trimesters: {
        loading: false,
        error: null
    },
    sequences: {
        loading: false,
        error: null
    },
    exam_types: {
        loading: false,
        error: null
    },
    exams: {
        loading: false,
        error: null
    },
    marks: {
        loading: false,
        error: null
    },
};

const adminsReset = (state, action) => updateObject(state, { admins: initialState.admins });
const adminsStart = (state, action) => updateObject(state, { admins: updateObject(state.admins, { loading: true, message: null }) });
const adminsSuccess = (state, action) => updateObject(state, { admins: updateObject(state.admins, { loading: false, error: null, ...action }) });
const adminsFail = (state, action) => updateObject(state, { admins: updateObject(state.admins, { loading: false, ...action }) });

const cmsReset = (state, action) => updateObject(state, { cms: initialState.cms });
const cmsStart = (state, action) => updateObject(state, { cms: updateObject(state.cms, { loading: true, message: null }) });
const cmsSuccess = (state, action) => updateObject(state, { cms: updateObject(state.cms, { loading: false, error: null, ...action }) });
const cmsFail = (state, action) => updateObject(state, { cms: updateObject(state.cms, { loading: false, ...action }) });

const dashboardReset = (state, action) => updateObject(state, { dashboard: initialState.dashboard });
const dashboardStart = (state, action) => updateObject(state, { dashboard: updateObject(state.dashboard, { loading: true, message: null }) });
const dashboardSuccess = (state, action) => updateObject(state, { dashboard: updateObject(state.dashboard, { loading: false, error: null, ...action }) });
const dashboardFail = (state, action) => updateObject(state, { dashboard: updateObject(state.dashboard, { loading: false, ...action }) });

const featuresReset = (state, action) => updateObject(state, { features: initialState.features });
const featuresStart = (state, action) => updateObject(state, { features: updateObject(state.features, { loading: true, message: null }) });
const featuresSuccess = (state, action) => updateObject(state, { features: updateObject(state.features, { loading: false, error: null, ...action }) });
const featuresFail = (state, action) => updateObject(state, { features: updateObject(state.features, { loading: false, ...action }) });

const languagesReset = (state, action) => updateObject(state, { languages: initialState.languages });
const languagesStart = (state, action) => updateObject(state, { languages: updateObject(state.languages, { loading: true, message: null }) });
const languagesSuccess = (state, action) => updateObject(state, { languages: updateObject(state.languages, { loading: false, error: null, ...action }) });
const languagesFail = (state, action) => updateObject(state, { languages: updateObject(state.languages, { loading: false, ...action }) });

const rolesReset = (state, action) => updateObject(state, { roles: initialState.roles });
const rolesStart = (state, action) => updateObject(state, { roles: updateObject(state.roles, { loading: true, message: null }) });
const rolesSuccess = (state, action) => updateObject(state, { roles: updateObject(state.roles, { loading: false, error: null, ...action }) });
const rolesFail = (state, action) => updateObject(state, { roles: updateObject(state.roles, { loading: false, ...action }) });

const usersReset = (state, action) => updateObject(state, { users: initialState.users });
const usersStart = (state, action) => updateObject(state, { users: updateObject(state.users, { loading: true, message: null }) });
const usersSuccess = (state, action) => updateObject(state, { users: updateObject(state.users, { loading: false, error: null, ...action }) });
const usersFail = (state, action) => updateObject(state, { users: updateObject(state.users, { loading: false, ...action }) });



const cyclesReset = (state, action) => updateObject(state, { cycles: initialState.cycles });
const cyclesStart = (state, action) => updateObject(state, { cycles: updateObject(state.cycles, { loading: true, message: null }) });
const cyclesSuccess = (state, action) => updateObject(state, { cycles: updateObject(state.cycles, { loading: false, error: null, ...action }) });
const cyclesFail = (state, action) => updateObject(state, { cycles: updateObject(state.cycles, { loading: false, ...action }) });

const levelsReset = (state, action) => updateObject(state, { levels: initialState.levels });
const levelsStart = (state, action) => updateObject(state, { levels: updateObject(state.levels, { loading: true, message: null }) });
const levelsSuccess = (state, action) => updateObject(state, { levels: updateObject(state.levels, { loading: false, error: null, ...action }) });
const levelsFail = (state, action) => updateObject(state, { levels: updateObject(state.levels, { loading: false, ...action }) });

const classroomsReset = (state, action) => updateObject(state, { classrooms: initialState.classrooms });
const classroomsStart = (state, action) => updateObject(state, { classrooms: updateObject(state.classrooms, { loading: true, message: null }) });
const classroomsSuccess = (state, action) => updateObject(state, { classrooms: updateObject(state.classrooms, { loading: false, error: null, ...action }) });
const classroomsFail = (state, action) => updateObject(state, { classrooms: updateObject(state.classrooms, { loading: false, ...action }) });

const yearsReset = (state, action) => updateObject(state, { years: initialState.years });
const yearsStart = (state, action) => updateObject(state, { years: updateObject(state.years, { loading: true, message: null }) });
const yearsSuccess = (state, action) => updateObject(state, { years: updateObject(state.years, { loading: false, error: null, ...action }) });
const yearsFail = (state, action) => updateObject(state, { years: updateObject(state.years, { loading: false, ...action }) });

const studentsReset = (state, action) => updateObject(state, { students: initialState.students });
const studentsStart = (state, action) => updateObject(state, { students: updateObject(state.students, { loading: true, message: null }) });
const studentsSuccess = (state, action) => updateObject(state, { students: updateObject(state.students, { loading: false, error: null, ...action }) });
const studentsFail = (state, action) => updateObject(state, { students: updateObject(state.students, { loading: false, ...action }) });

const subjectsReset = (state, action) => updateObject(state, { subjects: initialState.subjects });
const subjectsStart = (state, action) => updateObject(state, { subjects: updateObject(state.subjects, { loading: true, message: null }) });
const subjectsSuccess = (state, action) => updateObject(state, { subjects: updateObject(state.subjects, { loading: false, error: null, ...action }) });
const subjectsFail = (state, action) => updateObject(state, { subjects: updateObject(state.subjects, { loading: false, ...action }) });

const sessionsReset = (state, action) => updateObject(state, { sessions: initialState.sessions });
const sessionsStart = (state, action) => updateObject(state, { sessions: updateObject(state.sessions, { loading: true, message: null }) });
const sessionsSuccess = (state, action) => updateObject(state, { sessions: updateObject(state.sessions, { loading: false, error: null, ...action }) });
const sessionsFail = (state, action) => updateObject(state, { sessions: updateObject(state.sessions, { loading: false, ...action }) });

const trimestersReset = (state, action) => updateObject(state, { trimesters: initialState.trimesters });
const trimestersStart = (state, action) => updateObject(state, { trimesters: updateObject(state.trimesters, { loading: true, message: null }) });
const trimestersSuccess = (state, action) => updateObject(state, { trimesters: updateObject(state.trimesters, { loading: false, error: null, ...action }) });
const trimestersFail = (state, action) => updateObject(state, { trimesters: updateObject(state.trimesters, { loading: false, ...action }) });

const sequencesReset = (state, action) => updateObject(state, { sequences: initialState.sequences });
const sequencesStart = (state, action) => updateObject(state, { sequences: updateObject(state.sequences, { loading: true, message: null }) });
const sequencesSuccess = (state, action) => updateObject(state, { sequences: updateObject(state.sequences, { loading: false, error: null, ...action }) });
const sequencesFail = (state, action) => updateObject(state, { sequences: updateObject(state.sequences, { loading: false, ...action }) });

const examTypesReset = (state, action) => updateObject(state, { exam_types: initialState.exam_types });
const examTypesStart = (state, action) => updateObject(state, { exam_types: updateObject(state.exam_types, { loading: true, message: null }) });
const examTypesSuccess = (state, action) => updateObject(state, { exam_types: updateObject(state.exam_types, { loading: false, error: null, ...action }) });
const examTypesFail = (state, action) => updateObject(state, { exam_types: updateObject(state.exam_types, { loading: false, ...action }) });

const examsReset = (state, action) => updateObject(state, { exams: initialState.exams });
const examsStart = (state, action) => updateObject(state, { exams: updateObject(state.exams, { loading: true, message: null }) });
const examsSuccess = (state, action) => updateObject(state, { exams: updateObject(state.exams, { loading: false, error: null, ...action }) });
const examsFail = (state, action) => updateObject(state, { exams: updateObject(state.exams, { loading: false, ...action }) });

const marksReset = (state, action) => updateObject(state, { marks: initialState.marks });
const marksStart = (state, action) => updateObject(state, { marks: updateObject(state.marks, { loading: true, message: null }) });
const marksSuccess = (state, action) => updateObject(state, { marks: updateObject(state.marks, { loading: false, error: null, ...action }) });
const marksFail = (state, action) => updateObject(state, { marks: updateObject(state.marks, { loading: false, ...action }) });

export default (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ADMINS_RESET: return adminsReset(state, action);
        case actionTypes.ADMINS_START: return adminsStart(state, action);
        case actionTypes.ADMINS_SUCCESS: return adminsSuccess(state, action);
        case actionTypes.ADMINS_FAIL: return adminsFail(state, action);

        case actionTypes.CMS_RESET: return cmsReset(state, action);
        case actionTypes.CMS_START: return cmsStart(state, action);
        case actionTypes.CMS_SUCCESS: return cmsSuccess(state, action);
        case actionTypes.CMS_FAIL: return cmsFail(state, action);

        case actionTypes.DASHBOARD_RESET: return dashboardReset(state, action);
        case actionTypes.DASHBOARD_START: return dashboardStart(state, action);
        case actionTypes.DASHBOARD_SUCCESS: return dashboardSuccess(state, action);
        case actionTypes.DASHBOARD_FAIL: return dashboardFail(state, action);

        case actionTypes.FEATURES_RESET: return featuresReset(state, action);
        case actionTypes.FEATURES_START: return featuresStart(state, action);
        case actionTypes.FEATURES_SUCCESS: return featuresSuccess(state, action);
        case actionTypes.FEATURES_FAIL: return featuresFail(state, action);

        case actionTypes.LANGUAGES_RESET: return languagesReset(state, action);
        case actionTypes.LANGUAGES_START: return languagesStart(state, action);
        case actionTypes.LANGUAGES_SUCCESS: return languagesSuccess(state, action);
        case actionTypes.LANGUAGES_FAIL: return languagesFail(state, action);

        case actionTypes.ROLES_RESET: return rolesReset(state, action);
        case actionTypes.ROLES_START: return rolesStart(state, action);
        case actionTypes.ROLES_SUCCESS: return rolesSuccess(state, action);
        case actionTypes.ROLES_FAIL: return rolesFail(state, action);

        case actionTypes.USERS_RESET: return usersReset(state, action);
        case actionTypes.USERS_START: return usersStart(state, action);
        case actionTypes.USERS_SUCCESS: return usersSuccess(state, action);
        case actionTypes.USERS_FAIL: return usersFail(state, action);

        

        case actionTypes.CYCLES_RESET: return cyclesReset(state, action);
        case actionTypes.CYCLES_START: return cyclesStart(state, action);
        case actionTypes.CYCLES_SUCCESS: return cyclesSuccess(state, action);
        case actionTypes.CYCLES_FAIL: return cyclesFail(state, action);

        case actionTypes.LEVELS_RESET: return levelsReset(state, action);
        case actionTypes.LEVELS_START: return levelsStart(state, action);
        case actionTypes.LEVELS_SUCCESS: return levelsSuccess(state, action);
        case actionTypes.LEVELS_FAIL: return levelsFail(state, action);

        case actionTypes.CLASSROOMS_RESET: return classroomsReset(state, action);
        case actionTypes.CLASSROOMS_START: return classroomsStart(state, action);
        case actionTypes.CLASSROOMS_SUCCESS: return classroomsSuccess(state, action);
        case actionTypes.CLASSROOMS_FAIL: return classroomsFail(state, action);

        case actionTypes.YEARS_RESET: return yearsReset(state, action);
        case actionTypes.YEARS_START: return yearsStart(state, action);
        case actionTypes.YEARS_SUCCESS: return yearsSuccess(state, action);
        case actionTypes.YEARS_FAIL: return yearsFail(state, action);

        case actionTypes.STUDENTS_RESET: return studentsReset(state, action);
        case actionTypes.STUDENTS_START: return studentsStart(state, action);
        case actionTypes.STUDENTS_SUCCESS: return studentsSuccess(state, action);
        case actionTypes.STUDENTS_FAIL: return studentsFail(state, action);

        case actionTypes.SUBJECTS_RESET: return subjectsReset(state, action);
        case actionTypes.SUBJECTS_START: return subjectsStart(state, action);
        case actionTypes.SUBJECTS_SUCCESS: return subjectsSuccess(state, action);
        case actionTypes.SUBJECTS_FAIL: return subjectsFail(state, action);

        case actionTypes.SESSIONS_RESET: return sessionsReset(state, action);
        case actionTypes.SESSIONS_START: return sessionsStart(state, action);
        case actionTypes.SESSIONS_SUCCESS: return sessionsSuccess(state, action);
        case actionTypes.SESSIONS_FAIL: return sessionsFail(state, action);

        case actionTypes.TRIMESTERS_RESET: return trimestersReset(state, action);
        case actionTypes.TRIMESTERS_START: return trimestersStart(state, action);
        case actionTypes.TRIMESTERS_SUCCESS: return trimestersSuccess(state, action);
        case actionTypes.TRIMESTERS_FAIL: return trimestersFail(state, action);

        case actionTypes.SEQUENCES_RESET: return sequencesReset(state, action);
        case actionTypes.SEQUENCES_START: return sequencesStart(state, action);
        case actionTypes.SEQUENCES_SUCCESS: return sequencesSuccess(state, action);
        case actionTypes.SEQUENCES_FAIL: return sequencesFail(state, action);

        case actionTypes.EXAM_TYPES_RESET: return examTypesReset(state, action);
        case actionTypes.EXAM_TYPES_START: return examTypesStart(state, action);
        case actionTypes.EXAM_TYPES_SUCCESS: return examTypesSuccess(state, action);
        case actionTypes.EXAM_TYPES_FAIL: return examTypesFail(state, action);

        case actionTypes.EXAMS_RESET: return examsReset(state, action);
        case actionTypes.EXAMS_START: return examsStart(state, action);
        case actionTypes.EXAMS_SUCCESS: return examsSuccess(state, action);
        case actionTypes.EXAMS_FAIL: return examsFail(state, action);

        case actionTypes.MARKS_RESET: return marksReset(state, action);
        case actionTypes.MARKS_START: return marksStart(state, action);
        case actionTypes.MARKS_SUCCESS: return marksSuccess(state, action);
        case actionTypes.MARKS_FAIL: return marksFail(state, action);

        default: return state;
    }
};