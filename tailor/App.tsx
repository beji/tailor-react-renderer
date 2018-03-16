import * as React from 'react';
import Greeting from './Greeting';

const FragmentTag = (src: string, primary = false, async = false) => {
    return <div id="app" dangerouslySetInnerHTML={{__html: `<fragment src="${src}" primary="${primary}" async="${async}"/>`}} />
}
const FragmentTags = (srcs: String[]) => {
    const html = srcs.map(src => `<fragment src="${src}"/>`).join('\n');
    return <div id="app" dangerouslySetInnerHTML={{__html: html}} />
}

interface AppProps {
    fragmentEndpoint: string,
    categoryFragmentEndpoint: string
}

export default class App extends React.Component<AppProps, {}> {
    render() {
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
