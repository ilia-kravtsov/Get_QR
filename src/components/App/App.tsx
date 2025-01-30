import s from './App.module.scss';
import {GetUserLink} from "./GetUserLink/GetUserLink.tsx";
import {QR} from "./QR/QR.tsx";
import CustomSettings from './CustomSettings/CustomSettings';
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import {useDispatch, useSelector} from "react-redux";
import {BriefHistory} from "./BriefHistory/BriefHistory.tsx";
import {Footer} from "./Footer/Footer.tsx";
import {Contacts} from "./Contacts/Contacts.tsx";
import {selectUserLink} from "../../store/selectors.ts";
import {changeLanguage} from "../../store/slices/languageSlice.ts";
import {Button} from "./common/Button/Button.tsx";
import {useTranslation} from "../../utils/customHooks.ts";
import ThemeToggle from "./Theme/ThemeToggle.tsx";
import {useRef} from "react";
import {CustomToggle} from "./common/CustomToggle/CustomToggle.tsx";

function App() {
  const dispatch = useDispatch();
  const userLink = useSelector(selectUserLink)
  const { t, language } = useTranslation();
  const targetRef = useRef<HTMLDivElement>(null);

  const onClickLanguageChange = () => dispatch(changeLanguage(language === 'ru' ? 'en' : 'ru'));

  const handleImageUpload = () => {
    if (targetRef.current) {
      targetRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div className={s.container}>
      <div className={s.header}>
        <ThemeToggle/>
        <Button title={t('languageType')} onClickCB={onClickLanguageChange} width={80}/>
      </div>
      <h1 className={s.headerTitle}>{t('header')}</h1>
      <GetUserLink ref={targetRef}/>
      {userLink && (
        <>
          <QR userLink={userLink}/>
          <CustomSettings handleImageUpload={handleImageUpload}/>
        </>
      )}
      <BriefHistory/>
      <Contacts/>
      <Footer/>
      <ToastContainer/>
    </div>
  );
}

export default App;
