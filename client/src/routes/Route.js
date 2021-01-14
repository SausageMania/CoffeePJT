import React, {Suspense, lazy} from 'react';
import {Redirect, Route, Switch} from 'react-router-dom';
import LINKS from 'resources/links';
import LoadingComponent from 'components/loading';
import PaymentboardComponent from "./paymentboard";
import UserboardComponent from "./userboard";
import basicLogin from "./firstpage/LoginPage";
import Create from "./firstpage/Create";
import IceBoard from "./orderboard/IceBoard"
import etcBoard from "./orderboard/etcBoard"

const OrderboardComponent = lazy(() => import('./orderboard/OrderBoardComponent'));

function PrivateRoutes() {
    return (
        <Suspense fallback={<LoadingComponent loading/>}>

            <Switch>


                <Route exact path={LINKS.orderboard} component={OrderboardComponent}/>
                <Route exact path={LINKS.iceboard} component={IceBoard}/>
                <Route exact path={LINKS.etcboard} component={etcBoard}/>
                <Route exact path={LINKS.tickets} component={PaymentboardComponent}/>
                <Route exact path={LINKS.settings} component={UserboardComponent}/>
                <Route exact path={LINKS.create} component={Create}/>

                <Route exact path={LINKS.login} component={basicLogin}/>

                <Redirect to={LINKS.login} component={basicLogin}/>

            </Switch>
        </Suspense>
    );
}

export default PrivateRoutes;