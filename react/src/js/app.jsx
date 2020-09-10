/* eslint-disable */
import React from 'react';
import ReactDOM from 'react-dom';
import ConsonantPage from "./components/Page/ConsonantPage";

class WrapperCardCollectionComponent {
    constructor(config, element) {
        ReactDOM.render((<React.Fragment>
            <ConsonantPage config={config} />
        </React.Fragment>), element);
    }
}

window.WrapperCardCollectionComponent = WrapperCardCollectionComponent;



