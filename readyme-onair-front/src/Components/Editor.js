import React from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

const editorConfig = {
  placeholder: '내용을 입력하세요',
  ckfinder: {
    // Upload the images to the server using the CKFinder QuickUpload command
    // You have to change this address to your server that has the ckfinder php connector
    uploadUrl:
      'https://example.com/ckfinder/core/connector/php/connector.php?command=QuickUpload&type=Images&responseType=json',
  },
};

const Editor = ({ onChangeContent }) => {
  const onChange = (event, editor) => {
    onChangeContent(editor.getData());
  };
  return (
    <div>
      <CKEditor
        editor={ClassicEditor}
        config={editorConfig}
        onChange={(event, editor) => onChange(event, editor)}
      />
    </div>
  );
};

export default Editor;
