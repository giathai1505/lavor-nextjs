"use client";
import React, { useEffect, useState } from "react";
import { Editor } from "@tinymce/tinymce-react";
import axios from "axios";
const cloudName = "nonenone25251325zz";
const unsignedUploadPreset = "adz8s31b";
import "./editor.css";

function CustomEditor({ setValue, value }) {
  const [state, setState] = useState({
    content: "",
    saved: false,
    post: {
      description: "",
    },
    urlImage: "",
    loading: false,
  });

  const [isClient, setIsClient] = useState(false);
  const _handleEditorChange = (content, editor) => {
    setState({ ...state, content: content });
    setValue(content);
  };

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    setState({ ...state, content: value });
  }, [value]);

  useEffect(() => {
    const input = document.getElementsByTagName("input");
    if (state.loading && input) {
      input.disabled = true;
    } else if (!state.loading && input) {
      input.disabled = false;
    }
  });

  if (!isClient) return;

  return (
    <div className="App">
      <div style={{ width: "100%" }}>
        <Editor
          apiKey={`84mzwz95p2153mijzz37ax0vqgwiwukfr5xzyqlvrnwvq62d`}
          init={{
            height: 600,
            menubar: true,
            images_upload_base_path: `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
            images_upload_credentials: true,
            plugins: [
              "advlist autolink lists link image charmap print preview anchor",
              "searchreplace visualblocks code fullscreen",
              "insertdatetime media table paste code help wordcount",
            ],
            toolbar: `undo redo| link code image | formatselect | bold italic forecolor backcolor | \
                alignleft aligncenter alignright alignjustify | \
                bullist numlist outdent indent | removeformat | help`,
            image_title: true,
            automatic_uploads: true,
            file_picker_types: "image",
            file_picker_callback: function (cb, value, meta) {
              var input = document.createElement("input");
              input.setAttribute("type", "file");
              input.setAttribute("accept", "image/*");
              var url = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`;
              var xhr = new XMLHttpRequest();
              var fd = new FormData();
              xhr.open("POST", url, true);

              input.onchange = function () {
                var file = this.files[0];
                var reader = new FileReader();
                xhr.onload = function () {
                  if (xhr.readyState === 4 && xhr.status === 200) {
                    // File uploaded successfully
                    var response = JSON.parse(xhr.responseText);

                    //https://res.cloudinary.com/cloudName/image/upload/v1483481128/public_id.jpg
                    var url = response.secure_url;

                    cb(url, { title: response.original_filename });
                  }
                };

                reader.onload = function () {
                  var id = "blobid" + new Date().getTime();
                  var blobCache =
                    window.tinymce.activeEditor.editorUpload.blobCache;
                  var base64 = reader.result.split(",")[1];

                  var blobInfo = blobCache.create(id, file, base64);
                  blobCache.add(blobInfo);

                  // call the callback and populate the Title field with the file name

                  fd.append("upload_preset", unsignedUploadPreset);
                  fd.append("tags", "browser_upload");
                  fd.append("file", blobInfo.blob(), blobInfo.filename());

                  xhr.send(fd);
                };

                reader.readAsDataURL(file);
              };

              input.click();
            },
            images_upload_handler: (blobInfo, success, failure) => {
              let data = new FormData();
              var reader = new FileReader();
              // var file = this.files[0];
              var url = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`;
              data.append("file", blobInfo.blob(), blobInfo.filename());
              data.append("upload_preset", unsignedUploadPreset);
              data.append("tags", "browser_upload");
              axios
                .post(url, data)
                .then(function (res) {
                  success(res.data.secure_url);
                })
                .catch(function (err) {
                  console.log(err);
                });
              reader.readAsDataURL(blobInfo.blob());
            },
          }}
          onEditorChange={_handleEditorChange}
          value={state.content}
        />
      </div>
    </div>
  );
}

export default CustomEditor;
