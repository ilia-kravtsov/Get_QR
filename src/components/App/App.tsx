import s from './App.module.scss';
import {GetUserLink} from "./GetUserLink/GetUserLink.tsx";
import {QR} from "./QR/QR.tsx";
import CustomSettings from './CustomSettings/CustomSettings';
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import {useSelector} from "react-redux";
import {BriefHistoricalInformation} from "./BriefHistoricalInformation/BriefHistoricalInformation.tsx";
import {Footer} from "./Footer/Footer.tsx";
import {Contacts} from "./Contacts/Contacts.tsx";
import {selectUserLink} from "../../store/selectors.ts";
import {ThemeProvider} from "./Theme/ThemeProvider.tsx";

function App() {
  const userLink = useSelector(selectUserLink)

  return (
    <div className={s.container}>
      <h1 className={s.header}>Введите ссылку и получите QR код</h1>
      <GetUserLink/>
      {userLink && (
        <>
          <QR userLink={userLink}/>
          <CustomSettings/>
        </>
      )}
      <BriefHistoricalInformation/>
      <ThemeProvider>
        <Contacts/>
      </ThemeProvider>
      <Footer/>
      <ToastContainer/>
    </div>
  );
}

export default App;
