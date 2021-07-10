import fetch from "isomorphic-unfetch";
import { NextPageContext } from "next";
import Router from "next/router";

export async function isAuthorized(url: string, loginBaseUrl: string, loginUrl: string, ctx: NextPageContext) {
    const cookie = ctx.req?.headers.cookie;

    const resp = await fetch(url, {
        headers: {
            cookie: cookie!,
        },
    });

    if (resp.status === 401 && !ctx.req) {
        Router.replace(loginUrl);
        return {};
    }

    if (resp.status === 401 && ctx.req) {
        ctx.res?.writeHead(302, {
            Location: loginBaseUrl,
        });
        ctx.res?.end();
        return;
    }

    const json = await resp.json();
    return json;
}
