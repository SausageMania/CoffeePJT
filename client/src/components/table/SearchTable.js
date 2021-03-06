import React, {useEffect, useState} from 'react';
import {useQuery} from "@apollo/react-hooks";
import {ME_QUERY, MY_ORDER_QUERY, SEARCH_QUERY} from "../../graphql/query";
import UpdateUserDialog from "../dialog/UpdateUser";
import DeleteUserDialog from "../dialog/DeleteUser";


export default function SearchTable(search) {

    const [result, setResult] = useState();


    const {data: se} = useQuery(SEARCH_QUERY, {
            variables: {
                word: search.search
            },
            refetchQueries: [{query: MY_ORDER_QUERY, variables: {id: localStorage.getItem('myData')}}
                , {query: ME_QUERY, variables: {userid: localStorage.getItem('myData')}}, {
                    query: SEARCH_QUERY, variables: {
                        word: search.search
                    }
                }],
            awaitRefetchQueries: true
        }
        )
    ;


    useEffect(() => {
        if (se) {
            setResult(se.user);

        }
    }, [se]);


    return (
        <>

            <table aria-labelledby="form-dialog-title">


                <thead>
                <tr>
                    <th scope="col">사용자 이름</th>
                    <th scope="col">변경</th>
                    <th scope="col">삭제</th>


                </tr>
                </thead>
                <tbody>

                {result &&
                result.map((content, index) => (


                    <tr key={index} style={{marginBottom: 20}}>
                        <td>{content.username}</td>
                        <td><UpdateUserDialog id={content._id} username={content.username}/></td>
                        <td><DeleteUserDialog id={content._id} username={content.username}/></td>
                    </tr>


                ))}


                </tbody>


            </table>
        </>
    );
}
