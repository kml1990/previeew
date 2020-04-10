import React from 'react';
import { Formik, Form, Field } from 'formik';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import Button, { ButtonVariant, ButtonType } from '../common/Button/Button';

import './UrlSearch.scss';
import { useDeviceSettings } from '../device_settings/SettingsContext';

export interface UrlSearch {
    url: string;
}

export interface UrlSearchProps {
    className?: string;
}

export const DEFAULT_SEARCH_URL = 'https://www.wikipedia.org/';

const UrlSearch: React.FC<UrlSearchProps> = ({ className = '' }) => {
    const { url, setUrl } = useDeviceSettings();

    const onSubmit = (values: UrlSearch) => {
        setUrl(values.url);
    };

    return (
        <Formik
            initialValues={{
                url: url || DEFAULT_SEARCH_URL,
            }}
            onSubmit={onSubmit}
        >
            {({ errors, touched }) => (
                <Form className={`UrlSearch ${className}`}>
                    <Field
                        name="url"
                        placeholder="Enter Url"
                        className="UrlSearch__input form-control mr-sm-2"
                    />
                    {errors.url && touched.url && errors.url}
                    <Button
                        text="Search"
                        variant={ButtonVariant.PRIMARY}
                        icon={faSearch}
                        type={ButtonType.SUBMIT}
                        className="UrlSearch__button"
                    />
                </Form>
            )}
        </Formik>
    );
};

export default React.memo(UrlSearch);
