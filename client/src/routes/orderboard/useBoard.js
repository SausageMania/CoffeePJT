import {CreateMutation} from "../../graphql/mutation";
import {useMutation} from "@apollo/react-hooks";
import {MeQuery, OrderSearch, Receipt, ReceiptUser} from "../../graphql/query";
import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(5),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
    card: {maxWidth: 345},
    color: {
        brown: "#6d4c41"
    }
}));

export function CreateOrder(hi) {

    const createmutation = CreateMutation;

    const [create] = useMutation(createmutation, {
            refetchQueries: [{query: OrderSearch, variables: {id: localStorage.getItem('myData')}}
                , {query: MeQuery, variables: {userid: localStorage.getItem('myData')}},
                {query: Receipt}, {query: ReceiptUser}],
            variables: {
                id: localStorage.getItem('myData'),
                menu: hi.menu,
                hi: hi.hi
            },
            onCompleted: () => {
            },
            onError: () => {
                alert("메뉴를 선택해주세요.")
            },
        }
    )


    return (
        <>
            <Button
                type='submit'
                color={hi.color}
                onClick={create}>
                {hi.label}
            </Button>
        </>


    )
}

export default CreateOrder;