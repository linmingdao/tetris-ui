import React from 'react';

const Toolbar: React.FC<{ renderToolbar?: () => React.ReactElement }> = ({ renderToolbar }) => {
  return <div className="toolbar">{renderToolbar && renderToolbar()}</div>;
};

Toolbar.displayName = 'Toolbar';

export default Toolbar;
