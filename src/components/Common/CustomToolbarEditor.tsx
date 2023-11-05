import React from "react";
import PropTypes from "prop-types";
import { EditorState, Modifier } from "draft-js";

interface CustomToolbarEditorProps {
  editorState: EditorState;
  onChange: (editorState: EditorState) => void;
}

const CustomToolbarEditor: React.FC<CustomToolbarEditorProps> = ({
  editorState,
  onChange,
}) => {
  const addStar = () => {
    const contentState = Modifier.replaceText(
      editorState.getCurrentContent(),
      editorState.getSelection(),
      "⭐",
      editorState.getCurrentInlineStyle()
    );
    onChange(EditorState.push(editorState, contentState, "insert-characters"));
  };

  return <div onClick={addStar}>⭐</div>;
};

export default CustomToolbarEditor;
