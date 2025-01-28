import s from './App.module.scss';
import {InputLink} from "./InputLink/InputLink.tsx";
import {QR} from "./QR/QR.tsx";
import CustomSettings from './CustomSettings/CustomSettings';
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import {useSelector} from "react-redux";
import {RootState} from "../../store/store.ts";

function App() {
  const link = useSelector((state: RootState) => state.qr.link)

  return (
    <div className={s.container}>
      <h1 className={s.header}>Введите ссылку и получите QR код</h1>
      <InputLink />
      {link && (
        <>
          <QR link={link}/>
          <CustomSettings/>
        </>
      )}
      <ToastContainer/>
    </div>
  );
}

export default App;
