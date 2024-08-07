import { postModel } from "../models/PostModel";
import { IPost, IPostUpdate } from "../types/post";


const searchPosts = (searchTitle?: string, searchTopic?: string[]) => {
    return new Promise(async (resolve, reject) => {
        try {

            let finalSearch = (searchTitle || searchTopic ? {
                $or: [
                    { title:  new RegExp(String(searchTitle))},
                    { topic: { $in: searchTopic }}
                ]
            } : {}) 

            const searchPosts = await postModel
                .find(finalSearch)
                .sort({ createdAt: -1 });

            if (searchPosts === null) {
                resolve({
                    status: 404,
                    message: "Not found any post!"
                })
            }
            
            resolve({
                status: 200,
                message: 'Successfully!',
                data: searchPosts
            })

        } catch (e) {
            reject(e)
        }
    })
}

const createPost = (postInfo: IPost) => {
    return new Promise( async (resolve, reject) => {
        try {

            const newPost: any = await postModel.create(postInfo);
            await newPost.save();

            if(newPost){
                resolve({
                    status: 200,
                    message: "Created post successfully!",
                    data: {...newPost._doc}
                })
            }
        } catch (error) {
            reject(error);
        }
    })
}

const getPost = (id: string) => {
    return new Promise(async (resolve, reject) => {
        try {
            const checkPost = await postModel.findOne({
                _id: id
            })
            if (checkPost === null) {
                resolve({
                    status: 404,
                    message: "This post doesn't exist!"
                })
            }
            
            resolve({
                status: 200,
                message: 'Successfully!',
                data: checkPost
            })

        } catch (e) {
            reject(e)
        }
    })
}

const updatePost = (id: string, data: IPostUpdate) => {
    return new Promise(async (resolve, reject) => {
        try {
            const checkPost = await postModel.findOne({
                _id: id
            })
            if (checkPost === null) {
                resolve({
                    status: 404,
                    message: "This post doesn't exist!"
                })
            }

            const updatePost = await postModel.findByIdAndUpdate(id, {$set: data}, { new: true })
            
            resolve({
                status: 200,
                message: 'Updated post successfully!',
                data: updatePost
            })

        } catch (e) {
            reject(e)
        }
    })
}

const getNewestPosts = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const findnewestPosts = await postModel.find()
            .sort({ createdAt: -1 }) // Sắp xếp theo thời gian tạo (mới nhất trước)
            .limit(4)

            if (findnewestPosts === null) {
                resolve({
                    status: 404,
                    message: "Not found any post!"
                })
            }
            
            resolve({
                status: 200,
                message: 'Successfully!',
                data: findnewestPosts
            })

        } catch (e) {
            reject(e)
        }
    })
}

export {
    createPost,
    updatePost,
    getPost,
    getNewestPosts,
    searchPosts,
}