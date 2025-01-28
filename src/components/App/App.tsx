import s from './App.module.scss';
import { InputLink } from "./InputLink/InputLink.tsx";
import { useState } from "react";
import { QR } from "./QR/QR.tsx";
import CustomSettings from './CustomSettings/CustomSettings';
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import {TQualityQRLevel} from "./common/types.ts";

function App() {
  console.log('App')
  const [link, setLink] = useState<string>('');
  const [bgColor, setBgColor] = useState<string>('#ffffff');
  const [fgColor, setFgColor] = useState<string>('#000000');
  const [size, setSize] = useState<number>(256);
  const [level, setLevel] = useState<TQualityQRLevel>('H');

  const getLink = (link: string) => setLink(link);

  return (
    <div className={s.container}>
      <h1 className={s.header}>Введите ссылку и получите QR код</h1>
      <InputLink linkCB={getLink} />

      {link && (
        <>
          <QR
            value={link}
            size={size}
            bgColor={bgColor}
            fgColor={fgColor}
            level={level}
          />
          <CustomSettings
            setBgColor={setBgColor}
            setFgColor={setFgColor}
            setSize={setSize}
            setLevel={setLevel}
          />
        </>
      )}
      <ToastContainer/>
    </div>
  );
}

export default App;
