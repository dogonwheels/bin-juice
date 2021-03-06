import React, { FunctionComponent, useCallback } from 'react';
import BitLength from './BitLength';
import Rows from './Rows';
import ViewProps from './ViewProps';

const TextBlock: FunctionComponent<ViewProps> = (props) => {
  const formatter = useCallback((position, value) => String.fromCharCode(value).replace(/[^ -~]+/g, '.'), []);

  return <Rows className="Text" bitLength={BitLength.Byte} cellFormatter={formatter} {...props} />;
};

export default TextBlock;
