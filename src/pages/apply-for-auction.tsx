import React, { useEffect } from "react";
import { useState } from "react";
import { FormattedMessage } from "react-intl";
import BlockSpace from "~/components/blocks/BlockSpace";
import PageTitle from "~/components/shared/PageTitle";
import FormLayout from "~/custom/components/FormLayout";
import Loader from "~/custom/components/Loader";
import { useAuthContext } from "~/custom/hooks/useAuthContext";
import useAuthorizedUser from "~/custom/hooks/useAuthorizedUser";
import { useAppRouter } from "~/services/router";
import url from "~/services/url";
import Cards from "react-credit-cards";
import "react-credit-cards/es/styles-compiled.css";

const Page = () => {
    const { getAuthorizedUser } = useAuthContext();
    const [loading, setLoading] = useState(true);
    const history = useAppRouter();
    useEffect(() => {
        if (!getAuthorizedUser()) history.push(url.signIn());
        else setLoading(false);
    }, []);

    return loading ? (
        <Loader />
    ) : (
        <React.Fragment>
            <PageTitle>Apply for auction</PageTitle>
            <BlockSpace layout="after-header" />
            <Cards />
            <BlockSpace layout="before-footer" />
        </React.Fragment>
    );
};

export default Page;
