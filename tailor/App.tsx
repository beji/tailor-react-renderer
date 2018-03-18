import * as React from 'react';
import Greeting from './Greeting';

import styled from 'styled-components';

const FragmentTag = (src: string, primary = false, async = false) => {
    const html = `<fragment src="${src}" primary="${primary}" async="${async}"/>`;
    return (<div id="app" dangerouslySetInnerHTML={{__html: html}} />);
};
const FragmentTags = (srcs: string[]) => {
    const html = srcs.map((src) => `<fragment src="${src}"/>`).join('\n');
    return (<div id="app" dangerouslySetInnerHTML={{__html: html}} />);
};

interface IAppProps {
    fragmentEndpoint: string;
    categoryFragmentEndpoint: string;
}

const AppWrapper = styled.div`
    color: palevioletred;
    background: papayawhip;
    border: none;
    border-radius: 3px;
    padding: 0.5rem;
`;

export default class App extends React.Component<IAppProps, {}> {
    public render() {
        return (
            <AppWrapper>
                <Greeting name="Person" />
                {FragmentTags([this.props.fragmentEndpoint, this.props.categoryFragmentEndpoint])}
            </AppWrapper>
        );
    }
}
