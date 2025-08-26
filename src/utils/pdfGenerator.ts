// PDF generation utility using modern browser APIs
export const viewPDF = async (content: string, filename: string): Promise<void> => {
  try {
    // Create a new window for viewing PDF
    const pdfWindow = window.open('', '_blank');
    if (!pdfWindow) {
      throw new Error('No se pudo abrir la ventana del PDF');
    }

    // HTML template for PDF viewing
    const htmlContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <title>${filename}</title>
          <style>
            body {
              font-family: 'Inter', Arial, sans-serif;
              margin: 20px;
              color: #333;
              line-height: 1.6;
            }
            .header {
              text-align: center;
              border-bottom: 2px solid #8b5cf6;
              padding-bottom: 20px;
              margin-bottom: 30px;
            }
            .header h1 {
              color: #8b5cf6;
              margin: 0;
            }
            .section {
              margin-bottom: 30px;
              padding: 20px;
              border: 1px solid #e5e7eb;
              border-radius: 8px;
            }
            .section h2 {
              color: #2dd4bf;
              border-bottom: 1px solid #e5e7eb;
              padding-bottom: 10px;
            }
            .metric {
              display: flex;
              justify-content: space-between;
              padding: 8px 0;
              border-bottom: 1px solid #f3f4f6;
            }
            .metric:last-child {
              border-bottom: none;
            }
            .footer {
              text-align: center;
              margin-top: 40px;
              padding-top: 20px;
              border-top: 1px solid #e5e7eb;
              color: #6b7280;
              font-size: 12px;
            }
            .actions {
              position: fixed;
              top: 10px;
              right: 10px;
              display: flex;
              gap: 10px;
            }
            .btn {
              padding: 8px 16px;
              background: #8b5cf6;
              color: white;
              border: none;
              border-radius: 4px;
              cursor: pointer;
            }
            .btn:hover {
              background: #7c3aed;
            }
            @media print {
              .actions { display: none; }
              body { margin: 0; }
              .section { break-inside: avoid; }
            }
          </style>
        </head>
        <body>
          <div class="actions">
            <button class="btn" onclick="window.print()">Imprimir/Descargar PDF</button>
            <button class="btn" onclick="window.close()">Cerrar</button>
          </div>
          ${content}
        </body>
      </html>
    `;

    pdfWindow.document.write(htmlContent);
    pdfWindow.document.close();

  } catch (error) {
    console.error('Error mostrando PDF:', error);
    throw error;
  }
};

export const generatePDF = async (content: string, filename: string): Promise<void> => {
  try {
    // Create a new window for printing
    const printWindow = window.open('', '_blank');
    if (!printWindow) {
      throw new Error('No se pudo abrir la ventana de impresión');
    }

    // HTML template for PDF
    const htmlContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <title>${filename}</title>
          <style>
            body {
              font-family: 'Inter', Arial, sans-serif;
              margin: 20px;
              color: #333;
              line-height: 1.6;
            }
            .header {
              text-align: center;
              border-bottom: 2px solid #8b5cf6;
              padding-bottom: 20px;
              margin-bottom: 30px;
            }
            .header h1 {
              color: #8b5cf6;
              margin: 0;
            }
            .section {
              margin-bottom: 30px;
              padding: 20px;
              border: 1px solid #e5e7eb;
              border-radius: 8px;
            }
            .section h2 {
              color: #2dd4bf;
              border-bottom: 1px solid #e5e7eb;
              padding-bottom: 10px;
            }
            .metric {
              display: flex;
              justify-content: space-between;
              padding: 8px 0;
              border-bottom: 1px solid #f3f4f6;
            }
            .metric:last-child {
              border-bottom: none;
            }
            .footer {
              text-align: center;
              margin-top: 40px;
              padding-top: 20px;
              border-top: 1px solid #e5e7eb;
              color: #6b7280;
              font-size: 12px;
            }
            @media print {
              body { margin: 0; }
              .section { break-inside: avoid; }
            }
          </style>
        </head>
        <body>
          ${content}
        </body>
      </html>
    `;

    printWindow.document.write(htmlContent);
    printWindow.document.close();

    // Wait for content to load
    printWindow.onload = () => {
      setTimeout(() => {
        printWindow.print();
        printWindow.close();
      }, 250);
    };

  } catch (error) {
    console.error('Error generando PDF:', error);
    throw error;
  }
};

