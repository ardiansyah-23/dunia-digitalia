'use client';

import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Image from '@tiptap/extension-image';
import Link from '@tiptap/extension-link';
import Placeholder from '@tiptap/extension-placeholder';
import { Bold, Italic, List, ListOrdered, Heading1, Heading2, Quote, Link as LinkIcon, Image as ImageIcon } from 'lucide-react';

interface RichEditorProps {
  content: string;
  onChange: (html: string) => void;
  placeholder?: string;
}

export default function RichEditor({ content, onChange, placeholder = 'Tulis konten artikel di sini...' }: RichEditorProps) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Image,
      Link.configure({ openOnClick: false }),
      Placeholder.configure({ placeholder }),
    ],
    content,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

  if (!editor) return null;

  return (
    <div className="rounded-xl border border-white/10 overflow-hidden bg-white/5">
      {/* Toolbar */}
      <div className="p-2 border-b border-white/10 flex flex-wrap gap-1 bg-white/5">
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={`p-2 rounded hover:bg-white/10 ${editor.isActive('bold') ? 'text-[#5EC8FF] bg-white/10' : 'text-[#A8B3C7]'}`}
        >
          <Bold className="w-4 h-4" />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={`p-2 rounded hover:bg-white/10 ${editor.isActive('italic') ? 'text-[#5EC8FF] bg-white/10' : 'text-[#A8B3C7]'}`}
        >
          <Italic className="w-4 h-4" />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
          className={`p-2 rounded hover:bg-white/10 ${editor.isActive('heading', { level: 1 }) ? 'text-[#5EC8FF] bg-white/10' : 'text-[#A8B3C7]'}`}
        >
          <Heading1 className="w-4 h-4" />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          className={`p-2 rounded hover:bg-white/10 ${editor.isActive('heading', { level: 2 }) ? 'text-[#5EC8FF] bg-white/10' : 'text-[#A8B3C7]'}`}
        >
          <Heading2 className="w-4 h-4" />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={`p-2 rounded hover:bg-white/10 ${editor.isActive('bulletList') ? 'text-[#5EC8FF] bg-white/10' : 'text-[#A8B3C7]'}`}
        >
          <List className="w-4 h-4" />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={`p-2 rounded hover:bg-white/10 ${editor.isActive('orderedList') ? 'text-[#5EC8FF] bg-white/10' : 'text-[#A8B3C7]'}`}
        >
          <ListOrdered className="w-4 h-4" />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          className={`p-2 rounded hover:bg-white/10 ${editor.isActive('blockquote') ? 'text-[#5EC8FF] bg-white/10' : 'text-[#A8B3C7]'}`}
        >
          <Quote className="w-4 h-4" />
        </button>
      </div>

      <EditorContent editor={editor} className="min-h-[200px]" />
    </div>
  );
}
