import { toast } from 'react-toastify'
import { toastConfig } from './constants.ts'

export const isValidURL = (url: string): boolean => {
  const regex = /^(https?:\/\/)?([\w-]+\.)+[a-zA-Z]{2,}(\/[\w-./?%&=]*)?$/i
  return regex.test(url) && url === url.trim()
}

export const isDirectImageLink = (url: string): boolean => {
  return /\.(jpeg|jpg|png|gif|webp|bmp|svg)$/i.test(url)
}

export const checkImageMimeType = async (url: string, setIsValidImageCB: (value: boolean) => void): Promise<boolean> => {
  try {
    const response = await fetch(url, { method: 'HEAD' })
    const contentType = response.headers.get('Content-Type')
    return contentType?.startsWith('image/') || false
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error(`Ошибка при проверке MIME-типа изображения: ${error.message}`)
      toast.error('Ссылка не ведёт на прямую к файлу с изображением', toastConfig)
      setIsValidImageCB(false)
    } else {
      toast.error('Неизвестная ошибка при проверке MIME-типа изображения', toastConfig)
      setIsValidImageCB(false)
    }
    return false
  }
}

export const validateImageUrl = async (url: string, setIsValidImageCB: (value: boolean) => void) => {
  if (!url) {
    toast.info('Введите корректную ссылку ;)', toastConfig);
    setIsValidImageCB(false);
    return false;
  }

  if (!isValidURL(url)) {
    toast.error('Некорректная ссылка', toastConfig);
    setIsValidImageCB(false);
    return false;
  }

  if (!isDirectImageLink(url)) {
    toast.info('Ссылка не является прямой ссылкой на изображение', toastConfig);
    setIsValidImageCB(false);
    return false;
  }

  if (url.toLowerCase().endsWith('.gif')) {
    toast.info('Для отображения лого .gif может понадобиться больше времени', toastConfig);
  }

  const isMimeTypeValid = await checkImageMimeType(url, setIsValidImageCB);
  if (!isMimeTypeValid) {
    toast.info('Ссылка не является прямой ссылкой на изображение', toastConfig);
    setIsValidImageCB(false);
    return false;
  }

  return true;
};
