import conf from "../conf/conf";
import { Client,ID,Databases,Storage,Query ,Permission , Role} from "appwrite";

export class Service{
 client=new Client();
 database;
 bucket;
 constructor(){

     this.client
        .setEndpoint(conf.appwriteUrl)
        .setProject(conf.appwriteProjectId);

        this.database=new Databases(this.client);
        this.bucket=new Storage(this.client)
 }

 async createPost({title,slug,content,featuredimage,status,userid}){
   try {

    return await this.database.createDocument(

        conf. appwriteDatabaseId,
        conf. appwriteCollectionId,
         slug,
        {
            title,
            content,
            featuredimage,
            status,
            userid,
        }
    )
   } catch (error) {
     
    console.log("Appwrite Service :: Createpost ::error",error);
    
   }
 }
 async deletePost(slug){
    try {
    await this.database.deleteDocument(
        conf. appwriteDatabaseId,
        conf. appwriteCollectionId,
          slug
        )
        return true
    } catch (error) {
        console.log("Appwrite Service :: deletepost ::error",error);
        return false
    }
 }

 async updatePost(slug,{title,content,featuredimage,status}){
     try {
       return await this.database.updateDocument(
        conf. appwriteDatabaseId,
        conf. appwriteCollectionId,
          slug,
        {
            title,
            content,
            featuredimage,
            status
        }
        )
    } catch (error) {
        console.log("Appwrite Service :: updatepost ::error",error);
    }
 }

 async getPost(slug){
  try {
   return await this.database.getDocument(
       conf.appwriteDatabaseId,
       conf.appwriteCollectionId,
      slug 
    )
  } catch (error) {
    console.log("Appwrite Service :: getpost ::error",error);
    throw error;
  }
 }

 async getPosts(queries = [Query.equal("status", "active")]){
        try {
            return await this.database.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                queries,
                

            )
        } catch (error) {
            console.log("Appwrite serive :: getPosts :: error", error);
            return false
        }
    }


 //file upload service in future you have to seprate it from here in other file

 async uploadFile(file){
  try {
    return await this.bucket.createFile(
        conf.appwriteBucketId,
        ID.unique(),
        file,
        [
            Permission.read(Role.any())
        ]
        
    );
  } catch (error) {
     console.log("Appwrite Service :: uploadpost ::error",error);
     return false
  }
 }

 async deleteFile(fileId){

    try {
        await this.bucket.deleteFile(
          conf.appwriteBucketId,
            fileId
        )
        return true
    } catch (error) {
         console.log("Appwrite Service :: deletpost ::error",error);
     return false
    }
 }

  getFilePreview(fileId){
    
    return this.bucket.getFileView(
        conf.appwriteBucketId,
        fileId
    )
 }
}

const service=new Service()
export default service