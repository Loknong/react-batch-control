import { useState } from "react";

import {
  Scanner,
  IDetectedBarcode,
  IScannerStyles,
} from "@yudiel/react-qr-scanner";
import QRCode from "react-qr-code";
import "./App.css";

interface QRData {
  endpoint: string;
  userId: string;
  additionalInfo?: string; // Add any additional information you want here
}
const styles: IScannerStyles = {
  container: {
    width: 400,
    margin: "auto",
  },
};

const handleScan = (results: IDetectedBarcode[]) => {
  if (results.length > 0) {
    const result = results[0]; // Take the first detected barcode
    // window.location.href = `${result.rawValue}`;
    window.alert(`${result.rawValue}`);

    console.log("Parse", JSON.parse(result.rawValue));
  }
};

function App() {
  const [qrData, setQrData] = useState<string | null>(null);
  const [endpoint, setEndpoint] = useState<string>("");
  const [userId, setUserId] = useState<string>("");
  const [additionalInfo, setAdditionalInfo] = useState<string>("");
  const [turnOff, setTurnOff] = useState<boolean>(false);

  const generateQRCodeData = (
    endpoint: string,
    userId: string,
    additionalInfo: string
  ): string => {
    const data: QRData = {
      endpoint,
      userId,
      additionalInfo,
    };
    return JSON.stringify(data);
  };

  const handleGenerateQR = () => {
    const data = generateQRCodeData(endpoint, userId, additionalInfo);
    setQrData(data);
  };

  return (
    <>
      <div>
        <div>
          <label>
            Endpoint:
            <input
              type="text"
              value={endpoint}
              onChange={(e) => setEndpoint(e.target.value)}
            />
          </label>
          <br />
          <label>
            User ID:
            <input
              type="text"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
            />
          </label>
          <br />
          <label>
            Additional Info:
            <input
              type="text"
              value={additionalInfo}
              onChange={(e) => setAdditionalInfo(e.target.value)}
            />
          </label>
          <br />
          <button onClick={handleGenerateQR}>Generate QR Code</button>
        </div>
        <div>{qrData && <QRCode value={qrData} />}</div>
        <div>
          <button
            onClick={() => {
              setTurnOff(!turnOff);
            }}
          >
            Start Scan
          </button>
        </div>
        {turnOff && (
          <Scanner
            styles={styles}
            onScan={handleScan}
            formats={[
              "qr_code",
              "micro_qr_code",
              "rm_qr_code",
              "maxi_code",
              "pdf417",
              "aztec",
              "data_matrix",
              "matrix_codes",
              "dx_film_edge",
              "databar",
              "databar_expanded",
              "codabar",
              "code_39",
              "code_93",
              "code_128",
              "ean_8",
              "ean_13",
              "itf",
              "linear_codes",
              "upc_a",
              "upc_e",
            ]}
          />
        )}
      </div>
    </>
  );
}

export default App;
