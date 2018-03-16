import * as React from 'react';
import Greeting from './Greeting';

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

export default class App extends React.Component<IAppProps, {}> {
    public render() {
        return (
            <html>
                <body>
                    <Greeting name="Gregor" />
                    {FragmentTags([this.props.fragmentEndpoint, this.props.categoryFragmentEndpoint])}
                </body>
            </html>
        );
    }
}
