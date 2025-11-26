import React from "react";

import {Controller} from 'react-hook-form'
import {Editor} from '@tinymce/tinymce-react'

export default function RTE({name,control,label,defaultValue=''}){

    return(
        <div className="w-full"
        >{label && <label className='inline-block mb-1 pl-1'>{label}</label>}
        <Controller
        name={name||'content'}
        control={control}
        render={({field:{onChange,value}})=>(
             <Editor
             apiKey="5kxwde5dg26ml07ip3x1xfjy9bxajhfy2tm8mmu6s6fogjul"
        value={value}
        onEditorChange={onChange}
        init={{
            initialValue: defaultValue,
            height: 500,
            menubar: true,
            plugins: [
                "image",
                "advlist",
                "autolink",
                "lists",
                "link",
                "image",
                "charmap",
                "preview",
                "anchor",
                "searchreplace",
                "visualblocks",
                "code",
                "fullscreen",
                "insertdatetime",
                "media",
                "table",
                "code",
                "help",
                "wordcount",
                "anchor",
            ],
            toolbar:
            "undo redo | blocks | image | bold italic forecolor | alignleft aligncenter bold italic forecolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent |removeformat | help",
            content_style: "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }"
        }}
       
        />
        )}
        />
        </div>
    )
}