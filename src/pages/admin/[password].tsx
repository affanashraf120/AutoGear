import { redirect } from "next/dist/next-server/server/api-utils";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { FormattedMessage } from "react-intl";
import PageTitle from "~/components/shared/PageTitle";
import Redirect from "~/components/shared/Redirect";

const Page = () => {
    const router = useRouter();
    const { password } = router.query;

    const isAuthorized = (password: string | undefined | string[]) => {
        return password === "secret";
    };

    useEffect(() => {
        if (!isAuthorized(password)) {
            router.push("/");
        }
    }, []);

    return (
        <div className="card">
            {/* <PageTitle>Administration Panel</PageTitle> */}

            <div className="card-header">
                <h5>Administration Panel</h5>
            </div>
            <div className="card-divider" />

            <div className="card-body card-body--padding--2">
            <form className="col-12 col-lg-10 col-xl-8" >
                            

                            {/* <div className="form-group mt-3">
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
                            </div> */}
                        </form>
            </div>
        </div>
    );
};

export default Page;
