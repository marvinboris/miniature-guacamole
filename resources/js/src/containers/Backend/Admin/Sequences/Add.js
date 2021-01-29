import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Col, Row } from 'reactstrap';
import { faWallet, faCalendar, faParagraph, faBorderNone, faDollarSign, faMoneyCheck, faUser, faMapMarkerAlt, faIdCard, faUserGraduate, faFilm, faSchool, faClock } from '@fortawesome/free-solid-svg-icons';
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
        name: '',
        year_id: '',
        session_id: '',
        trimester_id: '',
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps.backend.sequences.sequence && prevState.name === '') {
            const { backend: { sequences: { sequence } } } = nextProps;
            return updateObject(prevState, { ...sequence });
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
                    pages: { components: { form: { save } }, backend: { pages: { sequences: { title, add, edit, index, form } } } }
                }
            },
            backend: { sequences: { loading, error, message, years } },
        } = this.props;
        let { name, year_id, session_id, trimester_id } = this.state;
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
                        <Form onSubmit={this.submitHandler} icon={faFilm} title={this.props.edit ? edit : add} list={index} link="/admin/sequences" innerClassName="row" className="shadow-sm">
                            <Col lg={8}>
                                <Feedback message={message} />
                                {this.props.edit && <input type="hidden" name="_method" defaultValue="PATCH" />}
                                <Row>
                                    <FormInput type="text" className="col-md-6" icon={faFilm} onChange={this.inputChangeHandler} value={name} name="name" required placeholder={form.name} />
                                    <FormInput className="col-lg-6" type="select" name="year_id" placeholder={form.year} onChange={this.inputChangeHandler} icon={faCalendar} validation={{ required: true }} required value={year_id}>
                                        <option>{form.select_year}</option>
                                        {yearsOptions}
                                    </FormInput>
                                    <FormInput className="col-lg-6" type="select" name="session_id" placeholder={form.session} onChange={this.inputChangeHandler} icon={faSchool} validation={{ required: true }} required value={session_id}>
                                        <option>{form.select_session}</option>
                                        {sessionsOptions}
                                    </FormInput>
                                    <FormInput className="col-lg-6" type="select" name="trimester_id" placeholder={form.trimester} onChange={this.inputChangeHandler} icon={faClock} validation={{ required: true }} required value={trimester_id}>
                                        <option>{form.select_trimester}</option>
                                        {trimestersOptions}
                                    </FormInput>

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
                    <Breadcrumb main={this.props.edit ? edit : add} icon={faFilm} />
                    <SpecialTitle user icon={faFilm}>{title}</SpecialTitle>
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
    get: id => dispatch(actions.getSequence(id)),
    info: () => dispatch(actions.getSequencesInfo()),
    post: data => dispatch(actions.postSequences(data)),
    patch: (id, data) => dispatch(actions.patchSequences(id, data)),
    reset: () => dispatch(actions.resetSequences()),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Add));