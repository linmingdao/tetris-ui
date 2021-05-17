export enum AvailableBuiltInTypeEnum {
  END = 'end',
  START = 'start',
  PROCESS = 'process',
  JUDGMENT = 'judgment',
}

export type AvailableBuiltInType =
  | AvailableBuiltInTypeEnum.END
  | AvailableBuiltInTypeEnum.START
  | AvailableBuiltInTypeEnum.PROCESS
  | AvailableBuiltInTypeEnum.JUDGMENT;

export interface DefaultNodesConfig {
  start?: { label?: string };
  end?: { label?: string };
  process?: { label?: string };
  judgment?: { label?: string };
}

export interface NodeDescription {
  type: string;
  label: string;
  component: React.JSXElementConstructor<never>;
}

export interface NodeTypes {
  [nodeType: string]: React.JSXElementConstructor<never>;
}

export interface PositionType {
  x: number;
  y: number;
}

export interface DataType {
  label: string;
  [key: string]: any;
}

export interface EdgeDataType {
  [key: string]: any;
}

export interface ElementType {
  id: string;
  type: string;
  data: DataType;
  position: PositionType;
}

export interface EdgeType {
  id: string;
  type: string;
  data: EdgeDataType;
  [key: string]: any;
}

export type ElementDropReturnType = ElementType | false | Promise<ElementType | false>;

export type EdgeReturnType = EdgeType | false | Promise<EdgeType | false>;

export interface FlowChartProps {
  ref?: any;
  editable?: boolean;
  dataSource?: any[];
  strokeWidth?: number;
  customNodes?: NodeDescription[];
  defaultNodes?: AvailableBuiltInTypeEnum[];
  defaultNodeConfig?: DefaultNodesConfig;
  onSave?: (data: any[]) => void;
  onElementClick?: (event: any, element: any) => void;
  onNodeDoubleClick?: (event: any, element: any) => void;
  onElementDrop?: (element: ElementType) => ElementDropReturnType;
  onEdgeConnect?: (element: EdgeType) => EdgeReturnType;
}
