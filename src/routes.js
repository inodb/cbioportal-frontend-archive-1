import React from 'react'
import {Route, IndexRoute} from 'react-router';

import Container from 'features/Container';

import ClinicalInformationContainer from './features/patient_view/clinical_information/ClinicalInformationContainer';

export const makeRoutes = () => {
    return (
        <Route path="*" component={Container}>

            <IndexRoute component={ClinicalInformationContainer} />

        </Route>
    )
}

export default makeRoutes