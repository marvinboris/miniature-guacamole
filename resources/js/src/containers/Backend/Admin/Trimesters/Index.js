import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect, withRouter } from 'react-router-dom';
import { Row } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEdit, faTrash, faBorderNone, faClock } from '@fortawesome/free-solid-svg-icons';

// Components
import Breadcrumb from '../../../../components/Backend/UI/Breadcrumb/Breadcrumb';
import SpecialTitle from '../../../../components/UI/Titles/SpecialTitle/SpecialTitle';
import Subtitle from '../../../../components/UI/Titles/Subtitle/Subtitle';
import List from '../../../../components/Backend/UI/List/List';
import Error from '../../../../components/Error/Error';
import Feedback from '../../../../components/Feedback/Feedback';
import TitleWrapper from '../../../../components/Backend/UI/TitleWrapper';
import Delete from '../../../../components/Backend/UI/Delete/Delete';

import * as actions from '../../../../store/actions';
import { updateObject, convertDate } from '../../../../shared/utility';

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
                    pages: { components: { list: { action } }, backend: { pages: { trimesters: { title, add, index, form } } } }
                }
            },
            backend: { trimesters: { loading, error, message, trimesters, total } },
        } = this.props;

        const errors = <>
            <Error err={error} />
        </>;
        const feedback = <Feedback message={message} />;

        if (!trimesters) trimesters = [];
        const data = trimesters.map(trimester => {
            return updateObject(trimester, {
                created_at: convertDate(trimester.created_at),
                action: <div className="text-center">
                    <Link to={`/admin/trimesters/${trimester.id}`} className="mr-2">
                        <FontAwesomeIcon icon={faEye} className="text-green" fixedWidth />
                    </Link>
                    <Link to={`/admin/trimesters/${trimester.id}/edit`} className="mr-2">
                        <FontAwesomeIcon icon={faEdit} className="text-brokenblue" fixedWidth />
                    </Link>
                    <span className="mx-1"><Delete deleteAction={() => this.props.delete(trimester.id)}><FontAwesomeIcon icon={faTrash} className="text-red" fixedWidth /></Delete></span>
                </div>,
            });
        });

        const content = (
            <>
                <Row>
                    <List array={data} loading={loading} data={JSON.stringify(trimesters)} get={this.props.get} total={total} bordered add={add} link="/admin/trimesters/add" icon={faClock} title={index} className="shadow-sm"
                        fields={[
                            { name: form.name, key: 'name' },
                            { name: form.year, key: 'year' },
                            { name: form.session, key: 'session' },
                            { name: action, key: 'action' }
                        ]} />
                </Row>
            </>
        );

        return (
            <>
                <TitleWrapper>
                    <Breadcrumb main={index} icon={faClock} />
                    <SpecialTitle user icon={faClock}>{title}</SpecialTitle>
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
    get: (page, show, search) => dispatch(actions.getTrimesters(page, show, search)),
    delete: id => dispatch(actions.deleteTrimesters(id)),
    reset: () => dispatch(actions.resetTrimesters()),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Index));