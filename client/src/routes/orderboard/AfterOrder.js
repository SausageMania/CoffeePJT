import React from 'react';
import {Column, Row} from 'simple-flexbox';
import {createUseStyles, useTheme} from 'react-jss';
import BoardTable from '../../components/table/BoardTable';



const useStyles = createUseStyles((theme) => ({
    container: {
        backgroundColor: '#FFFFFF',
        border: `5px solid ${theme.color.darkRed}`,
        borderRadius: 5,
        cursor: 'pointer'
    },
    graphSection: {
        padding: 24
    }
}));

function OrderBoard() {
    const theme = useTheme();
    const classes = useStyles({theme});


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
                <BoardTable/>
            </Column>


        </Row>



    );


}

export default OrderBoard;