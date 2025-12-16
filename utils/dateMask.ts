// Função para aplicar máscara de data DD/MM/YYYY
export const applyDateMask = (value: string): string => {
  // Remove tudo que não é número
  const numbers = value.replace(/\D/g, '');

  // Aplica a máscara
  if (numbers.length <= 2) {
    return numbers;
  } else if (numbers.length <= 4) {
    return `${numbers.slice(0, 2)}/${numbers.slice(2)}`;
  } else {
    return `${numbers.slice(0, 2)}/${numbers.slice(2, 4)}/${numbers.slice(4, 8)}`;
  }
};

// Função para converter string com máscara para Date
export const parseDateFromMask = (value: string): Date | null => {
  const numbers = value.replace(/\D/g, '');
  
  if (numbers.length !== 8) {
    return null;
  }

  const day = parseInt(numbers.slice(0, 2), 10);
  const month = parseInt(numbers.slice(2, 4), 10) - 1; // Mês começa em 0
  const year = parseInt(numbers.slice(4, 8), 10);

  // Validação básica
  if (day < 1 || day > 31 || month < 0 || month > 11 || year < 1900 || year > 2100) {
    return null;
  }

  const date = new Date(year, month, day);
  
  // Verifica se a data é válida
  if (
    date.getDate() !== day ||
    date.getMonth() !== month ||
    date.getFullYear() !== year
  ) {
    return null;
  }

  return date;
};

// Função para formatar Date para máscara DD/MM/YYYY
export const formatDateToMask = (date: Date | null): string => {
  if (!date) return '';
  
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const year = date.getFullYear();
  
  return `${day}/${month}/${year}`;
};


