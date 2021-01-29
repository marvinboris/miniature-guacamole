import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Col, CustomInput, FormGroup, Row } from 'reactstrap';
import { faCalendar, faCircleNotch, faLayerGroup, faChalkboardTeacher, faSchool, faPercentage } from '@fortawesome/free-solid-svg-icons';
import { faSave } from '@fortawesome/free-regular-svg-icons';

// Components
import Breadcrumb from '../../../../components/Backend/UI/Breadcrumb/Breadcrumb';
import TitleWrapper from '../../../../components/Backend/UI/TitleWrapper';
import SpecialTitle from '../../../../components/UI/Titles/SpecialTitle/SpecialTitle';
import Subtitle from '../../../../components/UI/Titles/Subtitle/Subtitle';
import Error from '../../../../components/Error/Error';
import CustomSpinner from '../../../../components/UI/CustomSpinner/CustomSpinner';
import Form from '../../../../components/Backend/UI/Form/Form';
import FormInput from '../../../../components/Backend/UI/Input/Input';
import FormButton from '../../../../components/UI/Button/BetweenButton/BetweenButton';
import Feedback from '../../../../components/Feedback/Feedback';

import * as actions from '../../../../store/actions';
import { updateObject } from '../../../../shared/utility';

class Add extends Component {
    state = {
        year_id: '',
        cycle_id: '',
        level_id: '',
        classroom_id: '',
        subjects: [],
        students: [],
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps.backend.sessions.session && prevState.year_id === '') {
            const { backend: { sessions: { session } } } = nextProps;
            return updateObject(prevState, { ...session });
        }
        return prevState;
    }

    async componentDidMount() {
        this.props.reset();
        if (this.props.edit) this.props.get(this.props.match.params.id);
        else this.props.info();
    }

    componentWillUnmount() {
        this.props.reset();
    }

    submitHandler = e => {
        e.preventDefault();
        if (this.props.edit) this.props.patch(this.props.match.params.id, e.target);
        else this.props.post(e.target);
    }

    inputChangeHandler = e => {
        const { name, value, files, checked, id } = e.target;
        if (name.includes('subjects')) {
            let subjects = [...this.state.subjects];

            if (name.includes('id')) {
                const [, subject_id] = id.split('-');
                const subject = subjects.find(c => +c.id === +subject_id);

                if (checked && !subject) subjects.push({ id: subject_id, coef: '' });
                else subjects = subjects.filter(c => +c.id !== +subject_id);
            } else if (name.includes('coef')) {
                const [, subject_id] = id.split('-');
                const subjectIndex = subjects.findIndex(c => +c.id === +subject_id);
                console.log({ value, subjects, subject_id, subjectIndex })

                subjects[subjectIndex].coef = value;
            }

            return this.setState({ subjects });
        }
        if (name.includes('students')) {
            let students = [...this.state.students];

            if (name.includes('id')) {
                const [, student_id] = id.split('-');
                const student = students.find(c => +c.id === +student_id);

                if (checked && !student) students.push({
                    id: student_id,
                    // coef: '' 
                });
                else students = students.filter(c => +c.id !== +student_id);
            }
            // else if (name.includes('coef')) {
            //     const [, student_id] = id.split('-');
            //     const studentIndex = students.findIndex(c => +c.id === +student_id);
            //     console.log({ value, students, student_id, studentIndex })

            //     students[studentIndex].coef = value;
            // }

            return this.setState({ students });
        }
        this.setState({ [name]: files ? files[0] : value });
    }

    render() {
        let {
            content: {
                cms: {
                    pages: { components: { form: { save } }, backend: { pages: { sessions: { title, add, edit, index, form } } } }
                }
            },
            backend: { sessions: { loading, error, message, years, cycles, subjects, students } },
        } = this.props;
        let { year_id, cycle_id, level_id, classroom_id, subjects: subs, students: studs } = this.state;
        let content = null;
        let errors = null;

        if (!subjects) subjects = [];

        const subjectsItems = subjects.sort((a, b) => a.name > b.name).map(subject => {
            const element = subs.find(i => +i.id === +subject.id);

            const checked = element !== undefined;

            return <Col lg={4} key={JSON.stringify(subject)}>
                <FormGroup>
                    <CustomInput type="switch" id={`subject-${subject.id}`} className="col-12 pb-2" checked={checked} name={`subjects[${subject.id}][id]`} onChange={this.inputChangeHandler} label={<span className="text-500">{subject.name}</span>} />
                </FormGroup>

                {checked && <FormGroup>
                    <FormInput type="number" id={`subject-${subject.id}-coef`} name={`subjects[${subject.id}][coef]`} icon={faPercentage} onChange={this.inputChangeHandler} value={element.coef} placeholder={form.coef} />
                </FormGroup>}
            </Col>
        });

        if (!students) students = [];

        const studentsItems = students.sort((a, b) => a.name > b.name).map(student => {
            const element = studs.find(i => +i.id === +student.id);

            const checked = element !== undefined;

            return <div key={JSON.stringify(student)}>
                <CustomInput type="switch" id={`student-${student.id}`} className="col-12 pb-2" checked={checked} name={`students[${student.id}][id]`} onChange={this.inputChangeHandler} label={<span className="text-500">{student.name}</span>} />
            </div>
        });

        if (!years) years = [];
        const yearsOptions = years.sort((a, b) => a.name > b.name).map(item => <option key={JSON.stringify(item)} value={item.id}>{item.name}</option>);

        if (!cycles) cycles = [];
        const cyclesOptions = cycles.sort((a, b) => a.name > b.name).map(item => <option key={JSON.stringify(item)} value={item.id}>{item.name}</option>);

        const cycle = cycles.find(cycle => +cycle.id === +cycle_id);
        const levels = cycle ? cycle.levels : [];
        const levelsOptions = levels.sort((a, b) => a.name > b.name).map(item => <option key={JSON.stringify(item)} value={item.id}>{item.name}</option>);

        const level = levels.find(level => +level.id === +level_id);
        const classrooms = level ? level.classrooms : [];
        const classroomsOptions = classrooms.sort((a, b) => a.name > b.name).map(item => <option key={JSON.stringify(item)} value={item.id}>{item.name}</option>);

        if (loading) content = <Col xs={12}>
            <CustomSpinner />
        </Col>;
        else {
            errors = <>
                <Error err={error} />
            </>;
            content = (
                <>
                    <Row>
                        <Form onSubmit={this.submitHandler} icon={faSchool} title={this.props.edit ? edit : add} list={index} link="/admin/sessions" innerClassName="row" className="shadow-sm">
                            <Col lg={8}>
                                <Feedback message={message} />
                                {this.props.edit && <input type="hidden" name="_method" defaultValue="PATCH" />}
                                <Row>
                                    <FormInput className="col-lg-6" type="select" name="year_id" placeholder={form.year} onChange={this.inputChangeHandler} icon={faCalendar} validation={{ required: true }} required value={year_id}>
                                        <option>{form.select_year}</option>
                                        {yearsOptions}
                                    </FormInput>
                                    <FormInput className="col-lg-6" type="select" name="cycle_id" placeholder={form.cycle} onChange={this.inputChangeHandler} icon={faCircleNotch} validation={{ required: true }} required value={cycle_id}>
                                        <option>{form.select_cycle}</option>
                                        {cyclesOptions}
                                    </FormInput>
                                    <FormInput className="col-lg-6" type="select" name="level_id" placeholder={form.level} onChange={this.inputChangeHandler} icon={faLayerGroup} validation={{ required: true }} required value={level_id}>
                                        <option>{form.select_level}</option>
                                        {levelsOptions}
                                    </FormInput>
                                    <FormInput className="col-lg-6" type="select" name="classroom_id" placeholder={form.classroom} onChange={this.inputChangeHandler} icon={faChalkboardTeacher} validation={{ required: true }} required value={classroom_id}>
                                        <option>{form.select_classroom}</option>
                                        {classroomsOptions}
                                    </FormInput>

                                    <Col xs={12} className="pb-2 text-large text-700">{form.subjects}</Col>
                                    <FormGroup className="col-12">
                                        <Row>{subjectsItems}</Row>
                                    </FormGroup>

                                    <Col xs={12} className="pb-2 text-large text-700">{form.students}</Col>
                                    <FormGroup className="col-12">
                                        {studentsItems}
                                    </FormGroup>

                                    <div className="col-12">
                                        <FormButton color="green" icon={faSave}>{save}</FormButton>
                                    </div>
                                </Row>
                            </Col>
                        </Form>
                    </Row>
                </>
            );
        }

        return (
            <>
                <TitleWrapper>
                    <Breadcrumb main={this.props.edit ? edit : add} icon={faSchool} />
                    <SpecialTitle user icon={faSchool}>{title}</SpecialTitle>
                    <Subtitle user>{this.props.edit ? edit : add}</Subtitle>
                </TitleWrapper>
                <div className="p-4 pb-0">
                    {errors}
                    {content}
                </div>
            </>
        );
    }
}

const mapStateToProps = state => ({ ...state });

const mapDispatchToProps = dispatch => ({
    get: id => dispatch(actions.getSession(id)),
    info: () => dispatch(actions.getSessionsInfo()),
    post: data => dispatch(actions.postSessions(data)),
    patch: (id, data) => dispatch(actions.patchSessions(id, data)),
    reset: () => dispatch(actions.resetSessions()),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Add));