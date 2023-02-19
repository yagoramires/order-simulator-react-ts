import { IClients } from '../../interfaces'

export const useCalculateDiscount = () => {
  const calculatePriceWithDiscount = (price: number, code: string, selectedClient: IClients) => {
    if (!selectedClient) return price

    let discount = price
    // console.log('VALOR CHEIO: ' + discount)

    if (selectedClient.discountA) {
      discount =
        selectedClient.discountA > 0
          ? discount - discount * (selectedClient.discountA / 100)
          : discount
    }
    discount = Number(discount.toFixed(8))
    // console.log('VALOR DESCONTO A: ' + discount)

    if (selectedClient.discountB) {
      discount =
        selectedClient.discountB > 0
          ? discount - discount * (selectedClient.discountB / 100)
          : discount
    }

    discount = Number(discount.toFixed(8))
    // console.log('VALOR DESCONTO B: ' + discount)

    if (selectedClient.discountC) {
      discount =
        selectedClient.discountC > 0
          ? discount - discount * (selectedClient.discountC / 100)
          : discount
    }
    discount = Number(discount.toFixed(8))
    // console.log('VALOR DESCONTO C: ' + discount)

    // if (selectedClient.network) {
    //   const getClientNetwork = networks.filter(
    //     (network) => network.name?.toLowerCase() === selectedClient.network?.toLowerCase(),
    //   )

    //   const productsFilter = getClientNetwork[0]?.products?.filter(
    //     (product) => product.code === String(code),
    //   )

    //   if (productsFilter && productsFilter?.length > 0) {
    //     const value = productsFilter[0].discount
    //     discount = value && value > 0 ? discount - discount * (value / 100) : discount
    //   }
    // }
    // else if (!selectedClient.network || selectedClient.network === 'undefined') {
    //   const getClientNetwork = networks.filter((network) => network.name === 'DESCONTO MÁXIMO')

    //   const productsFilter = getClientNetwork[0]?.products?.filter(
    //     (product) => product.code === String(code),
    //   )

    //   if (productsFilter && productsFilter?.length > 0) {
    //     const value = productsFilter[0].discount
    //     discount = value && value > 0 ? discount - discount * (value / 100) : discount
    //   }
    // }
    // console.log('VALOR DESCONTO REDE: ' + discount)

    // if (selectedClient.engefer) {
    //   discount = discount * 1.12
    // }
    // discount = Number(discount.toFixed(8))
    // console.log('VALOR ADICIONAL ENGEFER' +discount)

    return discount
  }
  return { calculatePriceWithDiscount }
}
