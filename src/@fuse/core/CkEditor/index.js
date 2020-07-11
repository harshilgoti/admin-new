import React, { Component } from "react";

import CKEditor from "@ckeditor/ckeditor5-react";

// NOTE: We use editor from source (not a build)!
import ClassicEditor from "@ckeditor/ckeditor5-editor-classic/src/classiceditor";
import CodeBlock from "@ckeditor/ckeditor5-code-block/src/codeblock";
import Essentials from "@ckeditor/ckeditor5-essentials/src/essentials";
import Heading from "@ckeditor/ckeditor5-heading/src/heading";
import Bold from "@ckeditor/ckeditor5-basic-styles/src/bold";
import Italic from "@ckeditor/ckeditor5-basic-styles/src/italic";
import Paragraph from "@ckeditor/ckeditor5-paragraph/src/paragraph";
import Underline from "@ckeditor/ckeditor5-basic-styles/src/underline";
import Link from "@ckeditor/ckeditor5-link/src/link";
import Table from "@ckeditor/ckeditor5-table/src/table";
import TableToolbar from "@ckeditor/ckeditor5-table/src/tabletoolbar";
import Alignment from "@ckeditor/ckeditor5-alignment/src/alignment";
import Indent from "@ckeditor/ckeditor5-indent/src/indent";
import MediaEmbed from "@ckeditor/ckeditor5-media-embed/src/mediaembed";
import TodoList from "@ckeditor/ckeditor5-list/src/todolist";
import BlockQuote from "@ckeditor/ckeditor5-block-quote/src/blockquote";
import List from "@ckeditor/ckeditor5-list/src/list";

const editorConfiguration = {
  plugins: [
    // A set of editor features to be enabled and made available to the user.
    Essentials,
    Heading,
    Bold,
    Italic,
    Underline,
    Link,
    Paragraph,
    Table,
    TableToolbar,
    CodeBlock,
    Alignment,
    Indent,
    MediaEmbed,
    TodoList,
    BlockQuote,
    List
  ],
  toolbar: [
    "heading",
    "|",
    "bold",
    "italic",
    "underline",
    "link",
    "bulletedList",
    "numberedList",
    "todoList",
    "|",
    "outdent",
    "indent",
    "|",
    "alignment",
    "|",
    "blockQuote",
    "insertTable",
    "|",
    "codeblock",
    "|",
    "mediaEmbed",
    "|",
    "undo",
    "redo"
  ],
  // table: {
  //   contentToolbar: ["tableColumn", "tableRow", "mergeTableCells"]
  // },
  codeBlock: {
    languages: [{ language: "javascript", label: "JavaScript" }]
  }
};

class CKEditorComp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      enteredData: props.value || "Enter your description here..."
    };
  }

  render() {
    return (
      <div className="CKEditorComp">
        <label>{this.props.label}</label>
        <CKEditor
          editor={ClassicEditor}
          config={editorConfiguration}
          data={this.state.enteredData}
          onInit={editor => {
            // You can store the "editor" and use when it is needed.
            // console.log("Editor is ready to use!", editor)
          }}
          onChange={(event, editor) => {
            const data = editor.getData();
            this.setState({ enteredData: data });
            // console.log({ event, editor, data })
          }}
          onBlur={editor => {
            this.props.onBlur(this.props.name, this.state.enteredData);
            // console.log("Blur.", editor)
          }}
          onFocus={editor => {
            // console.log("Focus.", editor)
          }}
        />
      </div>
    );
  }
}

export default CKEditorComp;
