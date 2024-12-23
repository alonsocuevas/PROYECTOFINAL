'use client';
import { IDetectedBarcode, Scanner } from "@yudiel/react-qr-scanner";

interface QRScannerProps {
  width?: string;
  onScan: (detectedCodes : IDetectedBarcode[]) => void;
}

export default function QRScanner({ width, onScan } : QRScannerProps) {

  return (
     <div style={{
      width: width,
     }}>
        <Scanner 
          onScan={(detectedCodes) => onScan(detectedCodes)}
          paused={false}
          formats={[
            'qr_code',
            'micro_qr_code',
            'rm_qr_code',
            'maxi_code',
            'pdf417',
            'aztec',
            'data_matrix',
            'matrix_codes',
            'dx_film_edge',
            'databar',
            'databar_expanded',
            'codabar',
            'code_39',
            'code_93',
            'code_128',
            'ean_8',
            'ean_13',
            'itf',
            'linear_codes',
            'upc_a',
            'upc_e'
          ]}

          components={{
            audio: true,
            onOff: true,
            zoom: true,
            finder: true,
          }}

          scanDelay={1000}
          allowMultiple={true}
          />
     </div>
  );
}