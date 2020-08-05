import React, { MutableRefObject, useEffect } from 'react';
import { Editor } from '@toast-ui/react-editor';
import colorSyntax from '@toast-ui/editor-plugin-color-syntax';
import cogoToast from 'cogo-toast';
import styled from 'styled-components';
import Api from '../../api';
import 'highlight.js/styles/github.css';
import 'codemirror/lib/codemirror.css';
import '@toast-ui/editor/dist/toastui-editor.css';
import 'tui-color-picker/dist/tui-color-picker.css';

// eslint-disable import/no-extraneous-dependencies

interface ProblemEditorProps {
    readonly editorRef: MutableRefObject<Editor | null>;
    readonly initialValue?: string;
}

const Wrapper = styled.div`
    .tui-editor-contents {
        font-size: 1.1rem;
    }
`;

const ProblemEditor: React.FC<ProblemEditorProps> = ({ editorRef, initialValue }) => {
    useEffect(() => {
        if (!editorRef.current) return;

        editorRef.current.getInstance().addHook('addImageBlobHook', (blob, callback) => {
            const data = new FormData();
            data.append('image', blob);
            Api.post('/image', data)
                .then((res) => {
                    const url = res.data.data;
                    callback(url);
                })
                .catch((err) => {
                    cogoToast.error('이미지 업로드 중 오류가 발생하였습니다.');
                    console.log('ERROR', err);
                });
        });
    }, [editorRef]);

    return (
        <Wrapper>
            <Editor
              previewStyle="vertical"
              height="600px"
              initialEditType="wysiwyg"
              initialValue={initialValue}
              plugins={[colorSyntax]}
              ref={editorRef}
            />
        </Wrapper>
    );
};

export default ProblemEditor;
