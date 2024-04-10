import React, { useState, useCallback, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import * as yup from "yup";

const UploadImageDropzone = ({
  name,
  register,
  setValue,
  setError,
  clearErrors,
  watch,
  schema,
}) => {
  const [files, setFiles] = useState([]);

  const onDrop = useCallback((acceptedFiles) => {
    const new_files = acceptedFiles.map((file) =>
      Object.assign(file, {
        preview: URL.createObjectURL(file),
      })
    );
    setFiles(new_files);
    setValue(name, new_files);
  }, []);

  const bytes_to_mb = (bytes) => {
    return (bytes / (1024 * 1024)).toFixed(1); // 1 MB = 1024 * 1024 bytes
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: { "image/png": [".png"], "image/jpeg": [".jpeg", ".jpg"] },
    maxSize: 1024 * 1024 * 5,
    maxFiles: 1,
  });

  useEffect(() => {
    // Make sure to revoke the data uris to avoid memory leaks, will run on unmount
    return () => files.forEach((file) => URL.revokeObjectURL(file.preview));
  }, []);

  const handle_click_remove_file_btn = (e, file) => {
    e.stopPropagation();
    const new_files = [...files];
    const file_index = files.indexOf(file);
    new_files.splice(file_index, 1);

    setFiles(new_files);
    setValue(name, new_files);
  };

  useEffect(() => {
    if (watch(name)) {
      try {
        const value = watch(name);
        // selecting the rule to only validate the input register with the contenct of var name
        yup.reach(schema, name).validateSync(value);
        clearErrors(name);
      } catch (error) {
        setError(name, { message: error.message });
      }
    }
  }, [watch(name)]);

  return (
    <div
      {...getRootProps()}
      className="flex flex-col justify-center border-2 border-gray-300 p-4 border-dashed rounded cursor-pointer"
    >
      <input id={name} {...register(name)} {...getInputProps()} />

      {files.length == 0 && (
        <div className="flex flex-col justify-center items-center py-16">
          <p>Arrastra tu imagen aqui</p>
          <span className="block text-center">o</span>
          <div className="bg-indigo-100 hover:bg-indigo-200 mt-1 text-indigo-500 btn">
            Selecciona una imagen
          </div>
        </div>
      )}

      <div className="gap-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {files.map((file, i) => {
          return (
            <div
              key={i}
              className="justify-center items-center shadow border rounded divide-y divide-gray-300 text-center text-xs"
            >
              <div className="p-2">
                <img
                  src={file.preview}
                  className="m-auto w-32 h-32 object-cover"
                  // Revoke data uri after image is loaded
                  onLoad={() => {
                    //URL.revokeObjectURL(file.preview);
                  }}
                />
              </div>
              <div className="p-2 text-left">
                <span title={file.name} className="block">
                  {file.name.substring(0, 20)}...
                </span>
                <span className="block font-bold text-gray-400 italic">
                  {bytes_to_mb(file.size)} MB
                </span>
              </div>
              <div>
                <button
                  onClick={(e) => {
                    handle_click_remove_file_btn(e, file);
                  }}
                  className="block hover:bg-slate-200 p-1 w-full font-bold text-red-400 transition-all duration-300 ease-in-out"
                >
                  Eliminar
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default UploadImageDropzone;
