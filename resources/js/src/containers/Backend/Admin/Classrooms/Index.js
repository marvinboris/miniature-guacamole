import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { Row } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEdit, faTrash, faChalkboardTeacher } from '@fortawesome/free-solid-svg-icons';

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
                    pages: { components: { list: { action } }, backend: { pages: { classrooms: { title, add, index, form } } } }
                }
            },
            backend: { classrooms: { loading, error, message, classrooms, total } },
        } = this.props;

        const errors = <>
            <Error err={error} />
        </>;
        const feedback = <Feedback message={message} />;

        if (!classrooms) classrooms = [];
        const data = classrooms.map(classroom => {
            return updateObject(classroom, {
                action: <div className="text-center">
                    <Link to={`/admin/classrooms/${classroom.id}`} className="mr-2">
                        <FontAwesomeIcon icon={faEye} className="text-green" fixedWidth />
                    </Link>
                    <Link to={`/admin/classrooms/${classroom.id}/edit`} className="mx-1">
                        <FontAwesomeIcon icon={faEdit} className="text-blue" fixedWidth />
                    </Link>
                    <span className="mx-1"><Delete deleteAction={() => this.props.delete(classroom.id)}><FontAwesomeIcon icon={faTrash} className="text-red" fixedWidth /></Delete></span>
                </div>,
            });
        });

        const content = (
            <>
                <Row>
                    <List array={data} loading={loading} data={JSON.stringify(classrooms)} get={this.props.get} total={total} bordered add={add} link="/admin/classrooms/add" icon={faChalkboardTeacher} title={index} className="shadow-sm"
                        fields={[
                            { name: form.name, key: 'name' },
                            { name: form.cycle, key: 'cycle' },
                            { name: form.level, key: 'level' },
                            { name: form.slug, key: 'slug' },
                            { name: action, key: 'action' }
                        ]} />
                </Row>
            </>
        );

        return (
            <>
                <TitleWrapper>
                    <Breadcrumb main={index} icon={faChalkboardTeacher} />
                    <SpecialTitle user icon={faChalkboardTeacher}>{title}</SpecialTitle>
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
    get: (page, show, search) => dispatch(actions.getClassrooms(page, show, search)),
    delete: id => dispatch(actions.deleteClassrooms(id)),
    reset: () => dispatch(actions.resetClassrooms()),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Index));