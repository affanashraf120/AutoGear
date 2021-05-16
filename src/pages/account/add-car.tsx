// react
import React, { useEffect, useState } from 'react';
// third-party
import classNames from 'classnames';
import { FormattedMessage, useIntl } from 'react-intl';
import { FormProvider, useForm } from 'react-hook-form';
// application
import AccountLayout from '~/components/account/AccountLayout';
import AddressForm, { getAddressFormDefaultValue, IAddressForm } from '~/components/shared/AddressForm';
import Checkbox from '~/components/shared/Checkbox';
import PageTitle from '~/components/shared/PageTitle';
import url from '~/services/url';
import { accountApi } from '~/api';
import { IAddress } from '~/interfaces/address';
import { IEditAddressData } from '~/api/base';
import { useAppRouter } from '~/services/router';
import { useAsyncAction } from '~/store/hooks';
import CustomProductForm from '~/components/shared/CustomProductForm';
import VehicleSelect from '~/components/shared/VehicleSelect';

const Page = () => {
    return (
        <div className="card">
            <PageTitle>
                Add New Car
            </PageTitle>

            <div className="card-header">
                <h5>
                    Add Car
                </h5>
            </div>
            <div className="card-divider" />

            <div className="card-body card-body--padding--2">
                <div className="row no-gutters">
                    <VehicleSelect/>
                        {/* <form className="col-12 col-lg-10 col-xl-8" onSubmit={handleSubmit(submit)}>
                            <AddressForm
                                namespace="address"
                                idPrefix="address"
                            />

                            <div className="form-group mt-3">
                                <div className="form-check">
                                    <Checkbox
                                        id="address-form-id-default"
                                        name="default"
                                        className="form-check-input"
                                        disabled={firstOrDefaultAddress}
                                        inputRef={register()}
                                    />
                                    <label htmlFor="address-form-id-default" className="form-check-label">
                                        <FormattedMessage id="INPUT_SET_AS_MY_DEFAULT_ADDRESS_LABEL" />
                                    </label>
                                </div>
                            </div>

                            <div className="form-group mb-0 pt-3 mt-3">
                                <button
                                    type="submit"
                                    className={classNames('btn', 'btn-primary', {
                                        'btn-loading': submitInProgress,
                                    })}
                                >
                                    <FormattedMessage id="BUTTON_SAVE" />
                                </button>
                            </div>
                        </form> */}
                </div>
            </div>



        </div>
    );
};

Page.Layout = AccountLayout;


export default Page;
