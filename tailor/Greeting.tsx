import * as React from 'react';

interface GreeterProps {
    name: string;
}

export default class Greeter extends React.Component<GreeterProps, {}> {
    render() {
        return (
            <h1>Hallo, {this.props.name}</h1>
        );
    }
}
