import React, {useEffect, useState} from 'react';
import {Column, Row} from 'simple-flexbox';
import {createUseStyles} from 'react-jss';
import UserBoard from './UserBoard';
import UserEditTable from "../../components/table/UserEditTable";

const useStyles = createUseStyles({
    cardsContainer: {
        marginRight: -30,
        marginTop: -50
    },
    cardRow: {
        // marginTop: 30,
        '@media (max-width: 768px)': {
            marginTop: 0
        }
    },
    miniCardContainer: {
        flexGrow: 1,
        marginRight: 30,
        '@media (max-width: 768px)': {
            // marginTop: 30,
            maxWidth: 'none'
        }
    },
    todayTrends: {
        marginTop: 0
    },
    // lastRow: {
    //     marginTop: 30
    // },
    unresolvedTickets: {
        marginRight: 30,
        '@media (max-width: 1024px)': {
            marginRight: 0
        }
    },
    tasks: {
        marginTop: 0,
        '@media (max-width: 1024px)': {
            // marginTop: 30
        }
    }
});

function UserboardComponent() {
    const classes = useStyles();


    return (
        <Column>
            <div className={classes.todayTrends}>
                <UserBoard/>
            </div>
        </Column>
    );
}

export default UserboardComponent;
