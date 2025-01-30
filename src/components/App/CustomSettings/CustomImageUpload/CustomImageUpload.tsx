import { ChangeEvent, useState } from 'react'
import { useDispatch } from 'react-redux'
import { setUserImage } from '../../../../store/slices/qrSlice.ts'
import { toast } from 'react-toastify'
import s from './CustomImageUpload.module.scss'
import { Button } from '../../common/Button/Button.tsx'
import { toastConfig } from '../../../../utils/constants.ts'
import { useTranslation } from '../../../../utils/customHooks.ts'

type Props = {
  handleImageUploadCB: () => void
}

export const CustomImageUpload = ({ handleImageUploadCB }: Props) => {
  const dispatch = useDispatch()
  const [imageUrl, setImageUrl] = useState<string>('')
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [isValidImage, setIsValidImage] = useState<boolean>(false)
  const [error, setError] = useState<boolean>(false)
  const { t } = useTranslation()

  const isDirectImageLink = (url: string): boolean => {
    return /\.(jpeg|jpg|png|gif|webp|bmp|svg)$/i.test(url)
  }

  const checkImageMimeType = async (url: string): Promise<boolean> => {
    try {
      const response = await fetch(url, { method: 'HEAD' })
      const contentType = response.headers.get('Content-Type')
      return contentType?.startsWith('image/') || false
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error(`Ошибка при проверке MIME-типа изображения: ${error.message}`)
        toast.error('Ссылка не ведёт на прямую к файлу с изображением', toastConfig)
        setError(true)
      } else {
        toast.error('Неизвестная ошибка при проверке MIME-типа изображения', toastConfig)
        setError(true)
      }
      return false
    }
  }

  const handleUrlChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const url = e.target.value.trim()
    const urlMatch = url.match(/https?:\/\/(?:[a-zA-Z0-9-]+\.)+[a-zA-Z]{2,6}(?:\/[^\s]*)?/)
    const validUrl = urlMatch ? urlMatch[0] : ''

    setImageUrl(validUrl)

    if (!validUrl || !isDirectImageLink(validUrl)) {
      toast.info('Введите корректную ссылку ;)', toastConfig)
      setError(true)
      setIsValidImage(false)
      return
    }

    const isValid = await checkImageMimeType(validUrl)
    setIsValidImage(isValid)
    setError(!isValid)
  }

  const handleImageUpload = async () => {
    if (error) {
      toast.info('Введите корретную ссылку ;)', toastConfig)
      return
    }

    if (!imageUrl) {
      toast.info('Изображение не загружено', toastConfig)
      setError(true)
      return
    }

    setIsLoading(true)

    if (!isValidImage) {
      toast.info('Ссылка не является прямой ссылкой на изображение', toastConfig)
      setIsLoading(false)
      setError(true)
      return
    }

    dispatch(setUserImage(imageUrl))
    toast.info('Лого добавилось на QR', toastConfig)
    toast.info('Для отображения лого .gif может понадобиться больше времени', toastConfig)
    handleImageUploadCB()
    setImageUrl('')
    setIsValidImage(false)
    setIsLoading(false)
    setError(false)
  }

  const handleImageLoad = () => setIsLoading(false)

  return (
    <div className={s.container}>
      <div className={s.inputUrlBox}>
        <label htmlFor="url-input">{t('labelImageUpload')}</label>
        <span>{t('labelImageUploadFormat')}</span>
        <input
          type="text"
          id="url-input"
          placeholder={t('placeholderInputImageToQr')}
          onChange={handleUrlChange}
          className={s.inputUrl}
          value={imageUrl}
          maxLength={2084}
        />
      </div>

      <div className={s.imageAndButtonContainer}>
        {imageUrl && isValidImage && (
          <figure className={`${s.previewBox} ${imageUrl && isValidImage ? s.previewBoxVisible : ''}`}>
            <figcaption className={s.previewBoxCaption}>
              <p>{t('figcaptionFirstP')}</p>
              <p>{t('figcaptionSecondP')}</p>
            </figcaption>
            {isLoading && <div className={s.spinner}></div>}
            <img src={imageUrl} alt="" className={s.imageUrl} onLoad={handleImageLoad} />
          </figure>
        )}

        {imageUrl && isValidImage && (
          <Button title={t('buttonTitleAddLogoToQR')} onClickCB={handleImageUpload} disabled={error} />
        )}
      </div>
    </div>
  )
}
