import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Col, Row } from 'reactstrap';
import { faWallet, faCalendar, faParagraph, faBorderNone, faDollarSign, faMoneyCheck, faUser, faMapMarkerAlt, faIdCard, faUserGraduate } from '@fortawesome/free-solid-svg-icons';
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
        first_name: '',
        last_name: '',
        birth_date: '',
        birth_place: '',
        matricule: '',
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps.backend.students.student && prevState.first_name === '') {
            const { backend: { students: { student } } } = nextProps;
            return updateObject(prevState, { ...student });
        }
        return prevState;
    }

    async componentDidMount() {
        this.props.reset();
        if (this.props.edit) this.props.get(this.props.match.params.id);
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
                    pages: { components: { form: { save } }, backend: { pages: { students: { title, add, edit, index, form } } } }
                }
            },
            backend: { students: { loading, error, message, supports } },
        } = this.props;
        let { first_name, last_name, birth_date, birth_place, matricule } = this.state;
        let content = null;
        let errors = null;

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
                        <Form onSubmit={this.submitHandler} icon={faUserGraduate} title={this.props.edit ? edit : add} list={index} link="/admin/students" innerClassName="row" className="shadow-sm">
                            <Col lg={8}>
                                <Feedback message={message} />
                                {this.props.edit && <input type="hidden" name="_method" defaultValue="PATCH" />}
                                <Row>
                                    <FormInput type="text" className="col-md-6" icon={faUser} onChange={this.inputChangeHandler} value={first_name} name="first_name" required placeholder={form.first_name} />
                                    <FormInput type="text" className="col-md-6" icon={faUser} onChange={this.inputChangeHandler} value={last_name} name="last_name" required placeholder={form.last_name} />
                                    <FormInput type="date" className="col-md-6" icon={faCalendar} onChange={this.inputChangeHandler} value={birth_date} name="birth_date" required placeholder={form.birth_date} />
                                    <FormInput type="text" className="col-md-6" icon={faMapMarkerAlt} onChange={this.inputChangeHandler} value={birth_place} name="birth_place" required placeholder={form.birth_place} />
                                    <FormInput type="text" className="col-md-6" icon={faIdCard} onChange={this.inputChangeHandler} value={matricule} name="matricule" required placeholder={form.matricule} />

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
                    <Breadcrumb main={this.props.edit ? edit : add} icon={faUserGraduate} />
                    <SpecialTitle user icon={faUserGraduate}>{title}</SpecialTitle>
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
    get: id => dispatch(actions.getStudent(id)),
    post: data => dispatch(actions.postStudents(data)),
    patch: (id, data) => dispatch(actions.patchStudents(id, data)),
    reset: () => dispatch(actions.resetStudents()),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Add));