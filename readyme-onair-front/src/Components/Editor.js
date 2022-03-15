import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

const editorConfig = {
  placeholder: '내용을 입력하세요',
  ckfinder: {
    uploadUrl: 'http://localhost:8080/board/imageUpload',
  },
};

const Editor = ({ onChangeContent, setImgId }) => {
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
