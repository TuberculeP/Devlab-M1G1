type ProductData = {
  id: number;
  materialName: string;
  userInfo: string;
  certificate: string;
  status: string;
};

export const convertToCSV = (data: ProductData[]): string => {
  const headers = ['ID', 'Nom du Matériel', 'Utilisateur', 'Certificat', 'Statut'];
  const csvRows = [];
  
  csvRows.push(headers.join(','));
  
  for (const item of data) {
    const values = [
      item.id,
      `"${item.materialName}"`,
      `"${item.userInfo}"`,
      `"${item.certificate}"`,
      `"${item.status}"`
    ];
    csvRows.push(values.join(','));
  }
  
  return csvRows.join('\n');
};

export const downloadCSV = (data: ProductData[], filename = 'export.csv'): void => {
  const csvContent = convertToCSV(data);
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', filename);
  link.style.visibility = 'hidden';
  
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
