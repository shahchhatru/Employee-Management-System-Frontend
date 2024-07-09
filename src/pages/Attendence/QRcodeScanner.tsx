import { useState } from "react";
import { useCheckAttendenceMutation } from "@/store/AttendenceSlice";
import { useDispatch } from "react-redux";
import { setQrCode } from "@/store/QRcodeSlice";
import QrScanner from "react-qr-scanner";
import { toast } from "sonner";

const QrCodeScanner = () => {
  const [scanResult, setScanResult] = useState(null);
  const [checkAttendence, { isError, isSuccess, data: response }] =
    useCheckAttendenceMutation();
  const dispatch = useDispatch();

  const handleScan = (data: any) => {
    if (data) {
      console.log({ data });
      setScanResult(data?.text);
      dispatch(setQrCode(data?.text));
      checkAttendence({ token: data.text, status: "PRESENT" });
      if (isError) {
        toast.error("Something went wrong" + JSON.stringify(response));
      } else if (isSuccess) {
        toast.success(
          "Attendence checked successfully" + JSON.stringify(response)
        );
      }
    }
  };

  const handleError = (err: any) => {
    console.error(err);
  };

  return (
    <div className="flex flex-col items-center justify-center w-full h-screen p-4">
      <h1 className="text-2xl mb-4">QR Code Scanner</h1>
      <div className="w-full max-w-md">
        <QrScanner
          delay={300}
          onError={handleError}
          onScan={handleScan}
          style={{ width: "100%" }}
        />
      </div>
      {scanResult && (
        <p className="mt-4 text-center">Scanned Result: {scanResult}</p>
      )}
    </div>
  );
};

export default QrCodeScanner;
