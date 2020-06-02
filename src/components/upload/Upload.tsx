import React, { FC, useRef, ChangeEvent, useState } from 'react';
import { Button } from '../Button/Button';
import axios from 'axios';
import { UploadList } from './UploadList';

export type UploadFileStatus = 'ready' | 'uploading' | 'success' | 'error';
export interface UploadFile {
  uid: string;
  size: number;
  name: string;
  status?: UploadFileStatus;
  percent?: number;
  raw?: File;
  response?: any;
  error?: any;
}
export interface UploadProps {
  action: string;
  defaultFileList?: UploadFile[];
  onProgress?: (percentage: number, file: File) => void;
  onSuccess?: (data: any, file: File) => void;
  onError?: (err: any, file: File) => void;
  beforUpload?: (file: File) => boolean | Promise<File>;
  onChange?: (file: File) => void;
  onRemove?: (file: UploadFile) => void;
}
export const Upload: FC<UploadProps> = (props) => {
  const {
    action,
    onProgress,
    onChange,
    beforUpload,
    onSuccess,
    onError,
    defaultFileList,
    onRemove,
  } = props;
  const fileInput = useRef<HTMLInputElement>(null);
  const [fileList, setFileList] = useState<UploadFile[]>(defaultFileList || []);

  const updateFileList = (
    updateFile: UploadFile,
    updateObj: Partial<UploadFile>
  ) => {
    setFileList((prevList) => {
      return prevList.map((file) => {
        if (file.uid === updateFile.uid) {
          return { ...file, ...updateObj };
        } else {
          return file;
        }
      });
    });
  };
  const handleClick = () => {
    if (fileInput.current) {
      fileInput.current.click();
    }
  };
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) {
      return;
    }
    uploadFiles(files);
    if (fileInput.current) {
      fileInput.current.value = '';
    }
  };
  const post = (file: File) => {
    let _file: UploadFile = {
      uid: Date.now() + 'upload-file',
      status: 'ready',
      name: file.name,
      size: file.size,
      percent: 0,
      raw: file,
    };
    setFileList((prevList) => {
      return [_file, ...prevList];
    });
    const formData = new FormData();
    formData.append(file.name, file);
    axios
      .post(action, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        onUploadProgress: (e) => {
          let percentage = Math.round((e.loaded * 100) / e.total) || 0;
          if (percentage < 100) {
            updateFileList(_file, { percent: percentage, status: 'uploading' });
            if (onProgress) {
              onProgress(percentage, file);
            }
          }
        },
      })
      .then((resp) => {
        updateFileList(_file, { status: 'success', response: resp.data });
        if (onSuccess) {
          onSuccess(resp.data, file);
        }
        if (onChange) {
          onChange(file);
        }
      })
      .catch((err) => {
        console.log(err);
        updateFileList(_file, {
          status: 'error',
          response: err,
        });

        if (onError) {
          onError(err, file);
        }
        if (onChange) {
          onChange(file);
        }
      });
  };
  const uploadFiles = (files: FileList) => {
    let postFiles = Array.from(files);
    postFiles.forEach((file) => {
      if (!beforUpload) {
        post(file);
      } else {
        const result = beforUpload(file);
        if (result && result instanceof Promise) {
          result.then((processedFile) => {
            post(processedFile);
          });
        } else if (result !== false) {
          post(file);
        }
      }
    });
  };
  const handleRemove = (file: UploadFile) => {
    setFileList((prevList) => {
      return prevList.filter((item) => item.uid !== file.uid);
    });
    if (onRemove) {
      onRemove(file);
    }
  };
  console.log(fileList);
  return (
    <div className='r-parts-upload'>
      <Button btnType='primary' onClick={handleClick}>
        upload file
      </Button>
      <input
        type='file'
        style={{ display: 'none' }}
        ref={fileInput}
        className='r-parts-file-input'
        onChange={handleFileChange}
      />
      <UploadList fileList={fileList} onRemove={handleRemove} />
    </div>
  );
};
