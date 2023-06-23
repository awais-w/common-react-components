import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, select, text } from '@storybook/addon-knobs';
import { withReadme } from 'storybook-readme';
import README from '../README.md';
import Portal from './Portal';

storiesOf('Components|Portal', module)
  .addParameters({
    options: { theme: {} },
  })
  .addDecorator(withReadme(README))
  .addDecorator(withKnobs())
  .add('Portal', () => (
    <div>
      <div className={'red'} style={{ backgroundColor: 'red', height: '15px', marginBottom: '10px' }} />
      <div className={'blue'} style={{ backgroundColor: 'blue', height: '15px', marginBottom: '10px' }} />
      <div className={'green'} style={{ backgroundColor: 'green', height: '15px', marginBottom: '10px' }} />
      <div className={'yellow'} style={{ backgroundColor: 'yellow', height: '15px', marginBottom: '10px' }} />
      <Portal
        nodeSelector={select('nodeSelector', ['body', '.red', '.blue', '.green', '.yellow'])}
        children={text('children', 'THIS IS OUR PORTAL CONTENT')}
      />
    </div>
  ));
