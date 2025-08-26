import { useCallback } from 'react';
import {
  ReactFlow,
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
  Connection,
  Edge,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';

const initialNodes = [
  {
    id: 'home',
    type: 'default',
    position: { x: 400, y: 50 },
    data: { 
      label: '🏠 Sistema FarmControl\nPanel de Control Central' 
    },
    style: {
      background: 'hsl(267 100% 67%)',
      color: 'white',
      border: '2px solid hsl(182 100% 54%)',
      borderRadius: '12px',
      fontSize: '14px',
      fontWeight: 'bold',
      textAlign: 'center' as const,
      padding: '10px',
      width: 200,
      height: 80
    }
  },
  {
    id: 'climatizacion',
    type: 'default',
    position: { x: 100, y: 200 },
    data: { 
      label: '🌡️ Climatización\n• Temperatura en tiempo real\n• Calidad del aire\n• Sensores de luz\n• Control por habitación' 
    },
    style: {
      background: 'hsl(240 10% 8%)',
      color: 'hsl(182 100% 54%)',
      border: '2px solid hsl(267 100% 67%)',
      borderRadius: '8px',
      fontSize: '12px',
      padding: '15px',
      width: 180,
      height: 120
    }
  },
  {
    id: 'abastecimiento',
    type: 'default',
    position: { x: 320, y: 200 },
    data: { 
      label: '💧 Abastecimiento\n• Niveles de agua\n• Bebederos\n• Silos de comida\n• Consumo diario' 
    },
    style: {
      background: 'hsl(240 10% 8%)',
      color: 'hsl(182 100% 54%)',
      border: '2px solid hsl(267 100% 67%)',
      borderRadius: '8px',
      fontSize: '12px',
      padding: '15px',
      width: 180,
      height: 120
    }
  },
  {
    id: 'movimiento',
    type: 'default',
    position: { x: 540, y: 200 },
    data: { 
      label: '📊 Detección\n• Movimiento animal\n• Niveles de ruido (dB)\n• Actividad por zona\n• Patrones anómalos' 
    },
    style: {
      background: 'hsl(240 10% 8%)',
      color: 'hsl(182 100% 54%)',
      border: '2px solid hsl(267 100% 67%)',
      borderRadius: '8px',
      fontSize: '12px',
      padding: '15px',
      width: 180,
      height: 120
    }
  },
  {
    id: 'dispositivos',
    type: 'default',
    position: { x: 760, y: 200 },
    data: { 
      label: '🔧 Dispositivos\n• Estado de sensores\n• Conectividad\n• Batería\n• Actualizaciones' 
    },
    style: {
      background: 'hsl(240 10% 8%)',
      color: 'hsl(182 100% 54%)',
      border: '2px solid hsl(267 100% 67%)',
      borderRadius: '8px',
      fontSize: '12px',
      padding: '15px',
      width: 180,
      height: 120
    }
  },
  {
    id: 'alertas',
    type: 'default',
    position: { x: 200, y: 380 },
    data: { 
      label: '🚨 Alertas\n• Notificaciones críticas\n• Advertencias\n• Fallos del sistema\n• Histórico de eventos' 
    },
    style: {
      background: 'hsl(240 10% 8%)',
      color: 'hsl(182 100% 54%)',
      border: '2px solid hsl(267 100% 67%)',
      borderRadius: '8px',
      fontSize: '12px',
      padding: '15px',
      width: 180,
      height: 120
    }
  },
  {
    id: 'reportes',
    type: 'default',
    position: { x: 420, y: 380 },
    data: { 
      label: '📋 Reportes\n• Generación de PDF\n• Vista previa\n• Descarga directa\n• Datos por sección' 
    },
    style: {
      background: 'hsl(240 10% 8%)',
      color: 'hsl(182 100% 54%)',
      border: '2px solid hsl(267 100% 67%)',
      borderRadius: '8px',
      fontSize: '12px',
      padding: '15px',
      width: 180,
      height: 120
    }
  },
  {
    id: 'analytics',
    type: 'default',
    position: { x: 640, y: 380 },
    data: { 
      label: '📈 Análisis\n• Correlación de datos\n• Predicciones\n• Optimización\n• Eficiencia del sistema' 
    },
    style: {
      background: 'hsl(240 10% 8%)',
      color: 'hsl(182 100% 54%)',
      border: '2px solid hsl(267 100% 67%)',
      borderRadius: '8px',
      fontSize: '12px',
      padding: '15px',
      width: 180,
      height: 120
    }
  }
];

const initialEdges = [
  {
    id: 'e1-2',
    source: 'home',
    target: 'climatizacion',
    type: 'smoothstep',
    style: { stroke: 'hsl(267 100% 67%)', strokeWidth: 2 },
    animated: true
  },
  {
    id: 'e1-3',
    source: 'home',
    target: 'abastecimiento',
    type: 'smoothstep',
    style: { stroke: 'hsl(267 100% 67%)', strokeWidth: 2 },
    animated: true
  },
  {
    id: 'e1-4',
    source: 'home',
    target: 'movimiento',
    type: 'smoothstep',
    style: { stroke: 'hsl(267 100% 67%)', strokeWidth: 2 },
    animated: true
  },
  {
    id: 'e1-5',
    source: 'home',
    target: 'dispositivos',
    type: 'smoothstep',
    style: { stroke: 'hsl(267 100% 67%)', strokeWidth: 2 },
    animated: true
  },
  {
    id: 'e2-6',
    source: 'climatizacion',
    target: 'alertas',
    type: 'smoothstep',
    style: { stroke: 'hsl(182 100% 54%)', strokeWidth: 1.5 }
  },
  {
    id: 'e3-6',
    source: 'abastecimiento',
    target: 'alertas',
    type: 'smoothstep',
    style: { stroke: 'hsl(182 100% 54%)', strokeWidth: 1.5 }
  },
  {
    id: 'e4-6',
    source: 'movimiento',
    target: 'alertas',
    type: 'smoothstep',
    style: { stroke: 'hsl(182 100% 54%)', strokeWidth: 1.5 }
  },
  {
    id: 'e5-6',
    source: 'dispositivos',
    target: 'alertas',
    type: 'smoothstep',
    style: { stroke: 'hsl(182 100% 54%)', strokeWidth: 1.5 }
  },
  {
    id: 'e6-7',
    source: 'alertas',
    target: 'reportes',
    type: 'smoothstep',
    style: { stroke: 'hsl(267 100% 67%)', strokeWidth: 2 }
  },
  {
    id: 'e7-8',
    source: 'reportes',
    target: 'analytics',
    type: 'smoothstep',
    style: { stroke: 'hsl(267 100% 67%)', strokeWidth: 2 }
  }
];

export default function Index() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onConnect = useCallback(
    (params: Connection) => setEdges((eds) => addEdge(params, eds)),
    [setEdges],
  );

  return (
    <div className="h-full">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-foreground mb-2">
          Sistema de Gestión Avícola - FarmControl
        </h1>
        <p className="text-muted-foreground">
          Flujo completo del sistema de monitoreo y control para granjas avícolas. 
          Cada sección se interconecta para proporcionar un control integral.
        </p>
      </div>
      
      <div style={{ width: '100%', height: '600px' }}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          fitView
          style={{ 
            backgroundColor: 'hsl(240 10% 4%)',
            borderRadius: '8px',
            border: '1px solid hsl(240 10% 18%)'
          }}
        >
          <MiniMap 
            style={{
              backgroundColor: 'hsl(240 10% 8%)',
              border: '1px solid hsl(240 10% 18%)'
            }}
            nodeColor={(node) => {
              if (node.id === 'home') return 'hsl(267 100% 67%)';
              return 'hsl(182 100% 54%)';
            }}
          />
          <Controls 
            style={{
              backgroundColor: 'hsl(240 10% 8%)',
              border: '1px solid hsl(240 10% 18%)'
            }}
          />
          <Background 
            color="hsl(240 10% 18%)" 
            gap={16} 
            size={1}
          />
        </ReactFlow>
      </div>
      
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="p-6 bg-card rounded-lg border">
          <h3 className="text-lg font-semibold text-primary mb-3">🔄 Flujo de Datos</h3>
          <p className="text-sm text-muted-foreground">
            Los sensores recopilan datos en tiempo real que se procesan centralmente.
            Las anomalías generan alertas automáticas.
          </p>
        </div>
        
        <div className="p-6 bg-card rounded-lg border">
          <h3 className="text-lg font-semibold text-primary mb-3">⚡ Tiempo Real</h3>
          <p className="text-sm text-muted-foreground">
            Actualización cada 5 segundos de métricas críticas.
            Visualización inmediata de cambios en el estado del sistema.
          </p>
        </div>
        
        <div className="p-6 bg-card rounded-lg border">
          <h3 className="text-lg font-semibold text-primary mb-3">📊 Reportes Integrales</h3>
          <p className="text-sm text-muted-foreground">
            Generación automática de PDFs con datos consolidados.
            Vista previa antes de descarga y análisis histórico.
          </p>
        </div>
      </div>
    </div>
  );
}