import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Col, Row } from 'reactstrap';
import { faCalendar, faSchool, faClock, faFilm, faCopy, faParagraph, faMarker, faUserGraduate } from '@fortawesome/free-solid-svg-icons';
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
        student_id: '',
        year_id: '',
        session_id: '',
        trimester_id: '',
        sequence_id: '',
        exam_id: '',
        value: '',
        comment: '',
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps.backend.marks.mark && prevState.student_id === '') {
            const { backend: { marks: { mark } } } = nextProps;
            return updateObject(prevState, { ...mark });
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
        const { name, value, files } = e.target;
        this.setState({ [name]: files ? files[0] : value });
    }

    render() {
        let {
            content: {
                cms: {
                    pages: { components: { form: { save } }, backend: { pages: { marks: { title, add, edit, index, form } } } }
                }
            },
            backend: { marks: { loading, error, message, years } },
        } = this.props;
        let { student_id, year_id, session_id, trimester_id, sequence_id, exam_id, value, comment } = this.state;
        let content = null;
        let errors = null;

        if (!years) years = [];
        const yearsOptions = years.sort((a, b) => a.name > b.name).map(item => <option key={JSON.stringify(item)} value={item.id}>{item.name}</option>);

        const year = years.find(year => +year.id === +year_id);
        const sessions = year ? year.sessions : [];
        const sessionsOptions = sessions.sort((a, b) => a.name > b.name).map(item => <option key={JSON.stringify(item)} value={item.id}>{item.name}</option>);

        const session = sessions.find(session => +session.id === +session_id);
        const trimesters = session ? session.trimesters : [];
        const trimestersOptions = trimesters.sort((a, b) => a.name > b.name).map(item => <option key={JSON.stringify(item)} value={item.id}>{item.name}</option>);
        const students = session ? session.students : [];
        const studentsOptions = students.sort((a, b) => a.name > b.name).map(item => <option key={JSON.stringify(item)} value={item.id}>{item.name}</option>);

        const trimester = trimesters.find(trimester => +trimester.id === +trimester_id);
        const sequences = trimester ? trimester.sequences : [];
        const sequencesOptions = sequences.sort((a, b) => a.name > b.name).map(item => <option key={JSON.stringify(item)} value={item.id}>{item.name}</option>);

        const sequence = sequences.find(sequence => +sequence.id === +sequence_id);
        const exams = sequence ? sequence.exams : [];
        const examsOptions = exams.sort((a, b) => a.name > b.name).map(item => <option key={JSON.stringify(item)} value={item.id}>{item.name}</option>);

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
                        <Form onSubmit={this.submitHandler} icon={faMarker} title={this.props.edit ? edit : add} list={index} link="/admin/marks" innerClassName="row" className="shadow-sm">
                            <Col lg={8}>
                                <Feedback message={message} />
                                {this.props.edit && <input type="hidden" name="_method" defaultValue="PATCH" />}
                                <Row>
                                    <FormInput className="col-lg-6" type="select" name="year_id" placeholder={form.year} onChange={this.inputChangeHandler} icon={faCalendar} validation={{ required: true }} required value={year_id}>
                                        <option>{form.select_year}</option>
                                        {yearsOptions}
                                    </FormInput>
                                    <FormInput className="col-lg-6" type="select" name="session_id" placeholder={form.session} onChange={this.inputChangeHandler} icon={faSchool} validation={{ required: true }} required value={session_id}>
                                        <option>{form.select_session}</option>
                                        {sessionsOptions}
                                    </FormInput>
                                    <FormInput className="col-lg-6" type="select" name="student_id" placeholder={form.student} onChange={this.inputChangeHandler} icon={faUserGraduate} validation={{ required: true }} required value={student_id}>
                                        <option>{form.select_student}</option>
                                        {studentsOptions}
                                    </FormInput>
                                    <FormInput className="col-lg-6" type="select" name="trimester_id" placeholder={form.trimester} onChange={this.inputChangeHandler} icon={faClock} validation={{ required: true }} required value={trimester_id}>
                                        <option>{form.select_trimester}</option>
                                        {trimestersOptions}
                                    </FormInput>
                                    <FormInput className="col-lg-6" type="select" name="sequence_id" placeholder={form.sequence} onChange={this.inputChangeHandler} icon={faFilm} validation={{ required: true }} required value={sequence_id}>
                                        <option>{form.select_sequence}</option>
                                        {sequencesOptions}
                                    </FormInput>
                                    <FormInput className="col-lg-6" type="select" name="exam_id" placeholder={form.exam} onChange={this.inputChangeHandler} icon={faCopy} validation={{ required: true }} required value={exam_id}>
                                        <option>{form.select_exam}</option>
                                        {examsOptions}
                                    </FormInput>
                                    <FormInput type="number" className="col-md-6" icon={faMarker} onChange={this.inputChangeHandler} value={value} name="value" required placeholder={form.value} />
                                    <FormInput type="textarea" className="col-md-6" icon={faParagraph} onChange={this.inputChangeHandler} value={comment} name="comment" required placeholder={form.comment} />

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
                    <Breadcrumb main={this.props.edit ? edit : add} icon={faMarker} />
                    <SpecialTitle user icon={faMarker}>{title}</SpecialTitle>
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
    get: id => dispatch(actions.getMark(id)),
    info: () => dispatch(actions.getMarksInfo()),
    post: data => dispatch(actions.postMarks(data)),
    patch: (id, data) => dispatch(actions.patchMarks(id, data)),
    reset: () => dispatch(actions.resetMarks()),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Add));