export const generateReportContent = (section: string): string => {
  const now = new Date();
  const timestamp = now.toLocaleString('es-ES');

  const sectionData = {
    climatizacion: {
      title: 'Reporte de Climatización',
      metrics: [
        { label: 'Temperatura Promedio', value: '24.5°C', status: 'Normal' },
        { label: 'Humedad Promedio', value: '68%', status: 'Óptima' },
        { label: 'Calidad del Aire', value: '85%', status: 'Buena' },
        { label: 'Sensores Activos', value: '12/12', status: 'Operativo' },
        { label: 'Alertas Generadas', value: '3', status: 'Resueltas' },
      ]
    },
    abastecimiento: {
      title: 'Reporte de Abastecimiento',
      metrics: [
        { label: 'Nivel de Agua Total', value: '875 L', status: 'Adecuado' },
        { label: 'Consumo Diario', value: '245 L', status: 'Normal' },
        { label: 'Comida Disponible', value: '1,250 kg', status: 'Suficiente' },
        { label: 'Consumo de Alimento', value: '85 kg/día', status: 'Normal' },
        { label: 'Bebederos Operativos', value: '18/20', status: 'Revisar' },
      ]
    },
    movimiento: {
      title: 'Reporte de Actividad Animal',
      metrics: [
        { label: 'Actividad Promedio', value: '52%', status: 'Normal' },
        { label: 'Nivel de Ruido', value: '72 dB', status: 'Típico' },
        { label: 'Detecciones por Hora', value: '847', status: 'Regular' },
        { label: 'Zona Más Activa', value: 'Galpón 1', status: 'Monitoreo' },
        { label: 'Patrones Anómalos', value: '0', status: 'Normal' },
      ]
    },
    dispositivos: {
      title: 'Reporte de Dispositivos',
      metrics: [
        { label: 'Sensores Operativos', value: '45/48', status: 'Funcional' },
        { label: 'Tiempo Activo Promedio', value: '99.2%', status: 'Excelente' },
        { label: 'Dispositivos con Fallas', value: '3', status: 'Atención' },
        { label: 'Actualizaciones Pendientes', value: '2', status: 'Programadas' },
        { label: 'Batería Promedio', value: '87%', status: 'Buena' },
      ]
    },
    alertas: {
      title: 'Reporte de Alertas',
      metrics: [
        { label: 'Alertas Totales', value: '24', status: 'Periodo' },
        { label: 'Críticas', value: '2', status: 'Resueltas' },
        { label: 'Advertencias', value: '15', status: 'En Proceso' },
        { label: 'Informativas', value: '7', status: 'Revisadas' },
        { label: 'Tiempo Respuesta Promedio', value: '12 min', status: 'Eficiente' },
      ]
    },
    general: {
      title: 'Reporte General del Sistema',
      metrics: [
        { label: 'Estado General', value: 'Operativo', status: 'Normal' },
        { label: 'Eficiencia del Sistema', value: '94%', status: 'Excelente' },
        { label: 'Uptime', value: '99.8%', status: 'Óptimo' },
        { label: 'Pollos Monitoreados', value: '2,450', status: 'Total' },
        { label: 'Producción Diaria', value: '2,180 huevos', status: 'Meta Cumplida' },
      ]
    }
  };

  const data = sectionData[section as keyof typeof sectionData] || sectionData.general;

  return `
    <div class="header">
      <h1>Sistema de Gestión Avícola</h1>
      <h2>${data.title}</h2>
      <p>Generado el: ${timestamp}</p>
    </div>

    <div class="section">
      <h2>Métricas Principales</h2>
      ${data.metrics.map(metric => `
        <div class="metric">
          <span><strong>${metric.label}:</strong></span>
          <span>${metric.value} <em>(${metric.status})</em></span>
        </div>
      `).join('')}
    </div>

    <div class="section">
      <h2>Resumen del Período</h2>
      <p>Este reporte incluye datos recopilados durante las últimas 24 horas del sistema de monitoreo avícola.</p>
      <p>Todos los valores se encuentran dentro de los parámetros normales establecidos para la operación.</p>
    </div>

    <div class="section">
      <h2>Observaciones</h2>
      <ul>
        <li>Sistema funcionando correctamente sin interrupciones significativas</li>
        <li>Parámetros ambientales dentro del rango óptimo</li>
        <li>Actividad animal normal y saludable</li>
        <li>Dispositivos de monitoreo operativos y actualizados</li>
      </ul>
    </div>

    <div class="footer">
      <p>Sistema de Gestión Avícola - Versión Demo</p>
      <p>Reporte generado automáticamente el ${timestamp}</p>
    </div>
  `;
};