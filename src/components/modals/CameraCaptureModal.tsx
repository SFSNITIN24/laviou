import { Badge, Button, Modal } from "antd";
import { useCallback, useEffect, useRef, useState } from "react";
import { CameraOutlined, PictureOutlined } from "@ant-design/icons";
import Image from "next/image";

interface CameraCaptureModalProps {
  open: boolean;
  onClose: () => void;
  onCapture: (file: File) => void;
  title?: string;
}

export const CameraCaptureModal: React.FC<CameraCaptureModalProps> = ({
  open,
  onClose,
  onCapture,
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [loading, setLoading] = useState(true);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const startCamera = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "environment" },
        audio: false,
      });
      setStream(mediaStream);
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
    } catch (err) {
      console.error("Error accessing camera:", err);
      setError("Unable to access camera. Please check permissions.");
      alert("Unable to access camera. Please check permissions.");
    } finally {
      setLoading(false);
    }
  }, []);

  const stopCamera = useCallback(() => {
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
      setStream(null);
    }
  }, [stream]);

  const capturePhoto = () => {
    if (!videoRef.current || !canvasRef.current) return;

    const video = videoRef.current;
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");

    if (!context) return;

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    context.drawImage(video, 0, 0, canvas.width, canvas.height);

    const imageDataUrl = canvas.toDataURL("image/jpeg", 0.9);
    setCapturedImage(imageDataUrl);
  };

  const handleConfirmCapture = () => {
    if (!capturedImage) return;

    fetch(capturedImage)
      .then((res) => res.blob())
      .then((blob) => {
        const file = new File([blob], `capture-${Date.now()}.jpg`, {
          type: "image/jpeg",
        });
        onCapture(file);
        handleClose();
      })
      .catch((err) => {
        console.error("Error converting image:", err);
        alert("Failed to process image");
      });
  };

  const handleRetake = () => {
    setCapturedImage(null);
    startCamera();
  };

  const handleClose = () => {
    stopCamera();
    setCapturedImage(null);
    onClose();
  };

  useEffect(() => {
    if (open) {
      startCamera();
    } else {
      stopCamera();
    }

    return () => {
      stopCamera();
    };
  }, [open, startCamera, stopCamera]);

  return (
    <Modal
      open={open}
      onCancel={handleClose}
      footer={null}
      closable={false}
      centered
      width={600}
      rootClassName="modal-transparent"
    >
      <div className="flex flex-col gap-4 max-600:p-4 p-10 bg-white rounded-xl">
        <div className="relative bg-black rounded-xl overflow-hidden aspect-video">
          {loading && (
            <div className="absolute inset-0 flex items-center justify-center bg-black">
              Loading
            </div>
          )}

          {error && (
            <div className="absolute inset-0 flex items-center justify-center bg-black">
              <p className="text-white text-center px-4">{error}</p>
            </div>
          )}

          {!capturedImage ? (
            <video
              ref={videoRef}
              autoPlay
              playsInline
              muted
              className="w-full h-full object-cover rounded-xl"
            />
          ) : (
            <Image
              src={capturedImage}
              alt="Captured"
              className="w-full h-full object-cover"
            />
          )}

          <canvas ref={canvasRef} className="hidden" />
        </div>

        <div className="flex gap-3 justify-center">
          {!capturedImage ? (
            <Button
              icon={<CameraOutlined />}
              onClick={capturePhoto}
              disabled={loading || !!error}
              className="bg-primary! h-12! px-8! text-white"
            >
              Capture
            </Button>
          ) : (
            <>
              <Button onClick={handleRetake} className="w-full">
                Retake
              </Button>
              <Button
                icon={<Badge color="white" />}
                onClick={handleConfirmCapture}
                className="bg-primary! w-full"
              >
                Confirm
              </Button>
            </>
          )}
        </div>
      </div>
    </Modal>
  );
};

// Selection Modal - Choose between camera or gallery
interface SelectionModalProps {
  open: boolean;
  onClose: () => void;
  onSelectCamera: () => void;
  onSelectGallery: () => void;
}

