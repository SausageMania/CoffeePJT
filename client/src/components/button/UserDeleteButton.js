import React from 'react';
import TextField from "@material-ui/core/TextField";
import {UserDelete} from "../../graphql/useMutation";


function DeleteButton(post_id) {

    return (
        <>

            <form action="#">

                <TextField type='submit'
                           onClick={UserDelete(post_id)}
                           value="🗑"/>

            </form>

        </>
    );
}


export default DeleteButton;
