// TinymceEditor.jsx

import React from 'react';
import { Editor } from '@tinymce/tinymce-react';

const TinymceEditor = ({ value, onEditorChange }) => {


  return (
    <Editor
      apiKey="34kj47bqrjhk7gy7obofvvep9hzfrf42ix9ibdt6rkxjwiv6" 
      initialValue={value}
      init={{
        height: 500,
        menubar: false,
        plugins: [
          'advlist autolink lists link image charmap print preview anchor',
          'searchreplace visualblocks code fullscreen',
          'insertdatetime media table paste code help wordcount'
        ],
        toolbar:
          'formatselect | bold italic forecolor backcolor | \
          alignleft aligncenter alignright alignjustify | \
          bullist numlist outdent indent | removeformat | help'
      }}
      onEditorChange={(content) => onEditorChange(content)}
    />
  );
};

export default TinymceEditor;
