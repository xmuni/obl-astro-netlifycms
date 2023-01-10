// import fetch from 'node-fetch'
// import dotenv from 'dotenv'
// import path from 'path'
// import fs from 'fs'
const dotenv = require('dotenv')
const path = require('path')
const fs = require('fs')
// const fetch = require('node-fetch') // Only version 2 of node-fetch works with 'require'

// import cloudinary from 'cloudinary'
const cloudinary = require('cloudinary').v2


dotenv.config()


cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    secure: true,
})



/*
Documentation:
https://cloudinary.com/documentation/admin_api#get_resources
*/
async function getAllImages() {

    const outputDir = './src/data'
    if(!fs.existsSync(outputDir)) {
        console.log('Error: output dir does not exist:', outputDir, '\n')
        throw('error')
    }

    cloudinary.api.resources(
        { type: 'upload', max_results: 600 },
        (error,result) => {
            // console.log(result,error);
            console.log(error || 'OK')

            console.log('Results:',result.resources.length)
            console.log(result.resources.map(obj => obj.public_id))
            const jsonText = JSON.stringify(result,null,4)
            const jsonPath = path.join(outputDir, 'cloudinaryContent.json')
            fs.writeFileSync(jsonPath, jsonText)
            return result;
        }
    )

    // return images
}
getAllImages()



async function searchFolder(folderName) {

    const response = await cloudinary.search
        .expression(`folder=${ folderName }`)
        .execute()
        // .then(res => console.log(res))

    console.log(response)
    // const jsonPath = path.join('./testing', 'cloudinarydump.json')
    // console.log(fs.writeFileSync(jsonPath, JSON.stringify(response,null,4)))
    
    return response;
    // const data = await response.json()

}
// searchFolder()
