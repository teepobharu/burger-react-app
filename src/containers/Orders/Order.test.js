import Adapter from 'enzyme-adapter-react-16';
import { shallow, configure } from 'enzyme';
import React from 'react';
import { Link } from 'react-router-dom';
import { Orders } from './Orders';


configure({ adapter: new Adapter() });

describe('<Orders /> correctly render', () => {
    let wrapper;

    beforeEach(() => {
        wrapper = shallow(<Orders orders={[]} onFetchOrders={() => { }} />);
    });

    it("should render no orders text when no orders", () => {
        expect(wrapper.contains(<Link to={{ hash: "burgerControl", pathname: "/" }}><p style={{ textAlign: "center" }}>No recipe orders Yet! </p></Link>)).toEqual(true);
    })
})