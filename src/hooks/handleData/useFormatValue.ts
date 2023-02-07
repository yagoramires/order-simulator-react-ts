export const useFormatValue = () => {
  const formatValue = (value: number) => {
    return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
  }

  return { formatValue }
}
