export const isValidURL = (url: string): boolean => {
  const regex = /^(https?:\/\/)?([\w-]+\.)+[a-zA-Z]{2,}(\/[\w-./?%&=]*)?$/i
  return regex.test(url) && url === url.trim()
}
