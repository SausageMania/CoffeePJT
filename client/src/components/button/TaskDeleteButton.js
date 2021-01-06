import React from 'react';
import {useMutation} from '@apollo/react-hooks';
import {TaskRemoveMutation} from "../../graphql/mutation";
import {TaskQuery} from "../../graphql/query";
import {Row} from "simple-flexbox";
import {createUseStyles, useTheme} from "react-jss";

const useStyles = createUseStyles((theme) => ({
    addButton: {
        backgroundColor: theme.color.lightGrayishBlue,
        color: "black",
        fontSize: '20px !important',
        padding: '5px !important',
        marginLeft: "40px"
    },
}));

function TaskDeleteButton(post_id,user_id) {

    const theme = useTheme();
    const classes = useStyles({theme});
    const mutation = TaskRemoveMutation;

    const [deletePostOrMutation, {loading}] = useMutation(mutation, {
            refetchQueries: [{query: TaskQuery}],
            variables: {id: String(Object.values(post_id)),userid: String(Object.values(user_id))},
            onCompleted: (data) => {
                alert("주문이 취소되었습니다.");


            }
        }
    )

    return (
        <>

            <form action="#">
                <Row
                    horizontal='center'
                    vertical='center'
                    className={[classes.addButton].join(' ')}
                    onClick={deletePostOrMutation}
                >
                    -
                </Row>

            </form>

        </>
    );
}


export default TaskDeleteButton;
