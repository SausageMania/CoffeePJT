import React, {useEffect, useState} from 'react';
import {meGQL, loginMutationGQL} from './mutation';
import {useMutation} from '@apollo/react-hooks';
import {useAuthToken} from './authToken';
import {createUseStyles, useTheme} from "react-jss";
import {useQuery} from "@apollo/react-hooks";
import {TaskQuery} from "../../graphql/query";

const useStyles = createUseStyles((theme) => ({

        loginwrap: {
            paddingTop: "50px",
            width: "100%",
            margin: "auto",
            maxWidth: "525px",
            minHeight: "670px",
            position: "relative",
            boxShadow: "0 12px 15px 0 rgba(0, 0, 0, 0.24),0 17px 50px 0 rgba(0,0,0,.19)"
        },
        loginhtml: {
            width: "100%",
            height: "100%",
            position: "center",
            padding: "90px 70px 50px 70px",
            background: "rgb(95, 59, 59)"

        },

        h3: {
            color: "white",
            marginBottom: "30px",
            textAlign: "center"
        },
        h5: {
            color: "white",
            marginBottom: "30px",
            fontWeight: "lighter",
            textAlign: "center"
        },
        loginform: {
            minHeight: "345px",
            position: "relative",
            perspective: "1000px",
            transformStyle: "preserve-3d"

        },

        group: {
            marginBottom: "15px",
            '&:nth-child(n) > label,input,button,a': {
                width: "100%",
                color: "#fff",
                display: "block",
                margin: "10px 10px"
            },
            '&:nth-child(n) > input,button,a': {
                border: "none",
                padding: "15px 20px",
                borderRadius: "25px",
                background: "rgba(255,255,255,.1)"
            },
            '&:nth-child(n) > lbutton': {
                marginTop: "50px",
                border: "none",
                padding: "50px 50px",
                borderRadius: "25px",
                background: "rgba(255,255,255,.1)",
                width: "100%",
                color: "#fff",
                display: "block"
            },
            '&:nth-child(n) > label ': {
                color: "#aaa",
                fontSize: "12px"
            }
        },


    }))
;


const AuthenticationForm = () => {

    const theme = useTheme();
    const classes = useStyles({theme});
    const [login, setLogin] = useState('');
    const {task} = useQuery(TaskQuery);
    //
    // useEffect(() => {
    //     if (task) {
    //         setLogin(task.tasks);
    //     }
    //     if(error){
    //         alert("로그인에 실패했습니다.");
    //     }
    // }, [task]);
    //
    //
    // console.log(login)

    return (


        <div className={classes.loginwrap}>
            <div className={classes.loginhtml}>

                <h3>현재 OOO님의 주문이 진행 중입니다.</h3><h5>아래에서 이름을 입력하세요!</h5>
                <div className={classes.loginform}>
                    <div className={classes.group}>
                        <label>이름</label>
                        <input type='text' placeholder='이름을 입력하세요.'
                        />

                        <div className={classes.group}>
                            <input type='submit'
                                // onClick={log}
                                // unable={loading}
                                   value='Login'
                            />;
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default AuthenticationForm;