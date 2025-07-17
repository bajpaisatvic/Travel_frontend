import React, { useEffect, useRef } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import { TextStyle } from "@tiptap/extension-text-style";
export default function RichTextEditor({ content = "", onChange }) {
  const isMounted = useRef(false);

  const editor = useEditor({
    extensions: [StarterKit, Underline, TextStyle],
    content,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

  // Prevent infinite content reset
  useEffect(() => {
    if (editor && isMounted.current && content !== editor.getHTML()) {
      editor.commands.setContent(content);
    }
    isMounted.current = true;
  }, [content, editor]);

  if (!editor) return <div className="text-gray-400">Loading editor...</div>;

  return (
    <div className="space-y-3">
      {/* Toolbar */}
      <div className="flex flex-wrap gap-2 bg-gray-100 p-3 rounded-lg border border-gray-300 shadow-sm">
        {[
          { label: "Bold", action: "toggleBold", class: "font-bold" },
          { label: "Italic", action: "toggleItalic", class: "italic" },
          { label: "Underline", action: "toggleUnderline", class: "underline" },
          { label: "Strike", action: "toggleStrike", class: "line-through" },
          { label: "• List", action: "toggleBulletList", class: "" },
          { label: "1. List", action: "toggleOrderedList", class: "" },
        ].map(({ label, action, class: activeClass }) => (
          <button
            key={label}
            onClick={() => editor.chain().focus()[action]().run()}
            className={`px-3 py-1 text-sm rounded-md transition-all duration-150 border ${
              editor.isActive(action.replace("toggle", "").toLowerCase())
                ? `bg-blue-100 text-blue-700 border-blue-300 ${activeClass}`
                : "bg-white hover:bg-gray-50 border-gray-300"
            }`}
          >
            {label}
          </button>
        ))}

        <button
          onClick={() => editor.chain().focus().undo().run()}
          className="px-3 py-1 text-sm rounded-md bg-white hover:bg-gray-50 border border-gray-300"
        >
          ⎌ Undo
        </button>
        <button
          onClick={() => editor.chain().focus().redo().run()}
          className="px-3 py-1 text-sm rounded-md bg-white hover:bg-gray-50 border border-gray-300"
        >
          ↻ Redo
        </button>
      </div>

      {/* Editor */}
      <div className="border border-gray-300 rounded-lg bg-white p-3 min-h-[160px] shadow-sm focus-within:ring-2 focus-within:ring-blue-300">
        <EditorContent editor={editor} />
      </div>
    </div>
  );
}
