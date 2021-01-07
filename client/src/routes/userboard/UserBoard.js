import React, {useEffect, useState} from 'react';
import {Row} from 'simple-flexbox';
import {createUseStyles, useTheme} from 'react-jss';
import CardComponent from 'components/cards/CardComponent';
import {useMutation, useQuery} from "@apollo/react-hooks";
import {TaskQuery, UserSearchQuery} from "../../graphql/query";
import {CreateUserMutation, TaskCreateMutation} from "../../graphql/mutation";
import TaskDeleteButton from "../../components/button/TaskDeleteButton";
import PaymentTable from "../../components/table/PaymentTable";
import {IconCheckboxOff, IconCheckboxOn} from "../../components/icons";
import PaymentBoard from "../paymentboard/PaymentBoard";
import VacationBoard from "../firstpage/VacationBoard";
import BoardTable from "../../components/table/BoardTable";

const useStyles = createUseStyles((theme) => ({
    root: {marginTop: "30px"},

    addButton: {
        backgroundColor: theme.color.darkRed,
        color: theme.color.grayishBlue2,
        fontSize: '20px !important',
        padding: '7px !important',
        width: "fit-content"
    },
    itemTitle: {
        ...theme.typography.itemTitle,
        color: theme.color.veryDarkGrayishBlue,
        width: "50%"
    },
    itemValue: {
        color: theme.color.grayishBlue2,
        width: "50%"
    },
    greyTitle: {
        color: theme.color.grayishBlue3
    },
    checkboxWrapper: {
        cursor: 'pointer',
        marginRight: 16
    },
    input: {
        color: theme.color.black,
        display: "block",
        width: "200%",
        padding: "10px 0 10px 50px",
        fontSize: '15px !important',
        fontFamily: "Open Sans",
        fontWeight: "600",
        border: "0",
        borderRadius: "3px",
        outline: 0,
        textIndent: "70px",
        transition: "all .3s ease-in-out",
        margin: "0px auto",
        alignItems: "center",
        justifyContent: "center",
        LeftMargin: "30px",
        alignSelf: "center"
    }

}));

function Create(props) {
    const theme = useTheme();
    const classes = useStyles({theme});
    const [items, setItems] = useState([{title: '(예시) 오후 1시 커피- OOO 책임', checked: false}]);
    const [title, setTitle] = useState();
    const [contents, setContents] = useState();


    const {data} = useQuery(TaskQuery);

    useEffect(() => {
        if (data) {
            setContents(data.tasks);
        }
    })


    const [create, {loading}] = useMutation(CreateUserMutation, {
            refetchQueries: [{query: UserSearchQuery}],
            variables: {
                username:title
            },
            onCompleted: (data) => {

            },

            onError: () => {
                alert("유저 이름을 작성해주세요.")
            },
        }
    )

    function onCheckboxClick(index) {
        setItems((prev) => {
            const newItems = [...prev];
            newItems[index].checked = newItems[index].checked ? false : true;
            return newItems;
        });
    }


    function renderAddButton() {
        return (
            <Row
                horizontal='center'
                vertical='center'
                className={[classes.addButton].join(' ')}
                onClick={create}
            >
                +
            </Row>
        );
    }

    return (
        <CardComponent
            containerStyles={props.containerStyles}
            className={classes.root}
            // title='📋 유저를 추가해주세요 📋'
            // subtitle='(예시) 👏오늘은 OOO님이 @@ 기념으로 커피 쏩니다!👏'

            items={[


                <Row horizontal='space-between' vertical='center'>

                    <span className={[classes.itemTitle, classes.greyTitle].join(' ')}>
                        <input type="text" placeholder="유저를 추가해주세요" onChange={e => setTitle(e.target.value)}
                               className={classes.input}/>
                    </span>
                    {renderAddButton()}
                </Row>,
                <Row>
                    <Row horizontal='space-between' vertical='center'>
                        <Row>
                            <BoardTable/>

                        </Row>
                    </Row>
                </Row>


            ]}
        />

    );
}


export default Create;