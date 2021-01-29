import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect, withRouter } from 'react-router-dom';
import { Col, Row } from 'reactstrap';
import { faCircleNotch, faLayerGroup } from '@fortawesome/free-solid-svg-icons';
import { faSave } from '@fortawesome/free-regular-svg-icons';

// Components
import Breadcrumb from '../../../../components/Backend/UI/Breadcrumb/Breadcrumb';
import SpecialTitle from '../../../../components/UI/Titles/SpecialTitle/SpecialTitle';
import Subtitle from '../../../../components/UI/Titles/Subtitle/Subtitle';
import Error from '../../../../components/Error/Error';
import CustomSpinner from '../../../../components/UI/CustomSpinner/CustomSpinner';
import Form from '../../../../components/Backend/UI/Form/Form';
import FormInput from '../../../../components/Backend/UI/Input/Input';
import FormButton from '../../../../components/UI/Button/BetweenButton/BetweenButton';
import TitleWrapper from '../../../../components/Backend/UI/TitleWrapper';
import Feedback from '../../../../components/Feedback/Feedback';

import * as actions from '../../../../store/actions';
import { updateObject } from '../../../../shared/utility';

class Add extends Component {
    state = {
        name: '',
        cycle_id: '',
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps.backend.levels.level && prevState.name === '') {
            const { backend: { levels: { level } } } = nextProps;
            return updateObject(prevState, { ...level });
        }
        return prevState;
    }

    componentDidMount() {
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
                    pages: { components: { form: { save } }, backend: { pages: { levels: { title, add, edit, index, form } } } }
                }
            },
            backend: { levels: { loading, error, message, cycles } },
        } = this.props;
        let { name, cycle_id } = this.state;
        let content;
        let errors = null;

        if (!cycles) cycles = [];
        const cyclesOptions = cycles.sort((a, b) => a.name > b.name).map(item => <option key={JSON.stringify(item)} value={item.id}>{item.name}</option>);

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
                        <Form onSubmit={this.submitHandler} icon={faLayerGroup} title={this.props.edit ? edit : add} list={index} link="/admin/levels" innerClassName="row" className="shadow-sm">
                            <Col lg={8}>
                                <Feedback message={message} />
                                <Row>
                                    {this.props.edit && <input type="hidden" name="_method" defaultValue="PATCH" />}

                                    <FormInput type="text" className="col-md-6" icon={faLayerGroup} onChange={this.inputChangeHandler} value={name} name="name" required placeholder={form.name} />
                                    <FormInput className="col-lg-6" type="select" name="cycle_id" placeholder={form.cycle} onChange={this.inputChangeHandler} icon={faCircleNotch} validation={{ required: true }} required value={cycle_id}>
                                        <option>{form.select_cycle}</option>
                                        {cyclesOptions}
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
                    <Breadcrumb items={this.props.edit && [{ to: '/admin/levels', content: index }]} main={this.props.edit ? edit : add} icon={faLayerGroup} />
                    <SpecialTitle user icon={faLayerGroup}>{title}</SpecialTitle>
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
    get: id => dispatch(actions.getLevel(id)),
    info: () => dispatch(actions.getLevelsInfo()),
    post: data => dispatch(actions.postLevels(data)),
    patch: (id, data) => dispatch(actions.patchLevels(id, data)),
    reset: () => dispatch(actions.resetLevels()),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Add));