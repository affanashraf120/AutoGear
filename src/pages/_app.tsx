// react
import React, { ComponentType, useEffect, useMemo } from "react";
// third-party
import AppBase, { AppContext, AppProps } from "next/app";
import Head from "next/head";
import { NextComponentType, NextPageContext } from "next";
import { useStore } from "react-redux";
// application
import config from "~/config";
import LanguageProvider, { getLanguageInitialProps, ILanguageProviderProps } from "~/services/i18n/provider";
import Layout from "~/components/Layout";
import PageTitle from "~/components/shared/PageTitle";
import { AppDispatch } from "~/store/types";
import { CurrentVehicleGarageProvider } from "~/services/current-vehicle";
import { getLanguageByLocale, getLanguageByPath } from "~/services/i18n/utils";
import { load, save, wrapper } from "~/store/store";
import { optionsSetAll } from "~/store/options/optionsActions";
import { useApplyClientState } from "~/store/client";
import { useLoadUserVehicles } from "~/store/garage/garageHooks";
// styles
import "../scss/index.scss";
import "../scss/style.header-classic-variant-one.scss";
import "../scss/style.mobile-header-variant-one.scss";
import "@fortawesome/fontawesome-free/css/all.min.css";
// firebase
import { FirebaseDatabaseProvider } from "@react-firebase/database";
import firebase from "firebase";
import { firebaseConfig } from "~/api/config";
import { getHostUrl } from "~/services/utils";
import url from "~/services/url";
import { isAuthorized } from "~/utils/user";
import { AuthContext } from "~/custom/AuthContext";
import useAuthorizedUser from "~/custom/hooks/useAuthorizedUser";

interface Props extends AppProps {
    languageInitialProps: ILanguageProviderProps;
    Component: NextComponentType<NextPageContext, any> & {
        Layout: ComponentType;
    };
}

function App(props: Props) {
    const { Component, pageProps, languageInitialProps } = props;
    const store = useStore();
    const applyClientState = useApplyClientState();
    const loadUserVehicles = useLoadUserVehicles();
    const { user, logout, getAuthorizedUser, setAuthorizedUser, isUserExist } = useAuthorizedUser();

    // Loading and saving state on the client side (cart, wishlist, etc.).
    useEffect(() => {
        const state = load();

        applyClientState(state || {});

        if (process.browser) {
            store.subscribe(() => {
                save(store.getState());
            });
        }
    }, [store, applyClientState]);

    // Load user vehicles
    useEffect(() => {
        loadUserVehicles().then();
    }, [loadUserVehicles]);

    // preloader
    useEffect(() => {
        const preloader = document.querySelector(".site-preloader");

        if (!preloader) {
            return;
        }

        setTimeout(() => {
            if (preloader.parentNode) {
                preloader.parentNode.removeChild(preloader);
            }
        }, 100);
    }, []);

    const page = useMemo(() => {
        const PageLayout = Component.Layout || React.Fragment;

        return (
            <Layout>
                <PageLayout>
                    <Component {...pageProps} />
                </PageLayout>
            </Layout>
        );
    }, [Component, pageProps]);

    // noinspection HtmlRequiredTitleElement
    return (
        <LanguageProvider {...languageInitialProps}>
            <CurrentVehicleGarageProvider>
                <PageTitle />

                <Head>
                    <meta name="viewport" content="width=device-width, initial-scale=1" />
                </Head>
                <FirebaseDatabaseProvider firebase={firebase} {...firebaseConfig}>
                    <AuthContext.Provider
                        value={{
                            logout,
                            user,
                            isUserExist,
                            setAuthorizedUser,
                            getAuthorizedUser,
                        }}
                    >
                        {page}
                    </AuthContext.Provider>
                </FirebaseDatabaseProvider>
            </CurrentVehicleGarageProvider>
        </LanguageProvider>
    );
}

App.getInitialProps = async (context: AppContext) => {
    const dispatch = context.ctx.store.dispatch as AppDispatch;

    await dispatch(
        optionsSetAll({
            desktopHeaderVariant: config.desktopHeaderVariant,
            mobileHeaderVariant: config.mobileHeaderVariant,
        })
    );

    let language;

    if (typeof context.ctx.query.lang === "string") {
        language = getLanguageByLocale(context.ctx.query.lang);
    } else {
        language = getLanguageByPath(context.ctx.asPath || context.ctx.pathname);
    }

    //Addition
    const loginBaseUrl = `${getHostUrl()}${url.signIn()}`;
    const loginUrl = url.signIn();
    const userApiUrl = `${getHostUrl()}/api/user`;

    return {
        ...(await AppBase.getInitialProps(context)),
        languageInitialProps: await getLanguageInitialProps(language),
    };
};

const WrappedApp = wrapper.withRedux(App);

// noinspection JSUnusedGlobalSymbols
export default WrappedApp;
