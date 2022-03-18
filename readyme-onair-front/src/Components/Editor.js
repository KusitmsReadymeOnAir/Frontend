import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { API_URL } from '../config';
const editorConfig = {
  placeholder: '내용을 입력하세요',
  ckfinder: {
    uploadUrl: `${API_URL}/board/imageUpload`,
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
