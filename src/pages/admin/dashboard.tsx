import classNames from "classnames";
import { redirect } from "next/dist/next-server/server/api-utils";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { FormattedMessage, useIntl } from "react-intl";
import PageTitle from "~/components/shared/PageTitle";
import Redirect from "~/components/shared/Redirect";
import axios from "axios";
import AdminAccountLayout from "~/components/account/AdminAccountLayout";
import url from "~/services/url";
import AppImage from "~/components/shared/AppImage";

const Page = () => {
    const intl = useIntl();
    const router = useRouter();
    
    return (
        <div className="dashboard">
            <PageTitle>{intl.formatMessage({ id: 'HEADER_DASHBOARD' })}</PageTitle>

            <div className="dashboard__profile card profile-card">
                <div className="card-body profile-card__body">
                    <div className="profile-card__avatar">
                        <AppImage src={`/images/avatars/avatar.jpeg`} />
                    </div>
                    <div className="profile-card__name">
                        Admin
                    </div>
                    <div className="profile-card__email">{`affanashraf313@gmail.com`}</div>
                </div>
            </div>
        </div>
    );
};

Page.Layout = AdminAccountLayout

export default Page;
