import { ChangeEvent, useState } from 'react'
import { useDispatch } from 'react-redux'
import { setUserImage } from '../../../../store/slices/qrSlice.ts'
import s from './CustomImageUpload.module.scss'
import { Button } from '../../common/Button/Button.tsx'
import { useTranslation } from '../../../../utils/customHooks.ts'
import { validateDirectImageUrl } from '../../../../utils/validators.ts'

type Props = {
  handleImageUploadCB: () => void
}

export const CustomImageUpload = ({ handleImageUploadCB }: Props) => {
  const dispatch = useDispatch()
  const { t } = useTranslation()

  const [imageUrl, setImageUrl] = useState<string>('')
  const [isValidImage, setIsValidImage] = useState<boolean>(false)

  const handleUrlChange = async (e: ChangeEvent<HTMLInputElement>) => setImageUrl(e.target.value.trim())

  const handleBlurValidation = async () => {
    const isValid = await validateDirectImageUrl(imageUrl, setIsValidImage)
    if (isValid) {
      setIsValidImage(true)
    }
  }

  const handleImageUpload = async () => {
    const isValid = await validateDirectImageUrl(imageUrl, setIsValidImage)
    if (isValid) {
      setIsValidImage(true)
      dispatch(setUserImage(imageUrl))
      handleImageUploadCB()
      setImageUrl('')
    }
  }

  const handleImageLoadError = () => console.error('Ошибка загрузки лого')

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
          onBlur={handleBlurValidation}
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
            <img src={imageUrl} alt="" className={s.imageUrl} onError={handleImageLoadError} />
          </figure>
        )}

        {imageUrl && isValidImage && (
          <Button title={t('buttonTitleAddLogoToQR')} onClickCB={handleImageUpload} disabled={!isValidImage} />
        )}
      </div>
    </div>
  )
}
