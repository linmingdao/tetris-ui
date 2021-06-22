import { Menu } from 'antd';
import Iconfont from '../Iconfont';
import classnames from 'classnames';
import TemplateList from './TemplateList';
import TemplateItem from './TemplateItem';
import { EditorContext } from '../EditorContext';
import React, { useContext, useState } from 'react';

const Templates: React.FC<{ visible: boolean }> = ({ visible = true }) => {
  const { tmplPanelWidth, groupedTemplates = {}, groupIcons = {} } = useContext(EditorContext);
  const [currentGroupName, setCurrentGroupName] = useState<string>(Object.keys(groupedTemplates)[0]);
  const [currentGroupComponents, setCurrentGroupComponents] = useState(groupedTemplates[currentGroupName]);

  const handleSelect = (item: { key: any }) => {
    setCurrentGroupName(item.key);
    setCurrentGroupComponents(groupedTemplates[item.key]);
  };

  return (
    <div className={classnames('templates', { hide: visible })} style={{ width: tmplPanelWidth ? tmplPanelWidth : 360 }}>
      <Menu mode="inline" theme="light" inlineCollapsed={true} onSelect={handleSelect} defaultSelectedKeys={[Object.keys(groupedTemplates)[0]]}>
        {Object.keys(groupedTemplates).map((groupName: string) => {
          return (
            <Menu.Item key={groupName} icon={groupIcons[groupName] ? groupIcons[groupName] : <Iconfont type="icon-group" />}>
              {groupName}
            </Menu.Item>
          );
        })}
      </Menu>
      <div className="category">
        <div className="title">{currentGroupName}</div>
        <TemplateList>
          {currentGroupComponents && currentGroupComponents.map((item: any, index: number) => <TemplateItem key={index} config={item} />)}
        </TemplateList>
      </div>
    </div>
  );
};

Templates.displayName = 'Templates';

export default Templates;
