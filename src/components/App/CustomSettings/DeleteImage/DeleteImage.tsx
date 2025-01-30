import {Button} from "../../common/Button/Button.tsx";
import {useDispatch, useSelector} from "react-redux";
import {deleteUserImageLink} from "../../../../store/slices/qrSlice.ts";
import {useTranslation} from "../../../../utils/customHooks.ts";
import {selectUserImageLink} from "../../../../store/selectors.ts";
import {toast} from "react-toastify";
import {toastConfig} from "../../../../utils/constants.ts";

export const DeleteImage = () => {
	const dispatch = useDispatch()
	const { t } = useTranslation();
	const userImageLink = useSelector(selectUserImageLink);
	const deleteImage = () => {
		if (userImageLink) {
			dispatch(deleteUserImageLink(''))
		} else {
			toast.info('Сначала загрузите изображение в поле ниже.', toastConfig);
		}
	}
	return (
		<Button onClickCB={deleteImage} title={t('buttonTitleDeleteImage')} disabled={!userImageLink}/>
	);
};

