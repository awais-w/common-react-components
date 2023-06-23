import React from 'react';
import { storiesOf } from '@storybook/react';
import { withReadme } from 'storybook-readme';
import { withKnobs, object, boolean } from '@storybook/addon-knobs';
import Table from './Table';
import README from '../README.md';
import { HEADINGS, generateTableData } from './MockProps';

/*
 * A wrapper around the <Table/> story is required as storybook has a fixed header
 * which interferes with the <Table/> sticky header.
 */
const wrapperStyle = {
  top: '50px',
  bottom: '0',
  left: '0',
  position: 'fixed',
  width: '100%',
  overflow: 'scroll',
};

const styles = { verticalAlign: 'middle' };

storiesOf('Components|Table', module)
  .addParameters({
    options: { theme: {} },
  })
  .addDecorator(withReadme(README))
  .addDecorator(withKnobs)
  .add('Basic', () => (
    <div style={wrapperStyle}>
      <Table
        headings={object('Headings', HEADINGS)}
        stickyHeader={boolean('Sticky Header', false)}
        stickyFirstColumn={boolean('Sticky first column', false)}
        striped={boolean('Striped', true)}
        bordered={boolean('Bordered', true)}
        styles={object('Styles', styles)}
        tableData={object(
          'Table Data',
          generateTableData({
            use: 'STORY',
            numberOfRows: 4,
            numberOfColumns: HEADINGS.length,
            rowsWithClickHandler: [0, 1],
            rowsHighlighted: [0],
          }),
        )}
      />
    </div>
  ));
