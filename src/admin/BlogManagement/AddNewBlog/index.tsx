"use client";
import React from "react";
import { EditorState } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { BsLink45Deg } from "react-icons/bs";
import { BiCategory, BiSolidSave } from "react-icons/bi";
import Link from "next/link";

const AddNewBlog = () => {
  const [editorState, setEditorState] = React.useState(() =>
    EditorState.createEmpty()
  );
  return (
    <div>
      <div className="flex justify-between items-center bg-white mb-5 p-5">
        <p className="admin-title">Thêm bài viết</p>
        <div className="flex items-center gap-2 flex-none">
          <Link
            href="/admin/dashboard/blog-management"
            className="admin-button basic"
          >
            Quay lại danh sách
          </Link>
          <button className="admin-button primary">
            <BiSolidSave />
            <span>Lưu</span>
          </button>
        </div>
      </div>
      <form action="">
        <div className="form-part-wrapper">
          <p className="form-part-title">Thông tin cơ bản</p>
          <div className="form-content">
            <div className="form-control">
              <div className="form-control-title">
                <span>Tiều đề</span>
                <div>*</div>
              </div>
              <input type="text" className="w-full" />
            </div>

            <div className="form-control">
              <div className="form-control-title">
                <span>Đường dẫn</span>
                <div>*</div>
              </div>
              <div className="form-control-body">
                <BsLink45Deg />
                <input type="text" className="w-full" />
              </div>
            </div>

            <div className="form-control">
              <div className="form-control-title">
                <span>Danh mục</span>
                <div>*</div>
              </div>
              <div className="form-control-body">
                <BiCategory />
                <select name="" id="">
                  <option value="">Về Lavor</option>
                  <option value="">Kiến thức và mẹo</option>
                  <option value="">Tuyển dụng</option>
                </select>
              </div>
            </div>

            <div className="form-control">
              <div className="form-control-title">
                <span>Description</span>
                <div>*</div>
              </div>

              <textarea />
            </div>
          </div>
        </div>
        <div className="form-part-wrapper">
          <p className="form-part-title">Media</p>
          <div className="form-content">
            <div className="form-control">
              <div className="form-control-title">
                <span>Ảnh chỉnh</span>
                <div>*</div>
              </div>
              <div className="form-control-body">
                <BsLink45Deg />
                <input type="file" className="w-full" />
              </div>
            </div>
          </div>
        </div>
        <div className="form-part-wrapper">
          <p className="form-part-title">Mô tả bài viết</p>
          <div className="form-content">
            <Editor
              editorState={editorState}
              toolbarClassName="toolbarClassName"
              wrapperClassName="wrapperClassName"
              editorClassName="editorClassName"
              onEditorStateChange={setEditorState}
            />
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddNewBlog;
