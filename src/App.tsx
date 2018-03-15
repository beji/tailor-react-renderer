import * as React from 'react';
import Greeting from './Greeting';

const FragmentTag = (src: string, primary = false, async = false) => {
    return <div id="app" dangerouslySetInnerHTML={{__html: `<fragment src="${src}" primary="${primary}" async="${async}"/>`}} />
}

export default class App extends React.Component {
    render() {
        return (
            <html>
                <body>
                    <Greeting name="Gregor" />
                    {FragmentTag('http://localhost:3000')}
                </body>
            </html>
        );
    }
}
