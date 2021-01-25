import React, { FunctionComponent, ReactElement, useEffect, useState } from 'react';

interface InspectorProps {
  className: string;
  data: DataView;
  cursor: number;
}

const Inspector: FunctionComponent<InspectorProps> = ({ className, data, cursor }) => {
  return <div className={className}>Oh Hai {cursor}</div>;
};

export default Inspector;
