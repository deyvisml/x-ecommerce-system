import React, { useState, useCallback, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import * as yup from "yup";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useTranslation } from "react-i18next";

const UploadImageDropzone = ({
  name,
  register,
  setValue,
  setError,
  clearErrors,
  watch,
  schema,
}) => {
  const { t } = useTranslation();
  // https://chatgpt.com/c/9dd3d43c-aa60-4991-9abd-90a295dfabc0
  const onDrop = useCallback(
    (acceptedFiles) => {
      const validFilesPromises = acceptedFiles.map((file) => {
        return new Promise((resolve, reject) => {
          const img = new Image();
          img.src = URL.createObjectURL(file);

          img.onload = () => {
            if (img.width >= 800 && img.height >= 800) {
              resolve(
                Object.assign(file, {
                  preview: img.src,
                })
              );
            } else {
              reject(
                new Error("Las dimensiones de la imagen son muy pequeñas")
              );
            }
          };

          img.onerror = () => {
            reject(new Error("Error al cargar la imagen"));
          };
        });
      });

      Promise.all(validFilesPromises)
        .then((newFiles) => {
          const current_files = watch(name);
          let aux_files = null;
          if (current_files && current_files.length > 0)
            aux_files = [...current_files, ...newFiles];
          else aux_files = newFiles;

          setValue(name, aux_files);
        })
        .catch((error) => {
          console.error(error.message);
          toast.error(error.message);
        });
    },
    [setValue, watch, name]
  );

  const bytes_to_mb = (bytes) => {
    return (bytes / (1024 * 1024)).toFixed(1); // 1 MB = 1024 * 1024 bytes
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: { "image/png": [".png"], "image/jpeg": [".jpeg", ".jpg"] },
    maxSize: 1024 * 1024 * 5,
    maxFiles: 3,
  });

  useEffect(() => {
    // Make sure to revoke the data uris to avoid memory leaks, will run on unmount
    return () =>
      watch(name)?.forEach((file) => URL.revokeObjectURL(file.preview));
  }, []);

  const handle_click_remove_file_btn = (e, file) => {
    e.stopPropagation();
    const new_files = [...watch(name)];
    const file_index = watch(name).indexOf(file);
    new_files.splice(file_index, 1);

    setValue(name, new_files);
  };

  useEffect(() => {
    if (watch(name)) {
      try {
        const value = watch(name);
        // selecting the rule to only validate the input register with the content of var name
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

      {(!watch(name) || watch(name).length == 0) && (
        <div className="flex flex-col justify-center items-center py-16">
          <p>{t("upload_image_dropzone.drag_image_here")}</p>
          <span className="block text-center">
            {t("upload_image_dropzone.or")}
          </span>
          <div className="bg-indigo-100 hover:bg-indigo-200 mt-1 text-indigo-500 btn">
            {t("upload_image_dropzone.choose_image")}
          </div>
        </div>
      )}

      <div className="gap-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {watch(name) &&
          watch(name).map((file, i) => {
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
                    {file && file.name?.substring(0, 20)}...
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
