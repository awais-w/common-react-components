import React from 'react';
import bem from '@argos/utils/esnext/bem';
import StoreDetails from '../store-details/StoreDetails';
import './StoresTable.scss';

const cn = bem({ prefix: 'cmc-', block: 'stores-table' });

const StoresTable = (props) => {
  const storeRows = props.stores.map((store) => (
    <tr className={cn('row')}>
      <StoreDetails {...store} />
    </tr>
  ));
  return <table className={cn()}>{storeRows}</table>;
};

export default StoresTable;
