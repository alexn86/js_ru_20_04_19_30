import React from 'react';
import propTypes from 'prop-types';
import CommentPagination from '../components/CommentsPagination'

function CommentsPage({ match }) {
    return (
        <CommentPagination page={match.params.page} />
    );
}

CommentsPage.propTypes = {
    match: propTypes.object.isRequired
};

export default CommentsPage;
    
