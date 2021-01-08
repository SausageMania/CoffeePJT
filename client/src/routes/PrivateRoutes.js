import React, {Suspense, lazy} from 'react';
import {Redirect, Route, Switch} from 'react-router-dom';
import LINKS from 'resources/links';
import LoadingComponent from 'components/loading';
import PaymentboardComponent from "./paymentboard";
import UserboardComponent from "./userboard";
import SLUGS from "../resources/links";
import basicLogin from "./firstpage/LoginPage";
import NoTask from "./firstpage/NoTask";
import Create from "./firstpage/Create";

const OrderboardComponent = lazy(() => import('./orderboard/OrderBoardComponent'));

function PrivateRoutes() {
    return (
        <Suspense fallback={<LoadingComponent loading/>}>

            <Switch>
                <Route exact path={LINKS.orderboard} component={OrderboardComponent}/>
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
