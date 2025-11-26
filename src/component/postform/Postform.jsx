import React, { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import {Button,Input,RTE,Select} from '..';
import { useForm } from "react-hook-form";
import appwriteService from '../../appwrite/config';

function Postform({post}) {
 
const {register,handleSubmit, watch, setValue, control, getValues}=useForm({
    defaultValues:{
       title:post?.title|| '',
       slug:post?.slug|| '',
       content:post?.content|| '',
       status:post?.status|| "active"
    }
})

const navigate=useNavigate();
const userData=useSelector((state)=>state.auth.userData)
console.log(userData.userData.$id);
const submit = async(data)=>{

   if(post){
    const file= data.image[0]? await appwriteService.uploadFile(data.image[0]):null;
   
    if(file){
        await appwriteService.deleteFile(post.featuredimage)
       }

       const dbPost=await appwriteService.updatePost(
        post.$id,
        {...data,
            featuredimage:file?file.$id:  post.featuredimage,
          })
            if(dbPost){
                navigate(`/post/${dbPost.$id}`)
            }     
   }
   else{
    // todo: check before the image even exist or not check with ? oprator and tell why you used it
    const file=await appwriteService.uploadFile(data.image[0])

    if(file){
        const fileId=file.$id
        
        data.featuredimage=fileId
       const dbPost= await appwriteService.createPost({
            ...data,
            userid: userData.userData.$id
        })
        if(dbPost){
             navigate(`/post/${dbPost.$id}`)
        }
    }
   }
}
//interview question how to use slug transform
const slugTransform = useCallback((value) => {
        if (value && typeof value === "string")
            return value
                .trim()
                .toLowerCase()
                .replace(/[^a-zA-Z\d\s]+/g, "-")
                .replace(/\s/g, "-");

        return "";
    }, []);

 React.useEffect(()=>{
   
    const subscription=watch((value,{name})=>{
      if(name==='title'){
        setValue("slug",slugTransform(value.title),{shouldValidate:true})
      }
    });

    return ()=>{
        subscription.unsubscribe()
    }
    
 },[watch,slugTransform,setValue])

     return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-slate-100 to-gray-200 dark:from-gray-900 dark:via-slate-800 dark:to-gray-900 flex items-center justify-center py-10 transition-colors duration-500">
      <form
        onSubmit={handleSubmit(submit)}
        className="flex flex-wrap max-w-6xl bg-white dark:bg-slate-800/50 p-8 rounded-2xl shadow-lg border border-slate-200 dark:border-slate-700 w-full"
      >
        {/* Left section */}
        <div className="w-full lg:w-2/3 px-3">
          <Input
            lable="Title:"
            placeholder="Enter post title"
            className="mb-5"
            {...register("title", { required: true })}
          />
          <Input
            lable="Slug:"
            placeholder="Auto-generated slug"
            className="mb-5"
            {...register("slug", { required: true })}
            onInput={(e) =>
              setValue("slug", slugTransform(e.currentTarget.value), {
                shouldValidate: true,
              })
            }
          />
          <RTE
            lable="Content"
            name="content"
            control={control}
            defaultValue={getValues("content")}
          />
        </div>

        {/* Right section */}
        <div className="w-full lg:w-1/3 px-3 mt-8 lg:mt-0">
          <Input
            lable="Featured Image:"
            type="file"
            className="mb-4"
            accept="image/jpeg, image/jpg, image/png, image/gif"
            {...register("image", { required: !post })}
          />

          {post && (
            <div className="w-full mb-5">
              <img
                src={appwriteService.getFilePreview(post.featuredimage)}
                alt={post.title}
                className="rounded-xl shadow-md border border-gray-200 dark:border-gray-700"
              />
            </div>
          )}

          <Select
            options={["active", "inactive"]}
            label="Status"
            className="mb-6"
            {...register("status", { required: true })}
          />

          <Button
            type="submit"
            bgColor={post ? "bg-green-600 hover:bg-green-700" : undefined}
            className="w-full py-3 text-lg font-semibold rounded-xl shadow-md transition-all duration-300 hover:scale-105"
          >
            {post ? "Update Post" : "Create Post"}
          </Button>
        </div>
      </form>
    </div>
  );
}

export default Postform