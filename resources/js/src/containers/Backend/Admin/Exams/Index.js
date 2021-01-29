import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { Row } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEdit, faTrash, faSchool } from '@fortawesome/free-solid-svg-icons';

// Components
import Breadcrumb from '../../../../components/Backend/UI/Breadcrumb/Breadcrumb';
import TitleWrapper from '../../../../components/Backend/UI/TitleWrapper';
import SpecialTitle from '../../../../components/UI/Titles/SpecialTitle/SpecialTitle';
import Subtitle from '../../../../components/UI/Titles/Subtitle/Subtitle';
import List from '../../../../components/Backend/UI/List/List';
import Error from '../../../../components/Error/Error';
import Feedback from '../../../../components/Feedback/Feedback';
import Delete from '../../../../components/Backend/UI/Delete/Delete';

import * as actions from '../../../../store/actions';
import { updateObject } from '../../../../shared/utility';

class Index extends Component {
    componentDidMount() {
        this.props.get();
    }

    componentWillUnmount() {
        this.props.reset();
    }

    render() {
        let {
            content: {
                cms: {
                    pages: { components: { list: { action } }, backend: { pages: { exams: { title, add, index, form } } } }
                }
            },
            backend: { exams: { loading, error, message, exams, total } },
        } = this.props;

        const errors = <>
            <Error err={error} />
        </>;
        const feedback = <Feedback message={message} />;

        if (!exams) exams = [];
        const data = exams.map(exam => {
            return updateObject(exam, {
                action: <div className="text-center">
                    <Link to={`/admin/exams/${exam.id}`} className="mr-2">
                        <FontAwesomeIcon icon={faEye} className="text-green" fixedWidth />
                    </Link>
                    <Link to={`/admin/exams/${exam.id}/edit`} className="mx-1">
                        <FontAwesomeIcon icon={faEdit} className="text-blue" fixedWidth />
                    </Link>
                    <span className="mx-1"><Delete deleteAction={() => this.props.delete(exam.id)}><FontAwesomeIcon icon={faTrash} className="text-red" fixedWidth /></Delete></span>
                </div>,
            });
        });

        const content = (
            <>
                <Row>
                    <List array={data} loading={loading} data={JSON.stringify(exams)} get={this.props.get} total={total} bordered add={add} link="/admin/exams/add" icon={faSchool} title={index} className="shadow-sm"
                        fields={[
                            { name: form.exam_type, key: 'exam_type' },
                            { name: form.year, key: 'year' },
                            { name: form.session, key: 'session' },
                            { name: form.trimester, key: 'trimester' },
                            { name: form.sequence, key: 'sequence' },
                            { name: form.coef, key: 'coef' },
                            { name: action, key: 'action' }
                        ]} />
                </Row>
            </>
        );

        return (
            <>
                <TitleWrapper>
                    <Breadcrumb main={index} icon={faSchool} />
                    <SpecialTitle user icon={faSchool}>{title}</SpecialTitle>
                    <Subtitle user>{index}</Subtitle>
                </TitleWrapper>
                <div className="p-4 pb-0">
                    {errors}
                    {feedback}
                    {content}
                </div>
            </>
        );
    }
}

const mapStateToProps = state => ({ ...state });

const mapDispatchToProps = dispatch => ({
    get: (page, show, search) => dispatch(actions.getExams(page, show, search)),
    delete: id => dispatch(actions.deleteExams(id)),
    reset: () => dispatch(actions.resetExams()),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Index));