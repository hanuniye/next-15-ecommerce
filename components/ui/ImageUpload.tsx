"use client";

import { useEffect, useState } from "react";
import { ImagePlus, Trash } from "lucide-react";
import { CldUploadWidget } from "next-cloudinary";
import Image from "next/image";

import { Button } from "@/components/ui/button";

interface ImageUplaodProps {
  disabled?: boolean;
  onChange: (value: string) => void;
  onRemove: (value: string) => void;
  value: string[];
}

const ImageUpload = ({
  onChange,
  onRemove,
  value,
  disabled,
}: ImageUplaodProps) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleUpload = (result: any) => {
    console.log(result.info.secure_url);
    onChange(result.info.secure_url);
  };

  if (!isMounted) {
    return null;
  }

  return (
    <div>
      <div className="mb-4 flex items-center gap-4">
        {value.map((url) => (
          <div
            key={url}
            className="relative w-[200px] h-[200px] rounded-md overflow-hidden"
          >
            <div className="z-10 absolute top-2 right-2">
              <Button
                type="button"
                onClick={() => onRemove(url)}
                variant="destructive"
                size="icon"
              >
                <Trash className="w-4 h-4" />
              </Button>
            </div>
            <Image fill alt="image" src={url} className="object-cover" />
          </div>
        ))}
      </div>
      <CldUploadWidget
        onSuccess={handleUpload}
        uploadPreset="admin-dash-next_15"
      >
        {({ open }) => {
          return (
            <Button
              type="button"
              disabled={disabled}
              onClick={() => open()}
              variant="secondary"
            >
              <ImagePlus className="w-4 h-4 mr-2" />
              Upload an image
            </Button>
          );
        }}
      </CldUploadWidget>
    </div>
  );
};

export default ImageUpload;