const SelectionModal: React.FC<SelectionModalProps> = ({
  open,
  onClose,
  onSelectCamera,
  onSelectGallery,
}) => {
  return (
    <Modal
      open={open}
      onCancel={onClose}
      footer={null}
      closable={false}
      centered
      width={400}
      rootClassName="modal-transparent"
    >
      <div className="flex flex-col gap-2 p-8 bg-white rounded-xl">
        <h2 className="font-medium text-[28px] max-767:text-[22px] text-center">
          Upload License
        </h2>
        <p className="text-secondary text-base font-poppins text-center">
          Choose how you want to add your license
        </p>

        <div className="flex flex-col gap-3 my-4">
          <Button
            icon={<CameraOutlined className="text-lg" />}
            onClick={onSelectCamera}
            className="h-14! w-full bg-primary!"
          >
            Capture with Camera
          </Button>

          <Button
            icon={<PictureOutlined className="text-lg" />}
            onClick={onSelectGallery}
          >
            Choose from Device
          </Button>
        </div>

        <Button onClick={onClose} className="w-full mt-2">
          Cancel
        </Button>
      </div>
    </Modal>
  );
};

// Camera button component with selection modal
interface CameraCaptureButtonProps {
  onCapture: (file: File) => void;
  disabled?: boolean;
}

export const CameraCaptureButton: React.FC<CameraCaptureButtonProps> = ({
  onCapture,
  disabled = false,
}) => {
  const [selectionModalOpen, setSelectionModalOpen] = useState(false);
  const [cameraModalOpen, setCameraModalOpen] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleButtonClick = async () => {
    const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);

    if (isMobile) {
      fileInputRef.current?.click();
      return;
    }

    if (navigator?.mediaDevices && navigator?.mediaDevices?.enumerateDevices) {
      try {
        const devices = await navigator?.mediaDevices?.enumerateDevices();
        const hasCamera = devices.some(
          (device) => device.kind === "videoinput",
        );

        if (hasCamera) {
          setSelectionModalOpen(true);
        } else {
          fileInputRef.current?.click();
        }
      } catch (err) {
        console.log("Cannot access media devices:", err);
        fileInputRef.current?.click();
      }
    } else {
      fileInputRef.current?.click();
    }
  };

  const handleSelectCamera = async () => {
    setSelectionModalOpen(false);

    if (navigator?.mediaDevices && navigator?.mediaDevices?.getUserMedia) {
      try {
        const stream = await navigator?.mediaDevices?.getUserMedia({
          video: true,
        });
        stream.getTracks().forEach((track) => track.stop());
        setCameraModalOpen(true);
      } catch (err) {
        console.log("Camera not available:", err);
        alert("Camera access denied. Please allow camera permissions.");
      }
    } else {
      alert("Camera not supported on this device");
    }
  };

  const handleSelectGallery = () => {
    setSelectionModalOpen(false);
    fileInputRef.current?.click();
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const MAX_FILE_SIZE_MB = 10;
      const maxBytes = MAX_FILE_SIZE_MB * 1024 * 1024;

      if (!file.type.startsWith("image/")) {
        alert("Please select an image file");
        e.target.value = "";
        return;
      }

      if (file.size > maxBytes) {
        alert(`File must be ${MAX_FILE_SIZE_MB}MB or smaller!`);
        e.target.value = "";
        return;
      }

      onCapture(file);
    }
    e.target.value = "";
  };

  return (
    <>
      <button
        onClick={handleButtonClick}
        disabled={disabled}
        className="bg-[#F8F7F4] rounded-lg p-10 flex flex-col items-center justify-center text-center w-full"
      >
        <h1 className="text-[#6F7C5C] font-medium text-lg mb-1">
          Upload or take a photo.
        </h1>
        <p className="text-[#5C5C5C] text-xs">
          Capture a moment of your life you want to preserve forever.
        </p>
      </button>

      {/* Hidden file input for gallery selection */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileSelect}
        className="hidden!"
      />

      {/* Selection Modal */}
      <SelectionModal
        open={selectionModalOpen}
        onClose={() => setSelectionModalOpen(false)}
        onSelectCamera={handleSelectCamera}
        onSelectGallery={handleSelectGallery}
      />

      {/* Camera Capture Modal */}
      <CameraCaptureModal
        open={cameraModalOpen}
        onClose={() => setCameraModalOpen(false)}
        onCapture={(file) => {
          onCapture(file);
          setCameraModalOpen(false);
        }}
        title="Scan License"
      />
    </>
  );
};
