import shortid from 'shortid';
import React, { useRef, useState, useEffect, useCallback, useImperativeHandle } from 'react';
import ReactFlow, { addEdge, Controls, Background, BackgroundVariant, removeElements, ReactFlowProvider, Edge } from 'react-flow-renderer';
import Toolbar from './Toolbar/Toolbar';
import Sidebar from './Sidebar/Sidebar';
import { getBuiltInNodes } from './Nodes/index';
import { getNodeTypesAndMapFromConfig, mergeCustomNodes } from './utils';
import { AvailableBuiltInTypeEnum, FlowChartProps, ElementType, EdgeType } from './types';

const FlowChart: React.FC<FlowChartProps> = React.forwardRef(
  (
    {
      editable = false,
      dataSource = [],
      strokeWidth = 5,
      customNodes = [],
      defaultNodes,
      defaultNodeConfig = {},
      onSave,
      onElementClick,
      onNodeDoubleClick,
      onElementDrop = (element: ElementType) => element,
      onEdgeConnect = (element: EdgeType) => element,
    },
    ref
  ) => {
    const reactFlowWrapper = useRef<any>(null);
    const [elements, setElements] = useState<any[]>(dataSource);
    const [reactflowInstance, setReactflowInstance] = useState<any>(null);
    const { nodes, nodeTypes, nodesMap } = getNodeTypesAndMapFromConfig(
      mergeCustomNodes(
        customNodes,
        getBuiltInNodes(defaultNodeConfig),
        defaultNodes || [
          AvailableBuiltInTypeEnum.END,
          AvailableBuiltInTypeEnum.JUDGMENT,
          AvailableBuiltInTypeEnum.PROCESS,
          AvailableBuiltInTypeEnum.START,
        ]
      )
    );
    const onNodeDragStop = (event: any, node: any) => setElements(els => els.map(item => (item.id === node.id ? node : item)));
    const onElementsRemove = useCallback(elementsToRemove => setElements(els => removeElements(elementsToRemove, els)), []);
    const onConnect = useCallback(
      async params => {
        const edge = await onEdgeConnect({
          ...params,
          type: 'smoothstep',
          arrowHeadType: 'arrowclosed',
          data: {},
          style: { strokeWidth },
        });
        edge && setElements(els => addEdge(edge as Edge, els));
      },
      [strokeWidth, onEdgeConnect]
    );
    const onLoad = useCallback(rfi => !reactflowInstance && setReactflowInstance(rfi), [reactflowInstance]);
    const onDragOver = (event: any) => {
      event.preventDefault();
      event.dataTransfer.dropEffect = 'move';
    };
    const onDrop = async (event: any) => {
      event.preventDefault();
      if (reactFlowWrapper && reactFlowWrapper.current) {
        const type = event.dataTransfer.getData('application/reactflow');
        const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
        const position = reactflowInstance.project({
          x: event.clientX - reactFlowBounds.left,
          y: event.clientY - reactFlowBounds.top,
        });
        const newNode = await onElementDrop({
          type,
          position,
          data: { label: nodesMap[type].label },
          id: shortid.generate(),
        });
        newNode && setElements(es => es.concat(newNode));
      }
    };

    useImperativeHandle(ref, () => ({
      reactflowInstance,
      fitView() {
        reactflowInstance && reactflowInstance.fitView();
      },
      setElements(elements: any[]) {
        setElements(elements);
      },
      getElements(): any[] {
        return elements;
      },
    }));

    const fitView = () => reactflowInstance && reactflowInstance.fitView();

    useEffect(() => {
      fitView();
      window.addEventListener('resize', fitView);
      return () => {
        window.removeEventListener('resize', fitView);
      };
    }, [reactflowInstance]);

    // fixed: 解决流程图组件用户重新设置dataSource视图不更新问题
    useEffect(() => {
      setElements(dataSource);
    }, [dataSource]);

    return (
      <div className="flow-editor-dnd">
        <Sidebar nodes={nodes} editable={editable} />
        <div className="flow-wrapper" ref={reactFlowWrapper}>
          <ReactFlowProvider>
            <ReactFlow
              elements={elements}
              zoomOnPinch={false}
              zoomOnScroll={false}
              zoomOnDoubleClick={false}
              nodeTypes={nodeTypes}
              nodesDraggable={editable}
              nodesConnectable={editable}
              elementsSelectable={editable}
              onLoad={onLoad}
              onDrop={onDrop}
              onConnect={onConnect}
              onDragOver={onDragOver}
              onElementClick={onElementClick}
              onNodeDragStop={onNodeDragStop}
              onElementsRemove={onElementsRemove}
              onNodeDoubleClick={onNodeDoubleClick}
            >
              <Controls showInteractive={editable} />
              <Background variant={BackgroundVariant.Lines} />
              <Toolbar editable={editable} onEmpty={() => setElements([])} onSave={() => onSave && onSave(elements)} />
            </ReactFlow>
          </ReactFlowProvider>
        </div>
      </div>
    );
  }
);

FlowChart.displayName = 'FlowChart';

export default FlowChart;
