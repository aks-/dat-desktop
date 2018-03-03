import test from 'tape';
import React from 'react'
import { shallow, render, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import StatusBar from '../app/components/status-bar'

configure({ adapter: new Adapter() });

test('status bar should contain two components with class f7', t => {
  const wrapper = render(<StatusBar up={20} down={40} show={true} />);

  t.equal(wrapper.find('.f7').length, 2)

  t.end()
})

