import React, {useEffect, useState} from 'react';
import {Column, Row} from 'simple-flexbox';
import {createUseStyles, useTheme} from 'react-jss';
import {useQuery} from "@apollo/react-hooks";
import {
    AllUserQuery,
    CostQuery,
    CountQuery,
    MeQuery, NotQuery, OrderSearch,
    SearchQuery,
    UserSearchQuery
} from "../../graphql/query";
import PaymentTable from "../../components/table/PaymentTable";
import {OrderConfirmMutation, OrderGiveupMutation} from "../../graphql/mutation";
import {TextField, Tooltip} from "@material-ui/core";
import {useMutation} from '@apollo/react-hooks';
import Button from "@material-ui/core/Button";

const useStyles = createUseStyles((theme) => ({
    container: {
        backgroundColor: '#FFFFFF',
        border: `5px solid ${theme.color.darkRed}`,
        borderRadius: 5,
        cursor: 'pointer'
    },
    graphContainer: {
        marginTop: 24,
        marginLeft: 0,
        marginRight: 0,
        width: '100%'
    },
    graphSection: {
        padding: 24
    },
    graphSubtitle: {
        ...theme.typography.smallSubtitle,
        color: theme.color.grayishBlue2,
        marginTop: 4,
        marginRight: 8
    },
    graphTitle: {
        ...theme.typography.cardTitle,
        color: theme.color.veryDarkGrayishBlue
    },
    legendTitle: {
        ...theme.typography.smallSubtitle,
        fontWeight: '600',
        color: theme.color.grayishBlue2,
        marginLeft: 8
    },
    separator: {
        backgroundColor: theme.color.lightGrayishBlue2,
        width: 1,
        minWidth: 1
    },
    statContainer: {
        borderBottom: `1px solid ${theme.color.lightGrayishBlue2}`,
        padding: '24px 32px 24px 32px',
        height: 'calc(114px - 48px)',
        '&:last-child': {
            border: 'none'
        }
    },
    stats: {
        borderTop: `1px solid ${theme.color.lightGrayishBlue2}`,
        width: '100%',
        marginTop:10,
        marginBottom:20
    },
    statTitle: {
        fontWeight: '600',
        fontSize: 16,
        lineHeight: '22px',
        letterSpacing: '0.3px',
        textAlign: 'center',
        color: theme.color.grayishBlue2,
        whiteSpace: 'nowrap',
        marginBottom: 6
    },
    statValue: {
        ...theme.typography.title,
        textAlign: 'center',
        color: theme.color.veryDarkGrayishBlue
    },
    a: {
        color: "black"
    },
    // text: {
    //     padding:"20 20 20 20"
    // }
}));

function changeBackground(e) {
    e.target.style.background = 'red';
}

function TodayTrendsComponent() {
    const theme = useTheme();
    const classes = useStyles({theme});

    const [money, setMoney] = useState('');
    const {data} = useQuery(CostQuery);
    useEffect(() => {
        if (data) {
            setMoney(data.howmuch);
        }
    }, [data]);

    const [isShown, setIsShown] = useState(false);

    const [order, setOrder] = useState('');
    const [count, setCount] = useState('');
    const {data: na} = useQuery(CountQuery);
    useEffect(() => {
        if (na) {
            setOrder(na.howmany);
        }
    }, [na]);

    console.log(order[3])

    const {data: user} = useQuery(AllUserQuery)


    useEffect(() => {
        if (user) {
            setCount(user.allUsers.length);

        }
    }, [user]);


    const [id, setId] = useState();

    const {data: da} = useQuery(MeQuery);

    useEffect(() => {
        if (da) {
            setId(da.me._id);
        }
    }, [da]);

    const [pa, setPa] = useState();

    const {data: people} = useQuery(NotQuery);

    console.log(people);

    useEffect(() => {
        if (people) {
            setPa(people.includedNothing)
        }
    })

    const mutation = OrderConfirmMutation;

    const [deletePostOrMutation, {loading}] = useMutation(mutation, {
            refetchQueries: [{query: SearchQuery}],
            variables: {creater: id},
            onCompleted: (data) => {
                alert("주문이 초기화되었습니다.")
                localStorage.clear();
                window.location.href = '/';


            },
            onError: () => {
                alert("초기화 권한이 없습니다.")
                window.location.href = '/order';
            },
        }
    )

    function renderLegend(color, title) {
        return (
            <Row vertical='center'>
                <div style={{width: 16, border: '2px solid', borderColor: color}}></div>
                <span className={classes.legendTitle}>{title}</span>
            </Row>
        );
    }

    function renderStat(title, value) {
        return (
            <Column
                flexGrow={1}
                className={classes.statContainer}
                vertical='center'
                horizontal='center'
            >
                <span className={classes.statTitle}>{title}</span>
                <span className={classes.statValue}>{value}</span>
            </Column>
        );
    }


    return (
        <Row
            flexGrow={1}
            className={classes.container}
            horizontal='center'
            breakpoints={{1024: 'column'}}
        >
            <Column
                wrap
                flexGrow={7}
                flexBasis='735px'
                className={classes.graphSection}
                breakpoints={{1024: {width: 'calc(100% - 48px)', flexBasis: 'auto'}}}
            >
                <PaymentTable/>
            </Column>
            <Column className={classes.separator} breakpoints={{1024: {display: 'none'}}}>
                <div/>
            </Column>
            <Column flexGrow={3} flexBasis='342px' breakpoints={{1024: classes.stats}}>
                {renderStat('누적 금액', money)}
                {renderStat('미주문자', <Tooltip title={pa &&
                pa.map((content) => content.username).join(',')} placement="top">
                    <Button variant="contained">{order[3]}</Button>
                </Tooltip>)}

                {renderStat('결제 완료', <TextField type='submit'
                                                onClick={deletePostOrMutation}
                                                disabled={loading}
                                                value='결제 완료'/>)}
            </Column>
        </Row>


    );
}

export default TodayTrendsComponent;