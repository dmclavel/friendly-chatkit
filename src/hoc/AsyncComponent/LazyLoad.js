import React from 'react';

const lazyLoad = importComponent => {
    return class extends React.Component {
        constructor(props) {
            super(props);
            this.state = {
                component: null
            }
        }

        componentDidMount() {
            importComponent()
                .then(cmp => this.setState({ component: cmp.default }))
                .catch(() => {});
        }

        render () {
            const LazyComponent = this.state.component;
            return LazyComponent ? <LazyComponent /> : null;
        }
    }
};

export default lazyLoad;