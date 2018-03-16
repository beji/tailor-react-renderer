import * as React from 'react';

interface IGreeterProps {
    name: string;
}

export default class Greeter extends React.Component<IGreeterProps, {}> {
    public render() {
        return (
            <h1>Hallo, {this.props.name}</h1>
        );
    }
}
