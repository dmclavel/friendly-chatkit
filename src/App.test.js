import React from 'react';
import { shallow } from 'enzyme';

import App from './App';

describe('App', () => {
    let app;

    beforeEach(() => {
        app = shallow(<App />);
    });

    it('should contain 1 route rendered', () => {
        expect(app.find('Route')).toHaveLength(1);
    });
});