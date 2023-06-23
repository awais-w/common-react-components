import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, text, boolean, select } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import Button from './Button';

storiesOf('Components|Button', module)
  .addParameters({
    options: { theme: {} },
  })
  .addDecorator(withKnobs)
  .add('Buttons', () => (
    <React.Fragment>
      <div className='xs-row'>
        <div className='storybook-app__desc xs-hidden md-block xs-2'>
          <h2 className='h2'>Buttons</h2>
          <p className='font-standard'>Modify the button types using knobs.</p>
        </div>
        <div className='xs-10 xs-row'>
          <div className='xs-12--none'>
            <Button
              text={text('Text', 'My button Text')}
              icon={select('Icon', ['', 'arrow_forward_ios', 'arrow_back_ios', 'zoom_in', 'zoom_out'], '')}
              iconMode={select('Icon Mode', ['left', 'right', 'splitLeft', 'splitRight'], 'left')}
              buttonWidth={select('Button width', ['default', 'half', 'contentFit', 'containerFit'], 'default')}
              isSecondary={boolean('Secondary button', false)}
              isShort={boolean('Short', false)}
              isDisabled={boolean('Disabled', false)}
              isLoading={boolean('Loading', false)}
              loadingText={text('Loading text', '')}
              onClick={action('You clicked the button')}
              type={select('Type', ['button', 'submit'], 'button')}
            />
          </div>
        </div>
      </div>
    </React.Fragment>
  ));
