// La Barcode Detection API non è ancora nei tipi DOM standard di TypeScript.
interface DetectedBarcode {
  rawValue: string;
  format: string;
}

interface BarcodeDetectorOptions {
  formats?: string[];
}

declare class BarcodeDetector {
  constructor(options?: BarcodeDetectorOptions);
  static getSupportedFormats(): Promise<string[]>;
  detect(source: CanvasImageSource): Promise<DetectedBarcode[]>;
}

interface Window {
  BarcodeDetector?: typeof BarcodeDetector;
}
