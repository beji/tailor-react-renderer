import * as React from 'react';

import styled from 'styled-components';

const AppWrapper = styled.div`
    color: cyan;
`;

export default class App extends React.Component {
    public render() {
        return (
            <AppWrapper>
                <h2>Geile Kategorien landen dann hier!</h2>
            </AppWrapper>
        );
    }
}
