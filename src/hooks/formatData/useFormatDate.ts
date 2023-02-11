export const useFormatDate = () => {
  const formatDate = (createdAt: { seconds: number; nanoseconds: number }) => {
    const date = new Date(createdAt.seconds * 1000 + createdAt.nanoseconds / 1000000)

    return date.toLocaleString('pt-BR', { day: 'numeric', month: 'numeric', year: 'numeric' })
  }

  return { formatDate }
}
