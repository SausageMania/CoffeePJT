import React, {useEffect, useState} from 'react';
import './table.css';

function BoardTable() {
    // const [contents, setContents] = useState([]);
    // const [index, setIndex] = useState(1);
    //
    //
    // const {data, loading} = useQuery(FETCH_POSTS_QUERY, {
    //     variables: {
    //         index: index
    //     }
    // });
    //
    //
    // useEffect(() => {
    //     if (data) {
    //         setContents(data.contents);
    //     }
    // }, [data]);
    //
    // if (loading) return <div className="loader"></div>


    return (


        <table>
            <caption>주문자 현황</caption>
            <thead>
            <tr>
                <th scope="col">Account</th>
                <th scope="col">Due Date</th>
                <th scope="col">Amount</th>
                <th scope="col">Period</th>
            </tr>
            </thead>
            <tbody>
            <tr>
                <td data-label="Account">Visa - 3412</td>
                <td data-label="Due Date">04/01/2016</td>
                <td data-label="Amount">$1,190</td>
                <td data-label="Period">03/01/2016 - 03/31/2016</td>
            </tr>
            <tr>
                <td scope="row" data-label="Account">Visa - 6076</td>
                <td data-label="Due Date">03/01/2016</td>
                <td data-label="Amount">$2,443</td>
                <td data-label="Period">02/01/2016 - 02/29/2016</td>
            </tr>
            <tr>
                <td scope="row" data-label="Account">Corporate AMEX</td>
                <td data-label="Due Date">03/01/2016</td>
                <td data-label="Amount">$1,181</td>
                <td data-label="Period">02/01/2016 - 02/29/2016</td>
            </tr>
            <tr>
                <td scope="row" data-label="Acount">Visa - 3412</td>
                <td data-label="Due Date">02/01/2016</td>
                <td data-label="Amount">$842</td>
                <td data-label="Period">01/01/2016 - 01/31/2016</td>
            </tr>
            </tbody>
        </table>

    )
}

export default BoardTable;
