export const useFormatDate = () => {
  const formatDate = (seconds: number) => {
    const date = new Date(seconds * 1000)
    const day = date.getDay()
    const month = date.getMonth()
    const year = date.getFullYear()
    return `${day > 9 ? day : `0${day}`}/${month > 9 ? month : `0${month}`}/${year}`
  }

  return { formatDate }
}
