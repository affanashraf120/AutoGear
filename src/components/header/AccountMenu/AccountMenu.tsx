// react
import React, { useCallback } from "react";
import { useSignInForm } from "~/services/forms/sign-in";
import { useUser } from "~/store/user/userHooks";
import AccountMenuList from "./AccountMenuList";
import AccountMenuLogin from "./AccountMenuLogin";

interface Props {
    onCloseMenu: () => void;
}

function AccountMenu(props: Props) {
    const { onCloseMenu } = props;
    const user = useUser();

    const signInForm = useSignInForm({
        onSuccess: useCallback(() => {
            if (onCloseMenu) {
                onCloseMenu();
            }
        }, [onCloseMenu]),
    });
    
    return (
        <div className="account-menu" onSubmit={signInForm.submit}>
            {user === null && <AccountMenuLogin {...props} />}

            {user !== null && <AccountMenuList user={user} onCloseMenu={onCloseMenu} />}
        </div>
    );
}

export default AccountMenu;
