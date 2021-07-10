// react
import React, { useEffect, useMemo, useRef } from "react";
// third-party
import { FormattedMessage } from "react-intl";
// application
import AccountMenu from "~/components/header/AccountMenu/AccountMenu";
import AppLink from "~/components/shared/AppLink";
import CurrencyFormat from "~/components/shared/CurrencyFormat";
import Departments from "~/components/header/Departments";
import Dropcart from "~/components/header/Dropcart";
import Indicator, { IIndicatorController } from "~/components/header/Indicator";
import Logo from "~/components/header/Logo";
import MainMenu from "~/components/header/MainMenu";
import Search from "~/components/header/Search";
import Topbar from "~/components/header/Topbar";
import url from "~/services/url";
import { Heart32Svg, Person32Svg, Cart32Svg } from "~/svg";
import { useCart } from "~/store/cart/cartHooks";
import { useOptions } from "~/store/options/optionsHooks";
import { useUser } from "~/store/user/userHooks";
import { useWishlist } from "~/store/wishlist/wishlistHooks";
import { useCompare } from "~/store/compare/compareHooks";
import useAuthorizedUser from "~/custom/hooks/useAuthorizedUser";
import AppImage from "../shared/AppImage";
import { useAuthContext } from "~/custom/hooks/useAuthContext";

function Header() {
    const { user } = useAuthContext();
    const wishlist = useWishlist();
    const options = useOptions();
    const desktopLayout = options.desktopHeaderLayout;
    const accountIndicatorCtrl = useRef<IIndicatorController | null>(null);


    return (
        <div className="header">
            <div className="header__megamenu-area megamenu-area" />

            {desktopLayout === "classic" && (
                <React.Fragment>
                    <div className="header__topbar-classic-bg" />
                    <div className="header__topbar-classic">
                        <Topbar layout="classic" />
                    </div>
                </React.Fragment>
            )}

            <div className="header__navbar">
                <div className=" header__navbar-menu">
                    <MainMenu />
                </div>
                {desktopLayout === "classic" && (
                    <div className="header__navbar-phone phone">
                        <AppLink href={url.pageContactUs()} className="phone__body">
                            <div className="phone__title">
                                <FormattedMessage id="TEXT_CALL_US" />
                            </div>
                            <div className="phone__number">+92-3134371392</div>
                        </AppLink>
                    </div>
                )}
            </div>
            <Logo className="header__logo" />
            {/* <div className="header__search">
                <Search />
            </div> */}
            <div className="header__indicators">
                <Indicator href={url.wishlist()} icon={<Heart32Svg />} counter={wishlist.items.length} />

                <Indicator
                    href={url.accountDashboard()}
                    icon={
                        !user ? (
                            <Person32Svg />
                        ) : (
                            <div style={{ width: "30px" }} className="account-menu__user-avatar">
                                <AppImage src={user.avatar} />
                            </div>
                        )
                    }
                    label={user ? user.email : <FormattedMessage id="TEXT_INDICATOR_ACCOUNT_LABEL" />}
                    value={user ? user.fullName : <FormattedMessage id="TEXT_INDICATOR_ACCOUNT_VALUE" />}
                    trigger="click"
                    controllerRef={accountIndicatorCtrl}
                >
                    <AccountMenu onCloseMenu={() => accountIndicatorCtrl.current?.close()} />
                </Indicator>
            </div>
        </div>
    );
}

export default React.memo(Header);
