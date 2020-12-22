import React from 'react';
import { createUseStyles, useTheme } from 'react-jss';
import { useHistory } from 'react-router-dom';
import SLUGS from 'resources/links';
import { convertlinksToUrl } from 'resources/utilities';
import LogoComponent from './LogoComponent';
import Menu from './MenuComponent';
import MenuItem from './MenuItemComponent';
import { useLogout } from '../../auth/Logout';
import { useAuthToken } from '../../auth/authToken';
import { useApolloClient } from '@apollo/react-hooks';

const useStyles = createUseStyles({
    separator: {
        borderTop: ({ theme }) => `1px solid ${theme.color.lightGrayishBlue}`,
        marginTop: 16,
        marginBottom: 16,
        opacity: 0.06
    }
});

function SidebarComponent() {
    const { push } = useHistory();
    const theme = useTheme();
    const classes = useStyles({ theme });
    const isMobile = window.innerWidth <= 1080;
    const [, , removeAuthToken] = useAuthToken();
    const apolloClient = useApolloClient();

    async function logout() {
        push(SLUGS.login);
        await apolloClient.clearStore(); // we remove all information in the store
        removeAuthToken(); //we clear the authToken
    }

    function onClick(slug, parameters = {}) {
        push(convertlinksToUrl(slug, parameters));
    }

    return (
        <Menu isMobile={isMobile}>
            <div style={{ paddingTop: 30, paddingBottom: 30 }}>
                <LogoComponent />
            </div>
            <MenuItem
                id={SLUGS.dashboard}
                title='주문자 페이지'
                onClick={() => onClick(SLUGS.dashboard)}
            />

            <MenuItem
                id={SLUGS.tickets}
                title='결제자 페이지'
                onClick={() => onClick(SLUGS.tickets)}
            />

            <div className={classes.separator}></div>
            <MenuItem
                id={SLUGS.settings}
                title='유저 페이지'
                onClick={() => onClick(SLUGS.settings)}
            />

            <MenuItem id='logout' title='로그아웃' onClick={logout} />
        </Menu>
    );
}

export default SidebarComponent;