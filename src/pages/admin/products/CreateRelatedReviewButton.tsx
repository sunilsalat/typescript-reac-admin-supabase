import * as React from 'react';
import { CreateButton, useRecordContext } from 'react-admin';

const CreateRelatedReviewButton = () => {
    const record = useRecordContext();

    return (
        <CreateButton
            resource="reviews"
            state={record ? { record: { entity_id: record.id } } : undefined}
        />
    );
};

export default CreateRelatedReviewButton;
